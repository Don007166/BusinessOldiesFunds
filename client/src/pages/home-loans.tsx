import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function HomeLoans() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanAmount: "",
    propertyType: "",
    creditScore: "",
    annualIncome: "",
    downPayment: "",
    propertyAddress: "",
    employmentStatus: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Home Loan Application Submitted",
      description: "Our mortgage specialists will contact you within 24 hours to discuss your application.",
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
              Thank you for choosing Business Oldies Funds for your home financing needs.
            </p>
            <div className="bg-bof-light p-6 rounded-lg mb-6">
              <p className="text-bof-navy font-semibold">Next Steps:</p>
              <ul className="text-left text-gray-700 mt-2 space-y-1">
                <li>• Our mortgage specialists will review your application</li>
                <li>• You'll receive a call within 24 hours</li>
                <li>• We'll discuss your options and requirements</li>
                <li>• Pre-approval process can begin immediately</li>
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
          <h1 className="text-4xl font-bold mb-4">Home Loans</h1>
          <p className="text-xl text-blue-200 mb-8">Make your dream home a reality with competitive rates and flexible terms</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
              <p className="text-blue-200">Starting as low as 3.25% APR for qualified borrowers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Fast Approval</h3>
              <p className="text-blue-200">Get pre-approved in as little as 24 hours</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-blue-200">Dedicated mortgage specialists guide you through every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-bof-navy text-center mb-12">Choose Your Home Loan Type</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Purchase Loans</CardTitle>
                <CardDescription>For buying your new home</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">3.25%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Refinance</CardTitle>
                <CardDescription>Lower your current rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">3.45%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">FHA Loans</CardTitle>
                <CardDescription>Low down payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">3.5%</div>
                <p className="text-sm text-gray-600">Down payment as low as</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">VA Loans</CardTitle>
                <CardDescription>For military veterans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">0%</div>
                <p className="text-sm text-gray-600">Down payment required</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-bof-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-bof-navy text-center mb-8">Apply for Your Home Loan</h2>
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
                    placeholder="$500,000"
                    value={formData.loanAmount}
                    onChange={(e) => handleChange("loanAmount", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">Down Payment *</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="$100,000"
                    value={formData.downPayment}
                    onChange={(e) => handleChange("downPayment", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="annualIncome">Annual Income *</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="$75,000"
                    value={formData.annualIncome}
                    onChange={(e) => handleChange("annualIncome", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleChange("employmentStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleChange("propertyAddress", e.target.value)}
                  placeholder="123 Main Street, City, State, ZIP"
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