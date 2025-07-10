import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TransferMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Array<{
    id: number;
    accountType: string;
    accountNumber: string;
    balance: string;
  }>;
}

export default function TransferMoneyModal({ isOpen, onClose, accounts }: TransferMoneyModalProps) {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    transferType: "internal"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Transfer Initiated",
      description: "Your money transfer has been processed successfully.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fromAccount: "",
        toAccount: "",
        amount: "",
        description: "",
        transferType: "internal"
      });
      onClose();
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-bof-navy mb-2">Transfer Complete!</h3>
            <p className="text-gray-600 mb-4">Your money transfer has been processed successfully.</p>
            <p className="text-sm text-gray-500">Transaction will be reflected in your account within minutes.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-bof-navy text-center">
            Transfer Money
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="transferType">Transfer Type</Label>
            <Select value={formData.transferType} onValueChange={(value) => handleChange("transferType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Between My Accounts</SelectItem>
                <SelectItem value="external">To External Account</SelectItem>
                <SelectItem value="wire">Wire Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fromAccount">From Account</Label>
            <Select value={formData.fromAccount} onValueChange={(value) => handleChange("fromAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.accountType} - {account.accountNumber} (${account.balance})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.transferType === "internal" ? (
            <div>
              <Label htmlFor="toAccount">To Account</Label>
              <Select value={formData.toAccount} onValueChange={(value) => handleChange("toAccount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.filter(acc => acc.id.toString() !== formData.fromAccount).map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      {account.accountType} - {account.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>
              <Label htmlFor="toAccount">To Account Number</Label>
              <Input
                id="toAccount"
                value={formData.toAccount}
                onChange={(e) => handleChange("toAccount", e.target.value)}
                placeholder="Enter recipient account number"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="What's this transfer for?"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-bof-blue hover:bg-bof-navy">
              Transfer Money
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}