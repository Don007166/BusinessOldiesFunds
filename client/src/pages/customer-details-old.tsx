import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowLeft, User, MapPin, Calendar, Phone, Mail, Building2, Wallet } from "lucide-react";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bof-blue mx-auto mb-4"></div>
          <p>Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
          <p className="text-gray-600 mb-4">The requested customer could not be found.</p>
          <Button onClick={() => setLocation("/admin/customers")}>
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  const totalBalance = Array.isArray(accounts) ? accounts.reduce((sum: number, account: any) => {
    return sum + parseFloat(account.balance || "0");
  }, 0) : 0;

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
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
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
          {/* Customer Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-bof-blue rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
                <Badge variant={user.isActive ? "default" : "secondary"}>
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{user.dateOfBirth}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{user.address}</p>
                        <p className="text-sm text-gray-600">
                          {user.city}, {user.state} {user.zipCode}
                        </p>
                        <p className="text-sm text-gray-600">{user.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-800">Total Balance</span>
                      <span className="text-green-600 font-bold text-2xl">
                        ${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Array.isArray(accounts) && accounts.map((account: any) => (
                      <div key={account.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800 capitalize">
                            {account.accountType.replace('_', ' ')} Account
                          </h4>
                          <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                            {account.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Account Number</span>
                            <p className="font-mono font-medium">{account.accountNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Account ID</span>
                            <p className="font-mono font-medium">
                              {account.accountIdDisplay || `ACC${account.id.toString().padStart(6, '0')}`}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Balance</span>
                            <p className="font-bold text-lg text-green-600">
                              ${parseFloat(account.balance || "0").toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cards Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(cards) && cards.length > 0 ? (
                    <div className="space-y-4">
                      {cards.map((card: any) => (
                        <div key={card.id} className="relative">
                          {/* Card Design */}
                          <div className="relative w-full h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-xl overflow-hidden">
                            {/* Card Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                            <div className="absolute top-6 right-6 w-4 h-4 bg-white bg-opacity-30 rounded-full"></div>
                            
                            {/* Card Content */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                              {/* Top Section */}
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="text-xs font-medium opacity-80 mb-1">
                                    BUSINESS DEBIT
                                  </div>
                                  <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs opacity-80">BANK OF FINANCE</div>
                                  <div className="text-xs font-bold">BOF</div>
                                </div>
                              </div>

                              {/* Card Number */}
                              <div className="text-center">
                                <div className="text-lg font-mono tracking-wider">
                                  {card.card_number}
                                </div>
                              </div>

                              {/* Bottom Section */}
                              <div className="flex items-end justify-between">
                                <div>
                                  <div className="text-xs opacity-80 mb-1">CARDHOLDER</div>
                                  <div className="text-sm font-medium">
                                    {card.cardholder_name}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                                  <div className="text-sm font-medium">{card.expiry_date}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Details */}
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Card Type</span>
                                <p className="font-medium capitalize">
                                  {card.card_type.replace('_', ' ')}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">CVV</span>
                                <p className="font-mono font-medium">{card.cvv}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Status</span>
                                <Badge variant={card.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                                  {card.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No payment cards found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}