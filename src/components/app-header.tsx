// components/app-header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Info, FileText, Phone, Shield, BrainCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './language-selector';
import { type LanguageCode, type AppTranslations } from '@/lib/translations';

interface AppHeaderProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (langCode: LanguageCode) => void;
  translations: AppTranslations;
  showNavigation?: boolean;
}

export function AppHeader({ 
  selectedLanguage, 
  onLanguageChange, 
  translations,
  showNavigation = true 
}: AppHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/about', label: 'About', icon: Info },
    { href: '/terms', label: 'Terms', icon: FileText },
    { href: '/privacy', label: 'Privacy', icon: Shield },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header className="py-4 px-6 shadow-md bg-card">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
            <BrainCog size={28} />
            <h1 className="text-2xl font-bold">{translations.appName}</h1>
          </Link>

          {/* Desktop Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Language Selector and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              translations={translations}
            />
            
            {/* Mobile Menu Button */}
            {showNavigation && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showNavigation && isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}