
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

export type AppTranslations = {
  appName: string;
  pageTitle: string;
  symptomsLabel: string;
  symptomsPlaceholder: string;
  uploadPhotoLabel: string;
  uploadPhotoHint: string;
  submitButton: string;
  submittingButton: string;
  errorTitle: string;
  errorMessage: string;
  guidanceTitle: string;
  severityLabel: string;
  severityLow: string;
  severityModerate: string;
  severityHigh: string;
  nextStepLabel: string;
  explanationLabel: string;
  photoPreviewAlt: string;
  selectLanguage: string;
  noAnalysisYet: string;
  poweredByAI: string;
  suggestedDoctorSpecialtyLabel: string;
};

export const translations: Record<LanguageCode, AppTranslations> = {
  en: {
    appName: 'Do I Need a Doctor ?',
    pageTitle: 'Symptom Checker',
    symptomsLabel: 'Describe your symptoms',
    symptomsPlaceholder: 'e.g., sore throat and fatigue for 3 days...',
    uploadPhotoLabel: 'Upload a photo (optional)',
    uploadPhotoHint: 'A photo of a rash, injury, etc. can help.',
    submitButton: 'Analyze Symptoms',
    submittingButton: 'Analyzing...',
    errorTitle: 'Error',
    errorMessage: 'An unexpected error occurred. Please try again.',
    guidanceTitle: "AI Health Guidance",
    severityLabel: 'Severity Level',
    severityLow: 'Low',
    severityModerate: 'Moderate',
    severityHigh: 'High',
    nextStepLabel: 'Suggested Next Step',
    explanationLabel: 'Explanation',
    photoPreviewAlt: 'Photo preview',
    selectLanguage: 'Select Language',
    noAnalysisYet: 'Enter your symptoms above to get an AI assessment.',
    poweredByAI: 'Powered by AI. This is not a medical diagnosis. Always consult a healthcare professional for medical advice.',
    suggestedDoctorSpecialtyLabel: 'Suggested Doctor Specialty',
  },
  fr: {
    appName: 'Dois-je voir un médecin ?',
    pageTitle: 'Vérificateur de Symptômes',
    symptomsLabel: 'Décrivez vos symptômes',
    symptomsPlaceholder: 'ex: mal de gorge et fatigue depuis 3 jours...',
    uploadPhotoLabel: 'Télécharger une photo (optionnel)',
    uploadPhotoHint: "Une photo d'une éruption cutanée, d'une blessure, etc. peut aider.",
    submitButton: 'Analyser les Symptômes',
    submittingButton: 'Analyse en cours...',
    errorTitle: 'Erreur',
    errorMessage: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    guidanceTitle: "Conseils de Santé IA",
    severityLabel: 'Niveau de Gravité',
    severityLow: 'Faible',
    severityModerate: 'Modéré',
    severityHigh: 'Élevé',
    nextStepLabel: 'Prochaine Étape Suggérée',
    explanationLabel: 'Explication',
    photoPreviewAlt: 'Aperçu de la photo',
    selectLanguage: 'Choisir la langue',
    noAnalysisYet: 'Entrez vos symptômes ci-dessus pour obtenir une évaluation par IA.',
    poweredByAI: "Propulsé par l'IA. Ceci n'est pas un diagnostic médical. Consultez toujours un professionnel de santé pour un avis médical.",
    suggestedDoctorSpecialtyLabel: 'Spécialité Médicale Suggérée',
  },
  ar: {
    appName: 'هل أحتاج إلى طبيب؟',
    pageTitle: 'مدقق الأعراض',
    symptomsLabel: 'صف أعراضك',
    symptomsPlaceholder: 'مثال: التهاب الحلق والتعب لمدة 3 أيام...',
    uploadPhotoLabel: 'تحميل صورة (اختياري)',
    uploadPhotoHint: 'صورة لطفح جلدي، إصابة، إلخ. يمكن أن تساعد.',
    submitButton: 'تحليل الأعراض',
    submittingButton: 'يتم التحليل...',
    errorTitle: 'خطأ',
    errorMessage: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    guidanceTitle: "إرشادات صحية بالذكاء الاصطناعي",
    severityLabel: 'مستوى الخطورة',
    severityLow: 'منخفض',
    severityModerate: 'متوسط',
    severityHigh: 'مرتفع',
    nextStepLabel: 'الخطوة التالية المقترحة',
    explanationLabel: 'الشرح',
    photoPreviewAlt: 'معاينة الصورة',
    selectLanguage: 'اختار اللغة',
    noAnalysisYet: 'أدخل أعراضك أعلاه للحصول على تقييم من الذكاء الاصطناعي.',
    poweredByAI: "مدعوم بالذكاء الاصطناعي. هذا ليس تشخيصًا طبيًا. استشر دائمًا أخصائي رعاية صحية للحصول على مشورة طبية.",
    suggestedDoctorSpecialtyLabel: 'تخصص الطبيب المقترح',
  },
};
