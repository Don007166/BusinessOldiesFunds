import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";

export default function CustomersList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { admin, isLoading: isAdminLoading } = useAdmin();

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
      {/* Header */}
      <div className="bg-bof-red text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation("/admin/dashboard")}
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              ← Back to Dashboard
            </Button>
            <div className="w-8 h-8 bg-white rounded text-bof-red flex items-center justify-center font-bold text-sm">
              BOF
            </div>
            <h1 className="text-xl font-bold">Customer Management</h1>
          </div>
        </div>
      </div>

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
                            <div className="space-y-2">
                              {userAccounts.length > 0 ? (
                                userAccounts.map((account: any) => (
                                  <div key={account.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div>
                                      <span className="font-medium text-sm">{account.accountType.toUpperCase()}</span>
                                      <p className="text-xs text-gray-600">{account.accountNumber}</p>
                                    </div>
                                    <span className="font-bold text-sm">
                                      ${parseFloat(account.balance || '0').toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 italic text-sm">No accounts found</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => setLocation(`/admin/customer/${user.id}/edit`)}
                        >
                          Edit Customer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => setLocation(`/admin/customer/${user.id}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          onClick={() => setLocation(`/admin/customer/${user.id}/accounts`)}
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
    </div>
  );
}