"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { analyzeSymptoms, type AnalyzeSymptomsOutput } from '@/ai/flows/analyze-symptoms';
import { translateAssessment } from '@/ai/flows/translate-assessment';
import { translations, type LanguageCode, type AppTranslations } from '@/lib/translations';
import { AppHeader } from './app-header';
import { SymptomForm, type SymptomFormData } from './symptom-form';
import { GuidanceDisplay } from './guidance-display';

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function SymptomChecker() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [currentTranslations, setCurrentTranslations] = useState<AppTranslations>(translations.en);
  
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSymptomsOutput | null>(null);
  const [translatedExplanation, setTranslatedExplanation] = useState<string | null>(null);
  const [translatedNextStep, setTranslatedNextStep] = useState<string | null>(null);
  const [translatedSuggestedDoctorSpecialty, setTranslatedSuggestedDoctorSpecialty] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentTranslations(translations[selectedLanguage]);
    // Reset translated fields when language changes if there's an existing analysis
    if (analysisResult) {
        handleTranslation(analysisResult, selectedLanguage);
    }
  }, [selectedLanguage, analysisResult]); // Add analysisResult to dependency array

  const handleLanguageChange = useCallback((langCode: LanguageCode) => {
    setSelectedLanguage(langCode);
  }, []);

  const handleTranslation = async (result: AnalyzeSymptomsOutput, targetLanguage: LanguageCode) => {
    if (targetLanguage === 'en') {
        setTranslatedExplanation(null);
        setTranslatedNextStep(null);
        setTranslatedSuggestedDoctorSpecialty(null);
        return;
    }

    setIsLoading(true);
    try {
        const translationPromises = [
            translateAssessment({ text: result.explanation, language: targetLanguage }),
            translateAssessment({ text: result.suggestedNextStep, language: targetLanguage })
        ];

        if (result.suggestedDoctorSpecialty && result.suggestedDoctorSpecialty.toLowerCase() !== 'n/a') {
            translationPromises.push(translateAssessment({ text: result.suggestedDoctorSpecialty, language: targetLanguage }));
        } else {
            translationPromises.push(Promise.resolve({ translatedText: result.suggestedDoctorSpecialty })); // Keep N/A or empty as is
        }
        
        const [explanationRes, nextStepRes, specialtyRes] = await Promise.all(translationPromises);

        setTranslatedExplanation(explanationRes.translatedText);
        setTranslatedNextStep(nextStepRes.translatedText);
        setTranslatedSuggestedDoctorSpecialty(specialtyRes.translatedText);

    } catch (e) {
        console.error("Translation error:", e);
        // Show original text if translation fails
        setTranslatedExplanation(result.explanation);
        setTranslatedNextStep(result.suggestedNextStep);
        setTranslatedSuggestedDoctorSpecialty(result.suggestedDoctorSpecialty);
        toast({
            title: currentTranslations.errorTitle,
            description: "Failed to translate the results. Showing in English.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };


  const handleFormSubmit = async (data: SymptomFormData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setTranslatedExplanation(null);
    setTranslatedNextStep(null);
    setTranslatedSuggestedDoctorSpecialty(null);

    let photoDataUri: string | undefined = undefined;
    if (data.photo) {
      try {
        photoDataUri = await fileToDataUri(data.photo);
      } catch (e) {
        setError("Failed to process image. Please try again without an image or use a different one.");
        toast({
          title: currentTranslations.errorTitle,
          description: "Failed to process image.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const result = await analyzeSymptoms({
        symptoms: data.symptoms,
        photoDataUri: photoDataUri,
      });
      setAnalysisResult(result);
      
      if (selectedLanguage !== 'en') {
        await handleTranslation(result, selectedLanguage);
      }

    } catch (e) {
      console.error("Symptom analysis error:", e);
      setError(currentTranslations.errorMessage);
      toast({
        title: currentTranslations.errorTitle,
        description: currentTranslations.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader 
        selectedLanguage={selectedLanguage} 
        onLanguageChange={handleLanguageChange}
        translations={currentTranslations}
      />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        <SymptomForm 
          onSubmit={handleFormSubmit} 
          isLoading={isLoading} 
          translations={currentTranslations} 
        />
        <GuidanceDisplay
          analysisResult={analysisResult}
          translatedExplanation={translatedExplanation}
          translatedNextStep={translatedNextStep}
          translatedSuggestedDoctorSpecialty={translatedSuggestedDoctorSpecialty}
          isLoading={isLoading && !analysisResult} // Show loading skeleton only when fetching initial analysis
          error={error}
          translations={currentTranslations}
        />
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-primary">Terms of Service</a>
          <span>•</span>
          <a href="/about" className="hover:text-primary">About</a>
          <span>•</span>
          <a href="/contact" className="hover:text-primary">Contact</a>
          </div>
          <p>&copy; {new Date().getFullYear()} {currentTranslations.appName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
