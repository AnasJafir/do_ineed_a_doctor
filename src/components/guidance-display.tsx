"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, XCircle, Info, ShieldAlert, Stethoscope } from "lucide-react";
import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import type { AppTranslations } from "@/lib/translations";
import { Skeleton } from "./ui/skeleton";

interface GuidanceDisplayProps {
  analysisResult: AnalyzeSymptomsOutput | null;
  translatedExplanation?: string | null;
  translatedNextStep?: string | null;
  translatedSuggestedDoctorSpecialty?: string | null;
  isLoading: boolean;
  error: string | null;
  translations: AppTranslations;
}

const SeverityIcon = ({ severity }: { severity: AnalyzeSymptomsOutput['severityLevel'] | undefined }) => {
  if (!severity) return <Info size={24} className="text-muted-foreground" />;
  switch (severity) {
    case 'low':
      return <CheckCircle2 size={24} className="text-green-500" />;
    case 'moderate':
      return <AlertTriangle size={24} className="text-yellow-500" />;
    case 'high':
      return <XCircle size={24} className="text-red-500" />;
    default:
      return <Info size={24} className="text-muted-foreground" />;
  }
};

const SeverityText = ({ severity, translations }: { severity: AnalyzeSymptomsOutput['severityLevel'] | undefined, translations: AppTranslations }) => {
  if (!severity) return null;
  switch (severity) {
    case 'low':
      return <span className="font-semibold text-green-600">{translations.severityLow}</span>;
    case 'moderate':
      return <span className="font-semibold text-yellow-600">{translations.severityModerate}</span>;
    case 'high':
      return <span className="font-semibold text-red-600">{translations.severityHigh}</span>;
    default:
      return null;
  }
};

export function GuidanceDisplay({
  analysisResult,
  translatedExplanation,
  translatedNextStep,
  translatedSuggestedDoctorSpecialty,
  isLoading,
  error,
  translations,
}: GuidanceDisplayProps) {

  if (isLoading) {
    return (
      <Card className="w-full shadow-lg mt-8 animate-pulse">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{translations.errorTitle}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!analysisResult) {
    return (
       <Card className="w-full shadow-lg mt-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[200px]">
            <Info size={48} className="mb-4" />
            <p className="text-lg">{translations.noAnalysisYet}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const explanationToDisplay = translatedExplanation ?? analysisResult.explanation;
  const nextStepToDisplay = translatedNextStep ?? analysisResult.suggestedNextStep;
  const suggestedDoctorSpecialtyToDisplay = translatedSuggestedDoctorSpecialty ?? analysisResult.suggestedDoctorSpecialty;


  return (
    <Card className="w-full shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
            <ShieldAlert size={28} className="text-primary" />
            {translations.guidanceTitle}
        </CardTitle>
        <CardDescription>{translations.poweredByAI}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center">
            <SeverityIcon severity={analysisResult.severityLevel} />
            <span className="ml-2">{translations.severityLabel}: <SeverityText severity={analysisResult.severityLevel} translations={translations} /></span>
          </h3>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">{translations.nextStepLabel}</h3>
          <p className="text-base bg-primary/10 p-3 rounded-md">{nextStepToDisplay}</p>
        </div>
        
        {suggestedDoctorSpecialtyToDisplay && suggestedDoctorSpecialtyToDisplay.toLowerCase() !== 'n/a' && (
          <div>
            <h3 className="text-lg font-semibold mb-1 flex items-center">
                <Stethoscope size={20} className="mr-2 text-primary" />
                {translations.suggestedDoctorSpecialtyLabel}
            </h3>
            <p className="text-base bg-accent/10 p-3 rounded-md">{suggestedDoctorSpecialtyToDisplay}</p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-1">{translations.explanationLabel}</h3>
          <p className="text-base whitespace-pre-wrap">{explanationToDisplay}</p>
        </div>
      </CardContent>
    </Card>
  );
}
