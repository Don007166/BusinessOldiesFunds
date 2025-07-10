import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function PersonalLoans() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
    creditScore: "",
    annualIncome: "",
    employmentStatus: "",
    monthlyDebt: "",
    loanTerm: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Personal Loan Application Submitted",
      description: "Our lending specialists will review your application and contact you within 24 hours.",
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
              Thank you for choosing Business Oldies Funds for your personal loan needs.
            </p>
            <div className="bg-bof-light p-6 rounded-lg mb-6">
              <p className="text-bof-navy font-semibold">Next Steps:</p>
              <ul className="text-left text-gray-700 mt-2 space-y-1">
                <li>• Our lending team will review your application</li>
                <li>• You'll receive a decision within 24 hours</li>
                <li>• If approved, funds can be available within 1-2 business days</li>
                <li>• We'll contact you to discuss terms and finalize details</li>
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
          <h1 className="text-4xl font-bold mb-4">Personal Loans</h1>
          <p className="text-xl text-blue-200 mb-8">Flexible personal loans for life's important moments</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
              <p className="text-blue-200">Starting as low as 5.99% APR for qualified borrowers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Quick Funding</h3>
              <p className="text-blue-200">Get funds in your account within 1-2 business days</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">No Collateral</h3>
              <p className="text-blue-200">Unsecured loans up to $50,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Uses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-bof-navy text-center mb-12">What You Can Use Your Loan For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Debt Consolidation</CardTitle>
                <CardDescription>Combine multiple debts into one payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">5.99%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Home Improvement</CardTitle>
                <CardDescription>Renovate and upgrade your home</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">6.49%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Medical Expenses</CardTitle>
                <CardDescription>Cover unexpected medical bills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">6.99%</div>
                <p className="text-sm text-gray-600">APR starting rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-bof-navy">Major Purchase</CardTitle>
                <CardDescription>Finance large purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-bof-blue mb-2">7.49%</div>
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
            <h2 className="text-3xl font-bold text-bof-navy text-center mb-8">Apply for Your Personal Loan</h2>
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
                  <Select value={formData.loanAmount} onValueChange={(value) => handleChange("loanAmount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="10000">$10,000</SelectItem>
                      <SelectItem value="15000">$15,000</SelectItem>
                      <SelectItem value="20000">$20,000</SelectItem>
                      <SelectItem value="25000">$25,000</SelectItem>
                      <SelectItem value="30000">$30,000</SelectItem>
                      <SelectItem value="35000">$35,000</SelectItem>
                      <SelectItem value="40000">$40,000</SelectItem>
                      <SelectItem value="45000">$45,000</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loanTerm">Loan Term *</Label>
                  <Select value={formData.loanTerm} onValueChange={(value) => handleChange("loanTerm", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="72">72 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                <Select value={formData.loanPurpose} onValueChange={(value) => handleChange("loanPurpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                    <SelectItem value="home-improvement">Home Improvement</SelectItem>
                    <SelectItem value="medical">Medical Expenses</SelectItem>
                    <SelectItem value="major-purchase">Major Purchase</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleChange("employmentStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed Full-Time</SelectItem>
                      <SelectItem value="part-time">Employed Part-Time</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
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
                    placeholder="$50,000"
                    value={formData.annualIncome}
                    onChange={(e) => handleChange("annualIncome", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                  <Input
                    id="monthlyDebt"
                    type="number"
                    placeholder="$500"
                    value={formData.monthlyDebt}
                    onChange={(e) => handleChange("monthlyDebt", e.target.value)}
                  />
                </div>
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