import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema, type UserSignup } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSwitch: () => void;
}

export default function SignupModal({ isOpen, onClose, onLoginSwitch }: SignupModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCardType, setSelectedCardType] = useState("");
  const [showCardProcessing, setShowCardProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<UserSignup>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      driversLicenseNumber: "",
      driversLicenseExpiry: "",
      driversLicenseState: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: UserSignup) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Business Oldies Funds!",
        description: "Your account has been created successfully. Please select your card type.",
      });
      setStep(4); // Move to card selection step
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UserSignup) => {
    signupMutation.mutate(data);
  };

  const handleCardSelection = (cardType: string) => {
    setSelectedCardType(cardType);
    setShowCardProcessing(true);
    
    toast({
      title: "Card Processing",
      description: `Your ${cardType} card is being processed. You will receive it once approved.`,
    });
    
    setTimeout(() => {
      onClose();
      form.reset();
      setStep(1);
      setSelectedCardType("");
      setShowCardProcessing(false);
      window.location.reload(); // Refresh to update auth state
    }, 3000);
  };

  const nextStep = () => {
    const fieldsToValidate = step === 1 
      ? ["username", "email", "password", "confirmPassword"] 
      : ["firstName", "lastName", "dateOfBirth", "phone"];
    
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep(step + 1);
      }
    });
  };

  const prevStep = () => setStep(step - 1);

  const handleClose = () => {
    onClose();
    form.reset();
    setStep(1);
  };

  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Open Your BOF Account
          </DialogTitle>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  step >= i ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {step} of {step === 4 ? 4 : 3}
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...form.register("username")}
                    className="mt-1"
                    placeholder="Choose a unique username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    className="mt-1"
                    placeholder="Minimum 6 characters"
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("confirmPassword")}
                    className="mt-1"
                    placeholder="Re-enter your password"
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...form.register("firstName")}
                    className="mt-1"
                    placeholder="John"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...form.register("lastName")}
                    className="mt-1"
                    placeholder="Doe"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...form.register("dateOfBirth")}
                  className="mt-1"
                />
                {form.formState.errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className="mt-1"
                  placeholder="(555) 123-4567"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Address & ID Information</h3>
              
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  {...form.register("address")}
                  className="mt-1"
                  placeholder="123 Main Street"
                />
                {form.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...form.register("city")}
                    className="mt-1"
                    placeholder="New York"
                  />
                  {form.formState.errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    {...form.register("state")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  {...form.register("zipCode")}
                  className="mt-1"
                  placeholder="12345"
                />
                {form.formState.errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.zipCode.message}
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Driver's License Information</h4>
                
                <div>
                  <Label htmlFor="driversLicenseNumber">License Number</Label>
                  <Input
                    id="driversLicenseNumber"
                    {...form.register("driversLicenseNumber")}
                    className="mt-1"
                    placeholder="D123456789"
                  />
                  {form.formState.errors.driversLicenseNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.driversLicenseNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="driversLicenseExpiry">Expiry Date</Label>
                    <Input
                      id="driversLicenseExpiry"
                      type="date"
                      {...form.register("driversLicenseExpiry")}
                      className="mt-1"
                    />
                    {form.formState.errors.driversLicenseExpiry && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.driversLicenseExpiry.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="driversLicenseState">Issuing State</Label>
                    <select
                      id="driversLicenseState"
                      {...form.register("driversLicenseState")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                    >
                      <option value="">Select State</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.driversLicenseState && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.driversLicenseState.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Card Type</h3>
                <p className="text-gray-600 mb-6">Select the card that best fits your financial needs.</p>
              </div>

              {showCardProcessing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Card</h4>
                  <p className="text-gray-600">Your {selectedCardType} card is being processed. Please wait...</p>
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Card Processing Only</p>
                    <p className="text-green-700 text-sm mt-1">No delivery information required at this time</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors bg-gradient-to-br from-blue-50 to-blue-100"
                    onClick={() => handleCardSelection("Visa Debit")}
                  >
                    <div className="text-center">
                      <div className="w-16 h-10 bg-blue-600 rounded mb-4 mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-xs">VISA</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Visa Debit Card</h4>
                      <p className="text-sm text-gray-600 mb-4">Perfect for everyday spending with direct account access</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• No annual fee</li>
                        <li>• Worldwide acceptance</li>
                        <li>• Instant account deduction</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 cursor-pointer transition-colors bg-gradient-to-br from-red-50 to-red-100"
                    onClick={() => handleCardSelection("Mastercard Credit")}
                  >
                    <div className="text-center">
                      <div className="w-16 h-10 bg-red-600 rounded mb-4 mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-xs">MC</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Mastercard Credit</h4>
                      <p className="text-sm text-gray-600 mb-4">Build credit history with flexible payment options</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Credit limit up to $5,000</li>
                        <li>• 0% APR for first 12 months</li>
                        <li>• Rewards program included</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors bg-gradient-to-br from-green-50 to-green-100"
                    onClick={() => handleCardSelection("American Express")}
                  >
                    <div className="text-center">
                      <div className="w-16 h-10 bg-green-600 rounded mb-4 mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-xs">AMEX</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">American Express</h4>
                      <p className="text-sm text-gray-600 mb-4">Premium card with exclusive benefits and rewards</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Premium rewards program</li>
                        <li>• Travel insurance included</li>
                        <li>• 24/7 concierge service</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition-colors bg-gradient-to-br from-purple-50 to-purple-100"
                    onClick={() => handleCardSelection("BOF Platinum")}
                  >
                    <div className="text-center">
                      <div className="w-16 h-10 bg-purple-600 rounded mb-4 mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-xs">BOF</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">BOF Platinum Card</h4>
                      <p className="text-sm text-gray-600 mb-4">Our premium banking card with all-inclusive benefits</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• No foreign transaction fees</li>
                        <li>• Priority customer service</li>
                        <li>• Exclusive BOF member benefits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step !== 4 && (
            <div className="flex justify-between pt-6 border-t">
              <div>
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="px-6"
                >
                  Previous
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onLoginSwitch}
                className="text-blue-600 hover:text-blue-700"
              >
                Already have an account? Sign In
              </Button>
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                >
                  {signupMutation.isPending ? "Creating Account..." : "Create Account"}
                </Button>
              )}
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}