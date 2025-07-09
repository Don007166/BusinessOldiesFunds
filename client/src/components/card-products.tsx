import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Shield, 
  Zap, 
  Gift, 
  Plane, 
  Star, 
  ShoppingBag,
  Car,
  Home,
  Smartphone
} from "lucide-react";
import CardApplicationModal from "./card-application-modal";

const cardTypes = [
  {
    type: "premium-credit",
    name: "BOF Premium Credit Card",
    description: "Premium rewards credit card with exceptional benefits",
    icon: <Star className="w-8 h-8" />,
    color: "from-yellow-500 to-orange-500",
    features: [
      "No annual fee first year",
      "3% cash back on dining",
      "2% cash back on gas",
      "1% cash back on all purchases",
      "0% intro APR for 15 months"
    ],
    benefits: [
      "Travel insurance coverage",
      "Extended warranty protection",
      "24/7 concierge service",
      "Priority customer support",
      "Fraud protection guarantee"
    ],
    highlight: "Most Popular"
  },
  {
    type: "business-credit",
    name: "BOF Business Credit Card",
    description: "Designed for business owners and entrepreneurs",
    icon: <ShoppingBag className="w-8 h-8" />,
    color: "from-blue-600 to-purple-600",
    features: [
      "5% cash back on office supplies",
      "3% cash back on business travel",
      "2% cash back on restaurants",
      "Expense tracking tools",
      "Employee cards at no cost"
    ],
    benefits: [
      "Quarterly spending bonuses",
      "Business insurance options",
      "Accounting software integration",
      "Tax reporting features",
      "Business line of credit access"
    ],
    highlight: "For Business"
  },
  {
    type: "travel-credit",
    name: "BOF Travel Rewards Card",
    description: "Earn miles and travel in style",
    icon: <Plane className="w-8 h-8" />,
    color: "from-green-500 to-teal-500",
    features: [
      "5x points on travel purchases",
      "3x points on dining",
      "2x points on gas",
      "No foreign transaction fees",
      "Airport lounge access"
    ],
    benefits: [
      "Free checked bags",
      "Travel delay insurance",
      "Lost luggage reimbursement",
      "Emergency travel assistance",
      "Hotel and car rental perks"
    ],
    highlight: "Best for Travel"
  },
  {
    type: "cashback-credit",
    name: "BOF Cash Back Credit Card",
    description: "Simple cash back on every purchase",
    icon: <Gift className="w-8 h-8" />,
    color: "from-red-500 to-pink-500",
    features: [
      "2% cash back on everything",
      "No category restrictions",
      "No annual fee ever",
      "No cash back limits",
      "Easy redemption options"
    ],
    benefits: [
      "Statement credit options",
      "Direct deposit cash back",
      "Gift card redemptions",
      "Charity donations",
      "Investment account transfers"
    ],
    highlight: "Simple & Easy"
  },
  {
    type: "student-credit",
    name: "BOF Student Credit Card",
    description: "Perfect for students building credit",
    icon: <Smartphone className="w-8 h-8" />,
    color: "from-indigo-500 to-blue-500",
    features: [
      "No annual fee",
      "1.5% cash back on all purchases",
      "Good grade rewards",
      "Credit education tools",
      "Flexible payment options"
    ],
    benefits: [
      "Credit score monitoring",
      "Financial literacy resources",
      "Student discounts",
      "Graduation rewards bonus",
      "Easy mobile app management"
    ],
    highlight: "For Students"
  },
  {
    type: "secured-credit",
    name: "BOF Secured Credit Card",
    description: "Build or rebuild your credit history",
    icon: <Shield className="w-8 h-8" />,
    color: "from-gray-600 to-gray-800",
    features: [
      "Low security deposit required",
      "Graduate to unsecured card",
      "Credit line increases available",
      "Report to all credit bureaus",
      "No hidden fees"
    ],
    benefits: [
      "Credit building tools",
      "Monthly credit score updates",
      "Financial education resources",
      "Automatic reviews for upgrades",
      "Responsible credit practices"
    ],
    highlight: "Build Credit"
  },
  {
    type: "debit-card",
    name: "BOF Debit Card",
    description: "Convenient access to your checking account",
    icon: <CreditCard className="w-8 h-8" />,
    color: "from-emerald-500 to-green-600",
    features: [
      "Free ATM access nationwide",
      "Real-time purchase notifications",
      "Mobile deposit capture",
      "Contactless payments",
      "Overdraft protection available"
    ],
    benefits: [
      "No monthly maintenance fees",
      "24/7 fraud monitoring",
      "Travel notifications",
      "Temporary card lock/unlock",
      "Purchase rewards program"
    ],
    highlight: "No Credit Check"
  },
  {
    type: "prepaid-card",
    name: "BOF Prepaid Card",
    description: "Load funds and spend without a bank account",
    icon: <Zap className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    features: [
      "No bank account required",
      "Direct deposit eligible",
      "Bill pay services",
      "Mobile check deposit",
      "ATM access nationwide"
    ],
    benefits: [
      "No credit check required",
      "Spending control features",
      "FDIC insured funds",
      "Family money management",
      "Budgeting tools included"
    ],
    highlight: "No Bank Account Needed"
  }
];

export default function CardProducts() {
  const [selectedCard, setSelectedCard] = useState<typeof cardTypes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardSelect = (card: typeof cardTypes[0]) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bof-navy mb-4">
            Choose Your Perfect Card
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the right card for your lifestyle with our comprehensive selection of credit and debit cards. 
            Each card is designed to meet different financial needs and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardTypes.map((card) => (
            <Card key={card.type} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              {card.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-bof-red text-white font-semibold">
                    {card.highlight}
                  </Badge>
                </div>
              )}
              
              <div className={`h-24 bg-gradient-to-r ${card.color} flex items-center justify-center text-white`}>
                {card.icon}
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-bof-navy group-hover:text-bof-blue transition-colors">
                  {card.name}
                </CardTitle>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-bof-navy mb-2 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {card.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-bof-blue rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => handleCardSelect(card)}
                  className="w-full bg-bof-blue hover:bg-bof-navy transition-colors group-hover:scale-105 transform"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-bof-navy mb-4">
              Why Choose Bank of Finance Cards?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-bof-blue text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-bof-navy mb-2">Secure & Protected</h4>
                <p className="text-sm text-gray-600">
                  Advanced fraud protection and 24/7 monitoring keep your account safe
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-bof-blue text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-bof-navy mb-2">Fast Approval</h4>
                <p className="text-sm text-gray-600">
                  Get approved in minutes and receive your card within 7-10 business days
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-bof-blue text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-bof-navy mb-2">Exceptional Rewards</h4>
                <p className="text-sm text-gray-600">
                  Earn cash back, points, or miles on every purchase with competitive rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCard={selectedCard}
      />
    </section>
  );
}