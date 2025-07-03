import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AdminNavigationProps {
  currentPage?: string;
}

export default function AdminNavigation({ currentPage }: AdminNavigationProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

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

  const navigationItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Customers", path: "/admin/customers" },
    { label: "Manage Accounts", path: "/admin/accounts" },
    { label: "Card Services", path: "/admin/cards" },
  ];

  return (
    <div className="bg-gradient-to-r from-bof-navy to-bof-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg text-bof-navy flex items-center justify-center font-bold text-sm">
                BOF
              </div>
              <span className="text-lg font-bold">Business Oldies Funds - Admin</span>
            </div>
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => setLocation(item.path)}
                  variant={currentPage === item.path ? "default" : "ghost"}
                  className={`${
                    currentPage === item.path
                      ? "bg-white text-bof-red hover:bg-gray-100"
                      : "bg-transparent text-white hover:bg-white/10"
                  } border-0`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
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
    </div>
  );
}