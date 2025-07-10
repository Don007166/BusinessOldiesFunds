import { useState } from "react";
import { Link } from "wouter";
import ContactModal from "@/components/contact-modal";

export default function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <footer className="bg-bof-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded text-bof-navy flex items-center justify-center font-bold text-sm">
                BOF
              </div>
              <span className="text-lg font-bold">Business Oldies Funds</span>
            </div>
            <p className="text-blue-200 text-sm">
              Your trusted partner in financial services since 1985. FDIC insured and committed to your financial success.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Banking</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Checking Accounts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Savings Accounts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CDs & IRAs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Online Banking</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Lending</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/home-loans" className="hover:text-white transition-colors">Home Loans</Link></li>
              <li><Link href="/auto-loans" className="hover:text-white transition-colors">Auto Loans</Link></li>
              <li><Link href="/credit-cards" className="hover:text-white transition-colors">Credit Cards</Link></li>
              <li><Link href="/personal-loans" className="hover:text-white transition-colors">Personal Loans</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Find Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
          <p>&copy; 2024 Business Oldies Funds. All rights reserved. Member FDIC. Equal Housing Lender.</p>
        </div>
      </div>
      
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </footer>
  );
}
