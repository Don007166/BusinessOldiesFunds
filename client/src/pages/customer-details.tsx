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

export default function CustomerDetails() {
  const [, setLocation] = useLocation();
  const { userId } = useParams();
  const { toast } = useToast();
  const { admin, isLoading: isAdminLoading } = useAdmin();
  const [creditAmount, setCreditAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);

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
      // Invalidate and refetch multiple related queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/user-accounts", userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/user", userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
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
      description: `Admin credit - ${creditAmount}`
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
          <p>Loading customer details...</p>
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
            <h1 className="text-xl font-bold">Customer Details</h1>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {user && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">Customer ID: {user.id}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Information */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <CardTitle className="text-xl font-bold text-gray-800">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="font-medium text-gray-700">First Name</Label>
                          <p className="text-gray-900">{user.firstName}</p>
                        </div>
                        <div>
                          <Label className="font-medium text-gray-700">Last Name</Label>
                          <p className="text-gray-900">{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Email</Label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Phone</Label>
                        <p className="text-gray-900">{user.phone}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Date of Birth</Label>
                        <p className="text-gray-900">{user.dateOfBirth}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Address</Label>
                        <p className="text-gray-900">{user.address}</p>
                        <p className="text-gray-900">{user.city}, {user.state} {user.zipCode}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Status</Label>
                        <Badge variant={user.isActive ? "default" : "secondary"} className="ml-2">
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Actions */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="text-xl font-bold text-gray-800">Admin Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Credit Account</h4>
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
                                  (Balance: ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2})})
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Accounts Information */}
              <Card className="mt-8 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-xl font-bold text-gray-800">Customer Accounts</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {(accounts || []).map((account: any) => (
                      <div key={account.id} className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xl text-gray-800">{account.accountType.toUpperCase()} Account</h4>
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
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}