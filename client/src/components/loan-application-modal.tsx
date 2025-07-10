import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoanApplicationModal({ isOpen, onClose }: LoanApplicationModalProps) {
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const loanTypes = [
    {
      type: "home",
      name: "Home Loans",
      description: "Purchase, refinance, or equity loans",
      rates: "Starting at 3.25% APR",
      icon: "🏠",
      route: "/home-loans"
    },
    {
      type: "auto",
      name: "Auto Loans", 
      description: "New, used, or refinance auto loans",
      rates: "Starting at 2.99% APR",
      icon: "🚗",
      route: "/auto-loans"
    },
    {
      type: "personal",
      name: "Personal Loans",
      description: "Debt consolidation, home improvement, etc.",
      rates: "Starting at 5.99% APR", 
      icon: "💰",
      route: "/personal-loans"
    },
    {
      type: "business",
      name: "Business Loans",
      description: "Equipment, expansion, working capital",
      rates: "Starting at 4.99% APR",
      icon: "🏢",
      route: "/business-loans"
    }
  ];

  const handleApplyNow = (route: string) => {
    window.location.href = route;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-bof-navy text-center mb-2">
            Apply for a Loan
          </DialogTitle>
          <p className="text-center text-gray-600">Choose the loan type that best fits your needs</p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 py-6">
          {loanTypes.map((loan) => (
            <Card key={loan.type} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-3">{loan.icon}</div>
                <CardTitle className="text-xl text-bof-navy group-hover:text-bof-blue transition-colors">
                  {loan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {loan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-bof-blue">{loan.rates}</span>
                  <p className="text-sm text-gray-600">for qualified borrowers</p>
                </div>
                
                <div className="space-y-3">
                  <div className="text-left text-sm text-gray-600">
                    {loan.type === "home" && (
                      <ul className="space-y-1">
                        <li>• Purchase & refinance options</li>
                        <li>• FHA & VA loans available</li>
                        <li>• Fast pre-approval process</li>
                      </ul>
                    )}
                    {loan.type === "auto" && (
                      <ul className="space-y-1">
                        <li>• New & used vehicle financing</li>
                        <li>• Flexible terms up to 84 months</li>
                        <li>• Quick approval decisions</li>
                      </ul>
                    )}
                    {loan.type === "personal" && (
                      <ul className="space-y-1">
                        <li>• No collateral required</li>
                        <li>• Fixed rates & payments</li>
                        <li>• Fast funding available</li>
                      </ul>
                    )}
                    {loan.type === "business" && (
                      <ul className="space-y-1">
                        <li>• Equipment & expansion financing</li>
                        <li>• Working capital solutions</li>
                        <li>• SBA loan programs</li>
                      </ul>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleApplyNow(loan.route)}
                    className="w-full bg-bof-blue hover:bg-bof-navy group-hover:scale-105 transition-transform"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-bof-light p-6 rounded-lg">
          <h3 className="font-bold text-bof-navy mb-3">Why Choose Business Oldies Funds?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Competitive Rates</p>
                <p className="text-gray-600">Low rates for qualified borrowers</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Fast Processing</p>
                <p className="text-gray-600">Quick decisions and funding</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Expert Support</p>
                <p className="text-gray-600">Dedicated loan specialists</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onClose} className="px-8">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}