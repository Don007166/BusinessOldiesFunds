import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/login-modal";
import ContactModal from "@/components/contact-modal";

export default function Navigation() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Main Navigation */}
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setLocation("/")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-bof-blue rounded text-white flex items-center justify-center font-bold text-sm">
                  BOF
                </div>
                <span className="text-xl font-bold text-bof-navy">Business Oldies Funds</span>
              </button>
              
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-bof-blue font-medium border-b-2 border-bof-blue pb-1">Personal</a>
                <a href="#" className="text-gray-700 hover:text-bof-blue transition-colors">Small Business</a>
                <a href="#" className="text-gray-700 hover:text-bof-blue transition-colors">Wealth Management</a>
                <a href="#" className="text-gray-700 hover:text-bof-blue transition-colors">Businesses & Institutions</a>
                <a href="#" className="text-gray-700 hover:text-bof-blue transition-colors">Security</a>
                <a href="#" className="text-gray-700 hover:text-bof-blue transition-colors">About Us</a>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-bof-blue">En español</a>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-600 hover:text-bof-blue"
              >
                Contact us
              </button>
              <a href="#" className="text-gray-600 hover:text-bof-blue">Help</a>
              <Button 
                onClick={() => setShowLoginModal(true)}
                className="bg-bof-blue hover:bg-bof-navy"
              >
                Login
              </Button>
              <Button 
                onClick={() => setLocation("/admin")}
                className="bg-bof-red hover:bg-red-700"
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
}
