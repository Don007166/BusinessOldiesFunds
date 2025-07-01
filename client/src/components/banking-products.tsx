import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./login-modal";
import { useToast } from "@/hooks/use-toast";

export default function BankingProducts() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const { toast } = useToast();

  const handleProductClick = (productType: string, index: number) => {
    setClickedCard(index);
    setSelectedProduct(productType);
    
    // Reset clicked animation after a short delay
    setTimeout(() => setClickedCard(null), 300);
    
    toast({
      title: `${productType} Selected! 🏦`,
      description: "Login to access your premium banking services and exclusive benefits.",
    });
    setShowLoginModal(true);
  };
  const products = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      title: "Premium Checking",
      description: "Advanced checking solutions with exclusive benefits and rewards",
      items: ["BOF Advantage Banking", "Student Banking", "Business Checking"],
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      accent: "blue",
      rate: "0% Fees",
      link: "Explore Checking →"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100-2h12a1 1 0 100 2H4z" clipRule="evenodd" />
        </svg>
      ),
      title: "High-Yield Savings",
      description: "Maximize your savings with competitive rates and flexible access",
      items: ["BOF Advantage Savings", "CDs", "IRAs"],
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      accent: "green",
      rate: "4.5% APY",
      link: "Start Saving →"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Premium Credit Cards",
      description: "Elite credit cards with exceptional rewards and exclusive perks",
      items: ["Cash Back Cards", "Travel Rewards", "Low Interest"],
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
      accent: "purple",
      rate: "Up to 5%",
      link: "Apply Today →"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      title: "Home Financing",
      description: "Comprehensive home loans with competitive rates and expert guidance",
      items: ["Mortgage", "Refinance", "Home Equity"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      accent: "orange",
      rate: "3.2% APR",
      link: "Get Pre-Approved →"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Banking Solutions
            <span className="block text-blue-600">Designed for You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of financial products designed to help you achieve your goals with confidence and ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br ${product.bgColor} shadow-lg relative overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-200/50 active:scale-[0.98] ${clickedCard === index ? 'ring-4 ring-blue-400 scale-[1.05]' : ''}`}
              onClick={() => handleProductClick(product.title, index)}
            >
              <CardContent className="p-8 relative z-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full -mr-12 -mt-12"></div>
                
                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {product.icon}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                    <div className={`px-3 py-1 bg-gradient-to-r ${product.color} text-white text-sm font-bold rounded-full`}>
                      {product.rate}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {product.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <div className={`w-2 h-2 bg-gradient-to-r ${product.color} rounded-full mr-3`}></div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.title, index);
                  }}
                  className={`w-full bg-gradient-to-r ${product.color} text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.95] transition-all duration-200 font-semibold py-3 rounded-xl border-0 hover:shadow-2xl`}
                >
                  {product.link}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </section>
  );
}
