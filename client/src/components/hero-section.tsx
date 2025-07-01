import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./login-modal";

export default function HeroSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium">FDIC Insured • Trusted Since 1875</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Banking
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Excellence
                  </span>
                  <span className="block text-4xl lg:text-5xl text-gray-300">
                    Redefined
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-lg">
                  Experience next-generation banking with personalized solutions, competitive rates, and unmatched service excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Get Started Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">150+</div>
                  <div className="text-sm text-gray-300">Years of Trust</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$100M+</div>
                  <div className="text-sm text-gray-300">Assets Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">500K+</div>
                  <div className="text-sm text-gray-300">Happy Customers</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="Modern banking professionals" 
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-sm font-medium">Available 24/7</div>
                <div className="text-2xl font-bold">Online Banking</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-400 to-purple-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-sm font-medium">Competitive Rates</div>
                <div className="text-2xl font-bold">Up to 4.5% APY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}
