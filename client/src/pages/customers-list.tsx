import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import CreditAccountModal from "@/components/credit-account-modal";
import AdminNavigation from "@/components/admin-navigation";
import { User, Account } from "@/lib/types";

export default function CustomersList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { admin, isLoading: isAdminLoading } = useAdmin();
  const [cardApplications, setCardApplications] = useState<Record<string, string>>({});
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedUserName, setSelectedUserName] = useState("");

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

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: !!admin,
  });

  const { data: accounts } = useQuery({
    queryKey: ["/api/admin/accounts"],
    enabled: !!admin,
  });

  // Card application mutation
  const cardApplicationMutation = useMutation({
    mutationFn: async (data: { userId: number; cardType: string }) => {
      return await apiRequest("POST", "/api/admin/apply-card", data);
    },
    onSuccess: () => {
      toast({
        title: "Card Application Submitted",
        description: "Card is in processing",
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

  const handleCreditAccount = (account: Account, userFullName: string) => {
    setSelectedAccount(account);
    setSelectedUserName(userFullName);
    setCreditModalOpen(true);
  };

  // Group accounts by user ID for easy lookup
  const accountsByUser = Array.isArray(accounts) ? accounts.reduce((acc: any, account: any) => {
    if (!acc[account.userId]) {
      acc[account.userId] = [];
    }
    acc[account.userId].push(account);
    return acc;
  }, {} as Record<number, any[]>) : {};

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation currentPage="/admin/customers" />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Customers</h2>
            <p className="text-gray-600">View and manage all customer accounts</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
              <p>Loading customers...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {Array.isArray(users) && users.map((user: any) => {
                const userAccounts = accountsByUser[user.id] || [];
                const totalBalance = userAccounts.reduce((sum: number, account: any) => 
                  sum + parseFloat(account.balance || '0'), 0
                );

                return (
                  <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-800">
                            {user.firstName} {user.lastName}
                          </CardTitle>
                          <p className="text-gray-600 mt-1">ID: {user.id}</p>
                        </div>
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Customer Info */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Email:</span> {user.email}</p>
                            <p><span className="font-medium">Phone:</span> {user.phone}</p>
                            <p><span className="font-medium">Address:</span> {user.address}</p>
                            <p><span className="font-medium">City:</span> {user.city}, {user.state} {user.zipCode}</p>
                            <p><span className="font-medium">Country:</span> {user.country}</p>
                            <p><span className="font-medium">Date of Birth:</span> {user.dateOfBirth}</p>
                          </div>
                        </div>

                        {/* Account Info */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Account Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                              <span className="font-medium">Total Balance</span>
                              <span className="text-green-600 font-bold text-lg">
                                ${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {userAccounts.length > 0 ? (
                                userAccounts.map((account: any) => (
                                  <div key={account.id} className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-bold text-lg text-gray-800">
                                        {account.accountType === 'business' ? 'Business Checkings Account' : 
                                         account.accountType === 'savings' ? 'Business Savings' : 
                                         account.accountType.toUpperCase() + ' Account'}
                                      </h5>
                                      <span className="text-2xl font-bold text-green-600">
                                        ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
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
                                        <p className="font-mono text-gray-800">{account.accountIdDisplay || `ACC${account.id.toString().padStart(6, '0')}`}</p>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Current Balance:</span>
                                        <p className="font-bold text-green-600">
                                          ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} Available
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => {
                                          setSelectedAccount(account);
                                          setSelectedUserName(`${user.firstName} ${user.lastName}`);
                                          setCreditModalOpen(true);
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        Credit Account
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setLocation(`/admin/customer/${user.id}`)}
                                        className="border-bof-red text-bof-red hover:bg-bof-red hover:text-white"
                                      >
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 italic text-sm">No accounts found</p>
                              )}
                              
                              {/* Card Application Section */}
                              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
                                <h5 className="font-bold text-gray-800 mb-2">Card Services</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Button 
                                    size="sm" 
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                                    onClick={() => {
                                      setLocation(`/admin/cards?userId=${user.id}`);
                                    }}
                                  >
                                    Apply for Cards
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            console.log(`Navigating to edit: /admin/customer/${user.id}/edit`);
                            setLocation(`/admin/customer/${user.id}/edit`);
                          }}
                        >
                          Edit Customer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => {
                            console.log(`Navigating to view: /admin/customer/${user.id}`);
                            setLocation(`/admin/customer/${user.id}`);
                          }}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          onClick={() => {
                            console.log(`Navigating to accounts: /admin/customer/${user.id}/accounts`);
                            setLocation(`/admin/customer/${user.id}/accounts`);
                          }}
                        >
                          Manage Accounts
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Credit Account Modal */}
      <CreditAccountModal
        isOpen={creditModalOpen}
        onClose={() => setCreditModalOpen(false)}
        account={selectedAccount}
        userFullName={selectedUserName}
      />
    </div>
  );
}