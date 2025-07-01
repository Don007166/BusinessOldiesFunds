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
                <p className="text-gray-600">Customer ID: {user.driversLicenseNumber}</p>
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
                                {account.accountType.toUpperCase()} - {account.accountNumber} 
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
                        <div key={account.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{account.accountType.toUpperCase()} Account</h4>
                              <p className="text-gray-600">Account Number: {account.accountNumber}</p>
                              <p className="text-gray-600">Status: 
                                <Badge variant={account.status === 'active' ? "default" : "secondary"} className="ml-2">
                                  {account.status}
                                </Badge>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">
                                ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                              </p>
                              <p className="text-sm text-gray-600">Current Balance</p>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}