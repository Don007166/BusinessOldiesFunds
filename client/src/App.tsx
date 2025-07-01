import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import CustomersList from "@/pages/customers-list";
import CustomerDetails from "@/pages/customer-details";
import EditCustomer from "@/pages/edit-customer";
import ManageAccounts from "@/pages/manage-accounts";
import UserDashboard from "@/pages/user-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/customers" component={CustomersList} />
      <Route path="/admin/customer/:userId" component={CustomerDetails} />
      <Route path="/admin/customer/:userId/edit" component={EditCustomer} />
      <Route path="/admin/customer/:userId/accounts" component={ManageAccounts} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
