import { useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import BankingProducts from "@/components/banking-products";
import CardProducts from "@/components/card-products";
import PromotionalSection from "@/components/promotional-section";
import MobileBanking from "@/components/mobile-banking";
import Footer from "@/components/footer";
import AppointmentModal from "@/components/appointment-modal";

export default function Home() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-white">
      {/* FDIC Banner */}
      <div className="bg-bof-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Business Oldies Funds deposit products: FDIC-Insured</span>
            <span className="mx-2">•</span>
            <span>Backed by the full faith and credit of the U.S. Government</span>
            <span className="mx-2">•</span>
            <span className="text-orange-600">Investment products are not FDIC-Insured</span>
          </div>
        </div>
      </div>

      <Navigation />
      <HeroSection />
      <BankingProducts />
      <CardProducts />
      <PromotionalSection />
      <MobileBanking />
      
      {/* Auto Loans Section */}
      <section className="py-16 bg-bof-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bof-navy mb-4">Auto loans for the perfect ride</h2>
            <p className="text-xl text-gray-600">Competitive rates on purchase and lease buyout loans</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-bof-blue mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
              </svg>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Auto Purchase Loans</h3>
              <p className="text-gray-600 mb-4">Competitive rates on purchase and lease buyout loans</p>
              <button onClick={() => setLocation("/auto-loans")} className="text-bof-blue font-semibold hover:underline">Check rates →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-green-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-2H2a2 2 0 01-2-2V4z" />
              </svg>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Auto Prequalification</h3>
              <p className="text-gray-600 mb-4">No credit score impact. For customers with a BOF login.</p>
              <button onClick={() => setLocation("/auto-loans")} className="text-bof-blue font-semibold hover:underline">Get prequalified →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-purple-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Auto Refinance</h3>
              <p className="text-gray-600 mb-4">Refinance and you could get a lower rate</p>
              <button onClick={() => setLocation("/auto-loans")} className="text-bof-blue font-semibold hover:underline">Learn more →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bof-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Find a Location</h3>
              <p className="text-gray-600 mb-4">Locate BOF branches and ATMs near you</p>
              <button className="text-bof-blue font-semibold hover:underline">Find locations →</button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Schedule Appointment</h3>
              <p className="text-gray-600 mb-4">Meet with our banking experts at your convenience</p>
              <button 
                onClick={() => setShowAppointmentModal(true)}
                className="text-bof-blue font-semibold hover:underline"
              >
                Schedule now →
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Customer Support</h3>
              <p className="text-gray-600 mb-4">Get help from Smith, our support agent</p>
              <div className="text-left text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-bof-navy mb-1">Contact Information:</p>
                <p><strong>Agent:</strong> Smith</p>
                <p><strong>Email:</strong> smithwilliams@oldiesfoundation.info</p>
                <p><strong>Address:</strong> Business Oldies Funds<br />7720 Collins Street<br />Melbourne, VIC 3000, Australia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <AppointmentModal 
        isOpen={showAppointmentModal} 
        onClose={() => setShowAppointmentModal(false)} 
      />
    </div>
  );
}
