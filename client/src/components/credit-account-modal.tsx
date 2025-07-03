import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Account } from "@/lib/types";

interface CreditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
  userFullName: string;
}

export default function CreditAccountModal({ isOpen, onClose, account, userFullName }: CreditAccountModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const creditMutation = useMutation({
    mutationFn: async (data: { accountId: number; amount: string; description: string }) => {
      return await apiRequest("POST", "/api/admin/credit-account", data);
    },
    onSuccess: (data) => {
      toast({
        title: "Account Credited",
        description: `Successfully credited $${amount} to ${userFullName}'s ${account?.accountType} account.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      onClose();
      setAmount("");
      setDescription("");
    },
    onError: (error: Error) => {
      toast({
        title: "Credit Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    creditMutation.mutate({
      accountId: account.id,
      amount: parseFloat(amount).toFixed(2),
      description: description || `Admin credit - $${amount}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Credit Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Input
              id="customer"
              value={userFullName}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Input
              id="account"
              value={`${account?.accountType?.toUpperCase()} - ${account?.accountNumber}`}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-balance">Current Balance</Label>
            <Input
              id="current-balance"
              value={`$${parseFloat(account?.balance || "0").toFixed(2)}`}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Credit Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to credit"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description for this credit"
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creditMutation.isPending}
              className="bg-bof-red hover:bg-bof-red/90"
            >
              {creditMutation.isPending ? "Processing..." : "Credit Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}