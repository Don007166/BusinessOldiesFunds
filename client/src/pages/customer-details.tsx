import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowLeft, User, MapPin, Calendar, Phone, Mail, Building2, Wallet, DollarSign } from "lucide-react";
import BankCardDisplay from "@/components/bank-card-display";
import AdminNavigation from "@/components/admin-navigation";
import { User as UserType, Account, Card as CardType } from "@/lib/types";

export default function CustomerDetails() {
  const [, setLocation] = useLocation();
  const { userId } = useParams();

  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ['/api/admin/user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!userId
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery<Account[]>({
    queryKey: ['/api/admin/user-accounts', userId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user/${userId}/accounts`);
      if (!response.ok) throw new Error('Failed to fetch accounts');
      return response.json();
    },
    enabled: !!userId
  });

  const { data: cards, isLoading: cardsLoading } = useQuery<CardType[]>({
    queryKey: ['/api/admin/user-cards', userId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user/${userId}/cards`);
      if (!response.ok) throw new Error('Failed to fetch cards');
      return response.json();
    },
    enabled: !!userId
  });

  if (userLoading || accountsLoading || cardsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation currentPage="/admin/customers" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading customer details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation currentPage="/admin/customers" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
            <p className="text-gray-600 mb-4">The requested customer could not be found.</p>
            <Button onClick={() => setLocation("/admin/customers")} className="bg-bof-blue hover:bg-bof-navy">
              Back to Customers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalBalance = accounts?.reduce((sum, acc) => sum + parseFloat(acc.balance || "0"), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation currentPage="/admin/customers" />
      
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            onClick={() => setLocation("/admin/customers")}
            variant="outline"
            className="mb-6 hover:bg-bof-blue hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Button>

          {/* Customer Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-bof-blue">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#006" d="M0 0h640v480H0z"/>
                    <path fill="#fff" d="M0 0h320v240H0z"/>
                    <path fill="#c8102e" d="M120 0h80v240h-80zM0 80h320v80H0z"/>
                    <path fill="#006" d="M160 20h40v40h-40zM40 60h40v40H40zM240 60h40v40h-40zM40 140h40v40H40zM240 140h40v40h-40zM160 180h40v40h-40z"/>
                    <g fill="#fff">
                      <path d="M0 0v40l240 180v-40L40 0H0zM0 40v40l200 150v-40L40 40H0z"/>
                      <path d="M320 0v40L80 220v-40L280 0h40zM320 40v40L120 230v-40L280 40h40z"/>
                    </g>
                    <path fill="#c8102e" d="M0 20h320v20H0zM0 200h320v20H0z"/>
                    <g fill="#006">
                      <circle r="40" cx="480" cy="150"/>
                      <circle r="16" cx="480" cy="150" fill="#c8102e"/>
                      <circle r="6" cx="480" cy="150" fill="#fff"/>
                    </g>
                    <g fill="#ffd100">
                      <path d="M420 90l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                      <path d="M540 90l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                      <path d="M420 210l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                      <path d="M540 210l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                      <path d="M480 60l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                      <path d="M600 150l15 30h30l-24 18 9 30-30-22-30 22 9-30-24-18h30z"/>
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {user.firstName} {user.lastName}
                  </h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-600 font-medium">@{user.username}</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {user.isActive ? "Active Account" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Customer ID: 99201</span>
                    <span>License: {user.driversLicenseNumber}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Total Balance</div>
                <div className="text-3xl font-bold text-green-600">
                  ${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Information */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-bof-navy">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-bof-blue" />
                        <div>
                          <div className="text-sm text-gray-500">Email Address</div>
                          <div className="font-medium">{user.email || 'Not provided'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-bof-blue" />
                        <div>
                          <div className="text-sm text-gray-500">Phone Number</div>
                          <div className="font-medium">{user.phone || 'Not provided'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-bof-blue" />
                        <div>
                          <div className="text-sm text-gray-500">Date of Birth</div>
                          <div className="font-medium">{user.dateOfBirth || 'Not provided'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-bof-blue" />
                        <div>
                          <div className="text-sm text-gray-500">Address</div>
                          <div className="font-medium">
                            {user.address}<br />
                            {user.city}, {user.state} {user.zipCode}<br />
                            {user.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-bof-navy">
                    <Building2 className="w-5 h-5 mr-2" />
                    Business Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {accounts && accounts.length > 0 ? (
                    <div className="space-y-4">
                      {accounts.map((account) => (
                        <div key={account.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-bof-blue rounded-full flex items-center justify-center text-white font-bold">
                                {account.accountType === 'business' ? 'BC' : 'BS'}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {account.accountType === 'business' ? 'Business Checkings Account' : 
                                   account.accountType === 'savings' ? 'Business Savings' : 
                                   account.accountType.replace('_', ' ')}
                                </div>
                                <div className="text-sm text-gray-500">Account {account.accountNumber}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${parseFloat(account.balance || "0").toLocaleString('en-US', {minimumFractionDigits: 2})}
                              </div>
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                {account.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No accounts found</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cards Section */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-bof-navy">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Bank Cards
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {cards && cards.length > 0 ? (
                    <div className="space-y-6">
                      {cards.map((card) => (
                        <div key={card.id} className="flex justify-center">
                          <BankCardDisplay card={card} className="transform hover:scale-105 transition-transform duration-200" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No cards issued</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-bof-navy">
                    <Wallet className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Button 
                    onClick={() => setLocation(`/admin/customer/${userId}/accounts`)}
                    className="w-full bg-bof-blue hover:bg-bof-navy transition-colors"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Manage Accounts
                  </Button>
                  <Button 
                    onClick={() => setLocation(`/admin/customer/${userId}/edit`)}
                    variant="outline" 
                    className="w-full hover:bg-bof-blue hover:text-white"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Customer
                  </Button>
                  <Button 
                    onClick={() => setLocation(`/admin/customer/${userId}/cards`)}
                    variant="outline" 
                    className="w-full hover:bg-bof-blue hover:text-white"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card Services
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}