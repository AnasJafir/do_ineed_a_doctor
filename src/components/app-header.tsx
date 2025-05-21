
"use client";

import { BrainCog } from "lucide-react"; // Changed from HeartPulse
import { LanguageSelector } from "./language-selector";
import type { LanguageCode, AppTranslations } from "@/lib/translations";

interface AppHeaderProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (languageCode: LanguageCode) => void;
  translations: AppTranslations;
}

export function AppHeader({ selectedLanguage, onLanguageChange, translations }: AppHeaderProps) {
  return (
    <header className="py-4 px-6 shadow-md bg-card">
      <div className="container mx-auto flex items-center justify-between max-w-5xl">
        <div className="flex items-center space-x-2 text-primary">
          <BrainCog size={28} /> {/* Changed icon */}
          <h1 className="text-2xl font-bold">{translations.appName}</h1>
        </div>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          translations={translations}
        />
      </div>
    </header>
  );
}
