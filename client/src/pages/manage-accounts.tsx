import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ManageAccounts() {
  const [, setLocation] = useLocation();
  const { userId } = useParams();
  const { toast } = useToast();
  const { admin, isLoading: isAdminLoading } = useAdmin();
  const [creditAmount, setCreditAmount] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [newAccountType, setNewAccountType] = useState("checking");
  const [cardApplications, setCardApplications] = useState<Record<string, string>>({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAdminLoading && !admin) {
      toast({
        title: "Unauthorized",
        description: "You are not logged in as admin. Redirecting to login...",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/admin");
      }, 1000);
    }
  }, [admin, isAdminLoading, setLocation, toast]);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/admin/user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!admin && !!userId,
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery({
    queryKey: ["/api/admin/user-accounts", userId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user/${userId}/accounts`);
      if (!response.ok) throw new Error('Failed to fetch accounts');
      return response.json();
    },
    enabled: !!admin && !!userId,
  });

  const creditMutation = useMutation({
    mutationFn: async (data: { accountId: number; amount: string; description: string }) => {
      return await apiRequest("POST", `/api/admin/credit-account`, data);
    },
    onSuccess: () => {
      toast({
        title: "Credit Successful",
        description: "Account has been credited successfully.",
      });
      setCreditAmount("");
      setSelectedAccountId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/user-accounts", userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Credit Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const debitMutation = useMutation({
    mutationFn: async (data: { accountId: number; amount: string; description: string }) => {
      return await apiRequest("POST", `/api/admin/debit-account`, data);
    },
    onSuccess: () => {
      toast({
        title: "Debit Successful",
        description: "Account has been debited successfully.",
      });
      setDebitAmount("");
      setSelectedAccountId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/user-accounts", userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Debit Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: async (data: { userId: number; accountType: string }) => {
      return await apiRequest("POST", `/api/admin/create-account`, data);
    },
    onSuccess: () => {
      toast({
        title: "Account Created",
        description: "New account has been created successfully.",
      });
      setNewAccountType("checking");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/user-accounts", userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Account Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const cardApplicationMutation = useMutation({
    mutationFn: async (data: { userId: number; cardType: string }) => {
      return await apiRequest("POST", "/api/admin/apply-card", data);
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Card Application Submitted",
        description: `${variables.cardType.charAt(0).toUpperCase() + variables.cardType.slice(1)} card is being processed`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Application Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCredit = () => {
    if (!selectedAccountId || !creditAmount || parseFloat(creditAmount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select an account and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    creditMutation.mutate({
      accountId: selectedAccountId,
      amount: creditAmount,
      description: `Admin credit - $${creditAmount}`
    });
  };

  const handleDebit = () => {
    if (!selectedAccountId || !debitAmount || parseFloat(debitAmount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select an account and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    debitMutation.mutate({
      accountId: selectedAccountId,
      amount: debitAmount,
      description: `Admin debit - $${debitAmount}`
    });
  };

  const handleCreateAccount = () => {
    if (!userId) return;
    
    createAccountMutation.mutate({
      userId: parseInt(userId),
      accountType: newAccountType
    });
  };

  if (isAdminLoading || !admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (userLoading || accountsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
          <p>Loading account management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bof-red text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation("/admin/customers")}
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              ← Back to Customers
            </Button>
            <div className="w-8 h-8 bg-white rounded text-bof-red flex items-center justify-center font-bold text-sm">
              BOF
            </div>
            <h1 className="text-xl font-bold">Manage Accounts</h1>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {user && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Manage Accounts for {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">Customer ID: {user.id}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Account Actions */}
                <div className="space-y-6">
                  {/* Credit Account */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardTitle className="text-xl font-bold text-gray-800">Credit Account</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Select Account</Label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedAccountId || ""}
                            onChange={(e) => setSelectedAccountId(Number(e.target.value))}
                          >
                            <option value="">Select an account...</option>
                            {(accounts || []).map((account: any) => (
                              <option key={account.id} value={account.id}>
                                {account.accountType === 'business' ? 'Business Checkings' : 
                                 account.accountType === 'savings' ? 'Business Savings' : 
                                 account.accountType.toUpperCase()} - {account.accountNumber} 
                                (${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2})})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>Credit Amount ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(e.target.value)}
                            placeholder="Enter amount to credit"
                          />
                        </div>
                        <Button
                          onClick={handleCredit}
                          disabled={creditMutation.isPending || !selectedAccountId || !creditAmount}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          {creditMutation.isPending ? "Processing..." : "Credit Account"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Debit Account */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                      <CardTitle className="text-xl font-bold text-gray-800">Debit Account</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Debit Amount ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={debitAmount}
                            onChange={(e) => setDebitAmount(e.target.value)}
                            placeholder="Enter amount to debit"
                          />
                        </div>
                        <Button
                          onClick={handleDebit}
                          disabled={debitMutation.isPending || !selectedAccountId || !debitAmount}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          {debitMutation.isPending ? "Processing..." : "Debit Account"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Create New Account */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl font-bold text-gray-800">Create New Account</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Account Type</Label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={newAccountType}
                            onChange={(e) => setNewAccountType(e.target.value)}
                          >
                            <option value="checking">Checking Account</option>
                            <option value="savings">Savings Account</option>
                            <option value="investment">Investment Account</option>
                            <option value="business">Business Account</option>
                            <option value="credit">Credit Account</option>
                            <option value="loan">Loan Account</option>
                          </select>
                        </div>
                        <Button
                          onClick={handleCreateAccount}
                          disabled={createAccountMutation.isPending}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          {createAccountMutation.isPending ? "Creating..." : "Create Account"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Accounts */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <CardTitle className="text-xl font-bold text-gray-800">Current Accounts</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {(accounts || []).map((account: any) => (
                        <div key={account.id} className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-xl text-gray-800">
                              {account.accountType === 'business' ? 'Business Checkings Account' : 
                               account.accountType === 'savings' ? 'Business Savings' : 
                               account.accountType.toUpperCase() + ' Account'}
                            </h4>
                            <span className="text-2xl font-bold text-green-600">
                              ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Account Number:</span>
                              <p className="font-mono text-gray-800">{account.accountNumber}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Status:</span>
                              <p className="font-semibold text-green-600">{account.status.toUpperCase()}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Account ID:</span>
                              <p className="font-mono text-gray-800">{account.accountIdDisplay || 'ACC-' + Math.random().toString().slice(2, 10)}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Available Balance:</span>
                              <p className="font-bold text-green-600">
                                ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} Available
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!accounts || accounts.length === 0) && (
                        <p className="text-gray-500 italic text-center py-8">No accounts found for this customer</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Card Services Section */}
                <Card className="mt-8 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-xl font-bold text-gray-800">Card Services</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Debit Card Application */}
                      <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-blue-800">Debit Card</h4>
                          <div className="w-12 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            DEBIT
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Access your checking and savings accounts with instant transactions
                        </p>
                        <div className="space-y-2 text-xs text-gray-600 mb-4">
                          <p>• Instant account access</p>
                          <p>• No monthly fees</p>
                          <p>• Global ATM access</p>
                          <p>• Real-time notifications</p>
                        </div>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            cardApplicationMutation.mutate({
                              userId: Number(userId),
                              cardType: 'debit'
                            });
                            setCardApplications(prev => ({
                              ...prev,
                              [`${userId}-debit`]: 'processing'
                            }));
                          }}
                          disabled={cardApplications[`${userId}-debit`] === 'processing' || cardApplicationMutation.isPending}
                        >
                          {cardApplications[`${userId}-debit`] === 'processing' ? 'Card in Processing' : 'Apply for Debit Card'}
                        </Button>
                      </div>

                      {/* Credit Card Application */}
                      <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-purple-800">Credit Card</h4>
                          <div className="w-12 h-8 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            CREDIT
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Build credit with rewards and flexible payment options
                        </p>
                        <div className="space-y-2 text-xs text-gray-600 mb-4">
                          <p>• Up to 2% cashback rewards</p>
                          <p>• 0% intro APR for 12 months</p>
                          <p>• Fraud protection</p>
                          <p>• Credit score monitoring</p>
                        </div>
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => {
                            cardApplicationMutation.mutate({
                              userId: Number(userId),
                              cardType: 'credit'
                            });
                            setCardApplications(prev => ({
                              ...prev,
                              [`${userId}-credit`]: 'processing'
                            }));
                          }}
                          disabled={cardApplications[`${userId}-credit`] === 'processing' || cardApplicationMutation.isPending}
                        >
                          {cardApplications[`${userId}-credit`] === 'processing' ? 'Card in Processing' : 'Apply for Credit Card'}
                        </Button>
                      </div>

                      {/* Business Card Application */}
                      <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-green-800">Business Card</h4>
                          <div className="w-12 h-8 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            BIZ
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Manage business expenses with detailed reporting and controls
                        </p>
                        <div className="space-y-2 text-xs text-gray-600 mb-4">
                          <p>• Expense categorization</p>
                          <p>• Higher credit limits</p>
                          <p>• Business rewards program</p>
                          <p>• Detailed monthly reports</p>
                        </div>
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            cardApplicationMutation.mutate({
                              userId: Number(userId),
                              cardType: 'business'
                            });
                            setCardApplications(prev => ({
                              ...prev,
                              [`${userId}-business`]: 'processing'
                            }));
                          }}
                          disabled={cardApplications[`${userId}-business`] === 'processing' || cardApplicationMutation.isPending}
                        >
                          {cardApplications[`${userId}-business`] === 'processing' ? 'Card in Processing' : 'Apply for Business Card'}
                        </Button>
                      </div>

                      {/* Premium Card Application */}
                      <div className="p-4 border-2 border-gold-200 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-amber-800">Premium Card</h4>
                          <div className="w-12 h-8 bg-gradient-to-r from-yellow-500 to-amber-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            GOLD
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Exclusive benefits and premium service for valued customers
                        </p>
                        <div className="space-y-2 text-xs text-gray-600 mb-4">
                          <p>• Concierge services</p>
                          <p>• Travel insurance included</p>
                          <p>• Airport lounge access</p>
                          <p>• Premium customer support</p>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                          onClick={() => {
                            cardApplicationMutation.mutate({
                              userId: Number(userId),
                              cardType: 'premium'
                            });
                            setCardApplications(prev => ({
                              ...prev,
                              [`${userId}-premium`]: 'processing'
                            }));
                          }}
                          disabled={cardApplications[`${userId}-premium`] === 'processing' || cardApplicationMutation.isPending}
                        >
                          {cardApplications[`${userId}-premium`] === 'processing' ? 'Card in Processing' : 'Apply for Premium Card'}
                        </Button>
                      </div>
                    </div>

                    {/* Card Status Section */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-3">Card Application Status</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Debit Card:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cardApplications[`${userId}-debit`] === 'processing' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {cardApplications[`${userId}-debit`] === 'processing' ? 'Processing' : 'Ready to Apply'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Credit Card:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cardApplications[`${userId}-credit`] === 'processing' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {cardApplications[`${userId}-credit`] === 'processing' ? 'Processing' : 'Ready to Apply'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Business Card:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cardApplications[`${userId}-business`] === 'processing' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {cardApplications[`${userId}-business`] === 'processing' ? 'Processing' : 'Ready to Apply'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Premium Card:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cardApplications[`${userId}-premium`] === 'processing' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cardApplications[`${userId}-premium`] === 'processing' ? 'Under Review' : 'Ready to Apply'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}