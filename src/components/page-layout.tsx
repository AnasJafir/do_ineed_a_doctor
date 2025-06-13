// components/page-layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { Home, BrainCog } from 'lucide-react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-4 px-6 shadow-md bg-card">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
              <BrainCog size={28} />
              <h1 className="text-2xl font-bold">Do I Need a Doctor</h1>
            </Link>

            {/* Home Link */}
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t bg-card">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Do I Need a Doctor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}