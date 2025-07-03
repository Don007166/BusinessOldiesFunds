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
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Main Navigation */}
            <div className="flex items-center space-x-12">
              <button 
                onClick={() => setLocation("/")}
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200">
                  BOF
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Business Oldies Funds
                </span>
              </button>
              
              <div className="hidden lg:flex space-x-8">
                <button onClick={() => setLocation("/")} className="relative text-blue-600 font-semibold pb-2 group">
                  Personal
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-100 transition-transform duration-200"></div>
                </button>
                <button onClick={() => setLocation("/")} className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Small Business
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
                <button onClick={() => setLocation("/")} className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Wealth Management
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
                <button onClick={() => setLocation("/")} className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Business Solutions
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
                <button onClick={() => setShowContactModal(true)} className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Contact Us
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  About Us
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </a>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">En español</a>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Contact us
              </button>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Help</a>
              <Button 
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Login
              </Button>
              <Button 
                onClick={() => setLocation("/admin")}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
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
