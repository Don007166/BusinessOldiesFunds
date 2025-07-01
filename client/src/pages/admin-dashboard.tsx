import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminDashboard() {
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

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    enabled: !!admin,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Logout Error",
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
          <p>Loading admin dashboard...</p>
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
            <div className="w-8 h-8 bg-white rounded text-bof-red flex items-center justify-center font-bold text-sm">
              BOF
            </div>
            <h1 className="text-xl font-bold">Business Oldies Funds - Admin Dashboard</h1>
          </div>
          <Button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="bg-white text-bof-red hover:bg-gray-100"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {admin?.username || 'Admin'}
            </h2>
            <p className="text-gray-600">Manage your banking operations from this dashboard.</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
              <p>Loading dashboard data...</p>
            </div>
          ) : dashboardData ? (
            <>
              {/* Total Balance Highlight */}
              <div className="mb-8">
                <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-white text-lg font-medium mb-2">Total Bank Balance</h2>
                        <p className="text-white text-4xl font-bold">${dashboardData?.stats?.totalBalance?.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '100,000,000.00'}</p>
                        <p className="text-green-100 text-sm mt-2">All accounts combined</p>
                      </div>
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -mr-10 -mt-10 opacity-30"></div>
                    <div className="flex items-center relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div className="ml-5 flex-1">
                        <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{dashboardData?.stats?.totalCustomers || 0}</h3>
                        <p className="text-gray-600 text-sm font-medium tracking-wide mt-1">Total Customers</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-700 text-xs font-bold">+5.2%</span>
                            <span className="text-green-600 text-xs font-medium ml-1">vs last month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200 to-green-200 rounded-full -mr-10 -mt-10 opacity-30"></div>
                    <div className="flex items-center relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-5 flex-1">
                        <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{dashboardData?.stats?.activeAccounts || 0}</h3>
                        <p className="text-gray-600 text-sm font-medium tracking-wide mt-1">Active Accounts</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gradient-to-r from-emerald-100 to-green-100 px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 text-emerald-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-emerald-700 text-xs font-bold">98.5%</span>
                            <span className="text-emerald-600 text-xs font-medium ml-1">active rate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-md">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full -mr-10 -mt-10 opacity-30"></div>
                    <div className="flex items-center relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-5 flex-1">
                        <div className="flex items-baseline space-x-1">
                          <h3 className="text-4xl font-bold text-gray-900 tracking-tight">${Math.round((dashboardData?.stats?.totalDeposits || 0) / 1000)}</h3>
                          <span className="text-2xl font-semibold text-gray-600">K</span>
                        </div>
                        <p className="text-gray-600 text-sm font-medium tracking-wide mt-1">Total Deposits</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gradient-to-r from-orange-100 to-yellow-100 px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 text-orange-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-orange-700 text-xs font-bold">+12.3%</span>
                            <span className="text-orange-600 text-xs font-medium ml-1">this quarter</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-purple-50 to-violet-50 shadow-md">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full -mr-10 -mt-10 opacity-30"></div>
                    <div className="flex items-center relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-5 flex-1">
                        <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{dashboardData?.stats?.creditCards || 0}</h3>
                        <p className="text-gray-600 text-sm font-medium tracking-wide mt-1">Credit Cards</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gradient-to-r from-purple-100 to-violet-100 px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 text-purple-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            <span className="text-purple-700 text-xs font-bold">Premium</span>
                            <span className="text-purple-600 text-xs font-medium ml-1">products</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Management Sections */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Management */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Customer Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {dashboardData.recentCustomers.map((customer: any) => (
                        <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">{customer.firstName} {customer.lastName}</h4>
                            <p className="text-sm text-gray-600">{customer.email}</p>
                            <p className="text-sm text-gray-600">ID: {customer.id}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button className="w-full bg-bof-blue hover:bg-bof-navy">
                        View All Customers
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Management */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Account Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="p-4 h-auto border-dashed border-gray-300 hover:border-bof-blue hover:bg-blue-50">
                          <div className="text-center">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium">Create New Account</p>
                          </div>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50">
                          <div className="text-center">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium">Process Transactions</p>
                          </div>
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="font-medium">Checking Accounts</span>
                          <span className="text-green-600 font-bold">{dashboardData.accountTypes.checking}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <span className="font-medium">Savings Accounts</span>
                          <span className="text-blue-600 font-bold">{dashboardData.accountTypes.savings}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <span className="font-medium">Business Accounts</span>
                          <span className="text-purple-600 font-bold">{dashboardData.accountTypes.business}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <span className="font-medium">Loan Accounts</span>
                          <span className="text-orange-600 font-bold">{dashboardData.accountTypes.loan}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-l-4 border-green-500 bg-green-50">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        <div>
                          <p className="font-medium">New customer registration</p>
                          <p className="text-sm text-gray-600">Email: new.customer@email.com</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">Large transaction processed</p>
                          <p className="text-sm text-gray-600">Amount: $15,000.00</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">15 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">Security alert resolved</p>
                          <p className="text-sm text-gray-600">Suspicious login attempt blocked</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load dashboard data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
