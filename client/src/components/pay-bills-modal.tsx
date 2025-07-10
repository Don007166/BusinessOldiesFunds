import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Array<{
    id: number;
    accountType: string;
    accountNumber: string;
    balance: string;
  }>;
}

export default function PayBillsModal({ isOpen, onClose, accounts }: PayBillsModalProps) {
  const [formData, setFormData] = useState({
    payee: "",
    accountNumber: "",
    amount: "",
    payFromAccount: "",
    paymentDate: "",
    memo: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const commonPayees = [
    "Electricity Company",
    "Gas Company", 
    "Internet Provider",
    "Credit Card",
    "Phone Company",
    "Water Company",
    "Insurance Company",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Bill Payment Scheduled",
      description: "Your bill payment has been scheduled successfully.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        payee: "",
        accountNumber: "",
        amount: "",
        payFromAccount: "",
        paymentDate: "",
        memo: ""
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
            <h3 className="text-2xl font-bold text-bof-navy mb-2">Payment Scheduled!</h3>
            <p className="text-gray-600 mb-4">Your bill payment has been scheduled successfully.</p>
            <p className="text-sm text-gray-500">You'll receive a confirmation email shortly.</p>
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
            Pay Bills
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payee">Payee</Label>
            <Select value={formData.payee} onValueChange={(value) => handleChange("payee", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select or choose payee" />
              </SelectTrigger>
              <SelectContent>
                {commonPayees.map((payee) => (
                  <SelectItem key={payee} value={payee}>
                    {payee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="accountNumber">Account Number with Payee</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              placeholder="Your account number with the payee"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                type="date"
                value={formData.paymentDate}
                onChange={(e) => handleChange("paymentDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payFromAccount">Pay From Account</Label>
            <Select value={formData.payFromAccount} onValueChange={(value) => handleChange("payFromAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select account to pay from" />
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

          <div>
            <Label htmlFor="memo">Memo (Optional)</Label>
            <Input
              id="memo"
              value={formData.memo}
              onChange={(e) => handleChange("memo", e.target.value)}
              placeholder="Payment memo or note"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Schedule Payment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}