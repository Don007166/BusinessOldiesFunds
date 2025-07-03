import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface CardType {
  id: string;
  name: string;
  type: 'debit' | 'credit';
  description: string;
  features: string[];
  annualFee: string;
  color: string;
  gradient: string;
}

const cardTypes: CardType[] = [
  {
    id: 'platinum-debit',
    name: 'Platinum Debit Card',
    type: 'debit',
    description: 'Premium debit card with worldwide acceptance',
    features: ['No foreign transaction fees', 'ATM fee reimbursement', '24/7 customer support', 'Chip & PIN security'],
    annualFee: 'Free',
    color: 'from-gray-400 to-gray-600',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600'
  },
  {
    id: 'gold-debit',
    name: 'Gold Debit Card',
    type: 'debit',
    description: 'Premium gold debit card with enhanced benefits',
    features: ['Global acceptance', 'Contactless payments', 'Purchase protection', 'Travel insurance'],
    annualFee: 'Free',
    color: 'from-yellow-400 to-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  },
  {
    id: 'classic-debit',
    name: 'Classic Debit Card',
    type: 'debit',
    description: 'Standard debit card for everyday banking',
    features: ['Nationwide acceptance', 'Online banking integration', 'SMS alerts', 'Basic security features'],
    annualFee: 'Free',
    color: 'from-blue-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    id: 'platinum-credit',
    name: 'Platinum Credit Card',
    type: 'credit',
    description: 'Premium credit card with exclusive benefits',
    features: ['$10,000 credit limit', 'Rewards program', 'Travel benefits', 'Concierge service'],
    annualFee: '$199/year',
    color: 'from-purple-400 to-purple-600',
    gradient: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 'gold-credit',
    name: 'Gold Credit Card',
    type: 'credit',
    description: 'Mid-tier credit card with solid rewards',
    features: ['$5,000 credit limit', 'Cashback rewards', 'Purchase protection', 'Extended warranty'],
    annualFee: '$99/year',
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  },
  {
    id: 'standard-credit',
    name: 'Standard Credit Card',
    type: 'credit',
    description: 'Essential credit card for building credit',
    features: ['$2,000 credit limit', 'Online account management', 'Credit score tracking', 'No foreign transaction fees'],
    annualFee: 'Free',
    color: 'from-green-400 to-green-600',
    gradient: 'bg-gradient-to-br from-green-400 to-green-600'
  }
];

export default function CardServices() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { admin, isLoading: isAdminLoading } = useAdmin();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [processingCards, setProcessingCards] = useState<string[]>([]);

  // Get userId from URL params or query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userId) {
      setSelectedUserId(parseInt(userId));
    }
  }, []);

  const { data: users } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: !!admin,
  });

  const selectedUser = Array.isArray(users) && selectedUserId 
    ? users.find((user: any) => user.id === selectedUserId) 
    : null;

  // Card application mutation
  const cardApplicationMutation = useMutation({
    mutationFn: async (data: { userId: number; cardType: string; cardName: string }) => {
      return await apiRequest("POST", "/api/admin/apply-card", data);
    },
    onSuccess: (data, variables) => {
      const cardName = variables.cardName;
      toast({
        title: "Card Application Successful!",
        description: `The ${cardName} is now being processed and will be delivered to the address on file within 7-10 business days.`,
      });
      
      // Mark as processing
      setProcessingCards(prev => [...prev, variables.cardType]);
      
      // Show success animation/message
      setTimeout(() => {
        toast({
          title: "Application Confirmed",
          description: `${cardName} application has been successfully submitted for ${selectedUser?.firstName} ${selectedUser?.lastName}.`,
        });
      }, 2000);

      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Application Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isAdminLoading || !admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
          <p>Loading card services...</p>
        </div>
      </div>
    );
  }

  const handleCardApplication = (card: CardType) => {
    if (!selectedUserId) {
      toast({
        title: "No Customer Selected",
        description: "Please select a customer first.",
        variant: "destructive",
      });
      return;
    }

    cardApplicationMutation.mutate({
      userId: selectedUserId,
      cardType: card.id,
      cardName: card.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-bof-red to-red-600 text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation("/admin/customers")}
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200"
            >
              ← Back to Customers
            </Button>
            <div className="w-10 h-10 bg-white rounded-lg text-bof-red flex items-center justify-center font-bold text-lg shadow-md">
              BOF
            </div>
            <h1 className="text-2xl font-bold">Card Services Center</h1>
          </div>
          {selectedUser && (
            <div className="text-right">
              <p className="text-sm opacity-90">Selected Customer</p>
              <p className="font-bold text-lg">{selectedUser.firstName} {selectedUser.lastName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Customer Selection */}
          {!selectedUserId && (
            <div className="mb-8">
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Select a Customer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {Array.isArray(users) && users.map((user: any) => (
                      <Button
                        key={user.id}
                        onClick={() => setSelectedUserId(user.id)}
                        variant="outline"
                        className="justify-start text-left h-auto p-4 hover:bg-orange-100 border-orange-300"
                      >
                        <div>
                          <p className="font-semibold">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedUserId && (
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Banking Cards</h2>
                <p className="text-lg text-gray-600">Choose the perfect card for your banking needs</p>
                <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg inline-block">
                  <p className="text-blue-800 font-semibold">
                    Applying for: <span className="text-blue-900 font-bold">{selectedUser?.firstName} {selectedUser?.lastName}</span>
                  </p>
                  <p className="text-blue-700 text-sm">Cards will be delivered to: {selectedUser?.address}, {selectedUser?.city}</p>
                </div>
              </div>

              {/* Debit Cards */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">D</span>
                  Debit Cards
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {cardTypes.filter(card => card.type === 'debit').map((card) => (
                    <Card key={card.id} className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                      <div className={`absolute inset-0 ${card.gradient} opacity-90`}></div>
                      <CardContent className="relative z-10 p-8 text-white">
                        <div className="mb-6">
                          <div className="w-12 h-8 bg-white bg-opacity-20 rounded mb-4"></div>
                          <h4 className="text-xl font-bold mb-2">{card.name}</h4>
                          <p className="text-sm opacity-90 mb-4">{card.description}</p>
                          <Badge className="bg-white text-gray-800 font-bold">
                            {card.annualFee}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {card.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80"></div>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => handleCardApplication(card)}
                          disabled={cardApplicationMutation.isPending || processingCards.includes(card.id)}
                          className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold"
                        >
                          {processingCards.includes(card.id) 
                            ? "Processing..." 
                            : cardApplicationMutation.isPending 
                              ? "Applying..." 
                              : "Apply Now"
                          }
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Credit Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">C</span>
                  Credit Cards
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {cardTypes.filter(card => card.type === 'credit').map((card) => (
                    <Card key={card.id} className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                      <div className={`absolute inset-0 ${card.gradient} opacity-90`}></div>
                      <CardContent className="relative z-10 p-8 text-white">
                        <div className="mb-6">
                          <div className="w-12 h-8 bg-white bg-opacity-20 rounded mb-4"></div>
                          <h4 className="text-xl font-bold mb-2">{card.name}</h4>
                          <p className="text-sm opacity-90 mb-4">{card.description}</p>
                          <Badge className="bg-white text-gray-800 font-bold">
                            {card.annualFee}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {card.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80"></div>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => handleCardApplication(card)}
                          disabled={cardApplicationMutation.isPending || processingCards.includes(card.id)}
                          className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold"
                        >
                          {processingCards.includes(card.id) 
                            ? "Processing..." 
                            : cardApplicationMutation.isPending 
                              ? "Applying..." 
                              : "Apply Now"
                          }
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}