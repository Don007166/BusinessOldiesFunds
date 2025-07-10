import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CardApplicationModal from "@/components/card-application-modal";

export default function CreditCards() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const cards = [
    {
      type: "rewards",
      name: "BOF Rewards Credit Card",
      description: "Earn rewards on every purchase with no annual fee",
      features: ["No annual fee", "1.5% cash back on all purchases", "0% intro APR for 12 months"],
      benefits: ["Online account management", "Fraud protection", "24/7 customer support"],
      apr: "15.99% - 25.99%",
      annualFee: "$0",
      creditLimit: "Up to $10,000",
      color: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
      type: "cashback",
      name: "BOF Cash Back Credit Card",
      description: "Get cash back on everyday purchases",
      features: ["2% cash back on gas and groceries", "1% cash back on all other purchases", "No foreign transaction fees"],
      benefits: ["Monthly cash back statements", "Mobile app access", "Purchase protection"],
      apr: "16.99% - 26.99%",
      annualFee: "$0",
      creditLimit: "Up to $15,000",
      color: "bg-gradient-to-br from-green-600 to-green-800"
    },
    {
      type: "travel",
      name: "BOF Travel Credit Card",
      description: "Earn points on travel and dining",
      features: ["3x points on travel and dining", "2x points on all other purchases", "Annual travel credit"],
      benefits: ["Priority customer service", "Travel insurance", "No foreign transaction fees"],
      apr: "17.99% - 27.99%",
      annualFee: "$95",
      creditLimit: "Up to $25,000",
      color: "bg-gradient-to-br from-purple-600 to-purple-800"
    },
    {
      type: "business",
      name: "BOF Business Credit Card",
      description: "Designed for business owners and entrepreneurs",
      features: ["2% cash back on business purchases", "No personal guarantee required", "Expense management tools"],
      benefits: ["Business credit building", "Detailed reporting", "Employee card management"],
      apr: "14.99% - 24.99%",
      annualFee: "$0",
      creditLimit: "Up to $50,000",
      color: "bg-gradient-to-br from-gray-700 to-gray-900"
    }
  ];

  const handleApplyClick = (card: any) => {
    setSelectedCard(card);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-bof-light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-bof-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Credit Cards</h1>
          <p className="text-xl text-blue-200 mb-8">Find the perfect credit card for your lifestyle and spending needs</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
              <p className="text-blue-200">Low APR starting at 14.99% for qualified applicants</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Rewards & Benefits</h3>
              <p className="text-blue-200">Earn cash back, points, and exclusive perks</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Security Features</h3>
              <p className="text-blue-200">Advanced fraud protection and secure transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Cards Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-bof-navy text-center mb-12">Choose Your Credit Card</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className={`${card.color} text-white p-8`}>
                  <CardTitle className="text-2xl font-bold">{card.name}</CardTitle>
                  <CardDescription className="text-white/90 text-lg">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-bold text-bof-navy mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-bof-navy mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {card.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-bof-blue mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">APR</p>
                        <p className="font-semibold text-bof-navy">{card.apr}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Annual Fee</p>
                        <p className="font-semibold text-bof-navy">{card.annualFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Credit Limit</p>
                        <p className="font-semibold text-bof-navy">{card.creditLimit}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleApplyClick(card)}
                      className="w-full bg-bof-blue hover:bg-bof-navy text-white py-3 text-lg font-semibold"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Card Benefits Section */}
      <section className="py-16 bg-bof-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-bof-navy text-center mb-12">Why Choose BOF Credit Cards?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bof-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">Transparent pricing with no surprise charges</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Fraud Protection</h3>
              <p className="text-gray-600">Advanced security features to protect your account</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">Rewards Program</h3>
              <p className="text-gray-600">Earn points and cash back on every purchase</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bof-navy mb-2">24/7 Support</h3>
              <p className="text-gray-600">Customer service available around the clock</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <CardApplicationModal 
        isOpen={showApplicationModal} 
        onClose={() => setShowApplicationModal(false)}
        selectedCard={selectedCard}
      />
    </div>
  );
}