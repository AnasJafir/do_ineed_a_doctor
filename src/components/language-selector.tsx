"use client";

import type { ChangeEvent } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages, type LanguageCode, type AppTranslations } from "@/lib/translations";

interface LanguageSelectorProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (languageCode: LanguageCode) => void;
  translations: AppTranslations;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange, translations }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedLanguage} onValueChange={(value) => onLanguageChange(value as LanguageCode)}>
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder={translations.selectLanguage} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
