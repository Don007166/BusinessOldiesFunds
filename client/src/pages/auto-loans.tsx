import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function AutoLoans() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanAmount: "",
    vehicleType: "",
    vehicleYear: "",
    creditScore: "",
    annualIncome: "",
    downPayment: "",
    dealerName: "",
    vehicleMake: "",
    vehicleModel: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Auto Loan Application Submitted",
      description: "Our auto loan specialists will contact you within 24 hours with your pre-approval decision.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bof-light">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-lg shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-bof-navy mb-4">Application Submitted Successfully!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for choosing Business Oldies Funds for your auto financing needs.
            </p>
            <div className="bg-bof-light p-6 rounded-lg mb-6">
              <p className="text-bof-navy font-semibold">Next Steps:</p>
              <ul className="text-left text-gray-700 mt-2 space-y-1">
                <li>• Our auto loan team will review your application</li>
                <li>• You'll receive a pre-approval decision within 24 hours</li>
                <li>• Take your approval letter to any dealer</li>
                <li>• Shop with confidence knowing your financing is secured</li>
              </ul>
            </div>
            <Button onClick={() => window.location.href = "/"} className="bg-bof-blue hover:bg-bof-navy">
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bof-light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-bof-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Auto Loans</h1>
          <p className="text-xl text-blue-200 mb-8">Get the perfect ride with competitive rates and flexible terms</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Low Rates</h3>
              <p className="text-blue-200">Starting as low as 2.99% APR for qualified borrowers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Quick Approval</h3>
              <p className="text-blue-200">Get pre-approved in minutes, not days</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Flexible Terms</h3>
              <p className="text-blue-200">Choose from 36 to 84 month terms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-bof-navy text-center mb-12">Auto Loan Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">New Vehicle</CardTitle>
                <CardDescription>Brand new cars, trucks, SUVs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">2.99%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Used Vehicle</CardTitle>
                <CardDescription>Pre-owned vehicles up to 7 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">3.49%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Refinance</CardTitle>
                <CardDescription>Lower your current auto loan rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">3.25%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-bof-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-bof-navy text-center mb-8">Apply for Your Auto Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="$25,000"
                    value={formData.loanAmount}
                    onChange={(e) => handleChange("loanAmount", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="$5,000"
                    value={formData.downPayment}
                    onChange={(e) => handleChange("downPayment", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => handleChange("vehicleType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Vehicle</SelectItem>
                      <SelectItem value="used">Used Vehicle</SelectItem>
                      <SelectItem value="refinance">Refinance Existing Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vehicleYear">Vehicle Year *</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    placeholder="2024"
                    value={formData.vehicleYear}
                    onChange={(e) => handleChange("vehicleYear", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vehicleMake">Vehicle Make</Label>
                  <Input
                    id="vehicleMake"
                    placeholder="Toyota, Honda, Ford, etc."
                    value={formData.vehicleMake}
                    onChange={(e) => handleChange("vehicleMake", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Vehicle Model</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="Camry, Civic, F-150, etc."
                    value={formData.vehicleModel}
                    onChange={(e) => handleChange("vehicleModel", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="creditScore">Credit Score Range *</Label>
                  <Select value={formData.creditScore} onValueChange={(value) => handleChange("creditScore", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit score range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (740+)</SelectItem>
                      <SelectItem value="good">Good (670-739)</SelectItem>
                      <SelectItem value="fair">Fair (580-669)</SelectItem>
                      <SelectItem value="poor">Poor (Below 580)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income *</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="$50,000"
                    value={formData.annualIncome}
                    onChange={(e) => handleChange("annualIncome", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dealerName">Dealer Name (if applicable)</Label>
                <Input
                  id="dealerName"
                  value={formData.dealerName}
                  onChange={(e) => handleChange("dealerName", e.target.value)}
                  placeholder="Name of the dealership"
                />
              </div>

              <div className="text-center pt-6">
                <Button type="submit" className="bg-bof-blue hover:bg-bof-navy text-white px-8 py-3 text-lg">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}