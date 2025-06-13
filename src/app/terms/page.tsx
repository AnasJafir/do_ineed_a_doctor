// app/terms/page.tsx
import { PageLayout } from '@/components/page-layout';

export default function TermsOfService() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-sm text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="font-semibold text-red-800">MEDICAL DISCLAIMER</p>
            <p className="text-red-700">This tool is for informational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. Always consult qualified healthcare professionals for medical concerns.</p>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Service Description</h2>
          <p>Do I Need a Doctor is an AI-powered symptom checker that provides educational information about potential medical conditions. It is not a substitute for professional medical consultation.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">User Responsibilities</h2>
          <ul>
            <li>Use this tool for informational purposes only</li>
            <li>Never delay seeking medical care based on this tool's output</li>
            <li>Contact emergency services for urgent medical situations</li>
            <li>Provide accurate symptom information for better results</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Limitations</h2>
          <ul>
            <li>AI analysis may not be 100% accurate</li>
            <li>Cannot diagnose rare or complex conditions</li>
            <li>Results are suggestions, not medical diagnoses</li>
            <li>No doctor-patient relationship is established</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Emergency Situations</h2>
          <p className="font-semibold text-red-600">For medical emergencies, call emergency services immediately. Do not use this tool for urgent medical situations.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
          <p>Questions about these terms: <a href="mailto:dr.anas.jafir@gmail.com" className="text-blue-600">dr.anas.jafir@gmail.com</a></p>
        </div>
      </div>
    </PageLayout>
  );
}