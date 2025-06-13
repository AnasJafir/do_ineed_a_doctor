// app/contact/page.tsx
import { PageLayout } from '@/components/page-layout';

export default function Contact() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Contact & Support</h1>
        
        <div className="prose max-w-none">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="font-semibold text-red-800">MEDICAL EMERGENCY</p>
            <p className="text-red-700">For medical emergencies, call your local emergency services immediately. Do not use this contact form for urgent medical situations.</p>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Support Email</h2>
          <p>For technical issues, questions, or feedback:</p>
          <p className="text-xl"><a href="mailto:dr.anas.jafir@gmail.com" className="text-blue-600 font-semibold">dr.anas.jafir@gmail.com</a></p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Frequently Asked Questions</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Is this tool accurate?</h3>
          <p>Our AI provides educational information based on symptom analysis. It's designed to help you understand when to seek medical care, but it's not 100% accurate and should never replace professional medical advice.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Is my data stored?</h3>
          <p>No. We don't store any personal data, symptoms, or photos. Everything is processed temporarily and cleared when you refresh the page.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Can I trust the recommendations?</h3>
          <p>Use our recommendations as guidance only. Always consult with qualified healthcare professionals for medical decisions.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">What if I have an emergency?</h3>
          <p>Don't use this tool for emergencies. Call emergency services immediately for urgent medical situations.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Response Time</h2>
          <p>We typically respond to support emails within 24-48 hours during business days.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Feedback</h2>
          <p>We welcome your feedback to improve our service. Please share your experience and suggestions at the email above.</p>
        </div>
      </div>
    </PageLayout>
  );
}