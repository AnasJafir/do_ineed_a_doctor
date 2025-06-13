// app/about/page.tsx
import { PageLayout } from '@/components/page-layout';

export default function About() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">About Do I Need a Doctor</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
          <p>Do I Need a Doctor helps users make informed decisions about their health by providing AI-powered symptom analysis and guidance on when to seek medical care.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">How It Works</h2>
          <ol>
            <li>Describe your symptoms in detail</li>
            <li>Optionally upload a photo for visual symptoms</li>
            <li>Receive AI analysis and recommendations</li>
            <li>Get guidance on appropriate medical specialist</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Technology</h2>
          <p>Our platform uses advanced AI technology (Google Gemini) to analyze symptoms and provide educational health information. The system is designed to complement, not replace, professional medical advice.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Privacy First</h2>
          <p>We prioritize your privacy:</p>
          <ul>
            <li>No data storage or user accounts required</li>
            <li>Symptoms and photos are processed temporarily</li>
            <li>All information is cleared on page refresh</li>
            <li>No tracking or personal data collection</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Important Notice</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="font-semibold">This tool is for educational purposes only and does not replace professional medical consultation. Always consult healthcare professionals for medical concerns.</p>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
          <p>For questions or feedback: <a href="mailto:dr.anas.jafir@gmail.com" className="text-blue-600">dr.anas.jafir@gmail.com</a></p>
        </div>
      </div>
    </PageLayout>
  );
}