// app/privacy/page.tsx
import { PageLayout } from '@/components/page-layout';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-sm text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Data Collection</h2>
          <p>Do I Need a Doctor does not collect, store, or retain any personal data or medical information. All symptom analysis is processed in real-time and immediately discarded.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Information Processing</h2>
          <ul>
            <li>Symptoms you describe are processed temporarily for AI analysis</li>
            <li>Photos uploaded are analyzed temporarily and not stored</li>
            <li>No session data or user profiles are maintained</li>
            <li>All data is cleared when you refresh the page</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
          <p>We use Google's Gemini AI for symptom analysis. Your data is processed according to their privacy policy but not stored by our application.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
          <p>We do not use cookies or tracking technologies.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
          <p>For privacy concerns, contact: <a href="mailto:dr.anas.jafir@gmail.com" className="text-blue-600">dr.anas.jafir@gmail.com</a></p>
        </div>
      </div>
    </PageLayout>
  );
}