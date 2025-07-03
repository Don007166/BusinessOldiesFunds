import { Card } from "@/lib/types";

interface BankCardDisplayProps {
  card: Card;
  className?: string;
}

export default function BankCardDisplay({ card, className = "" }: BankCardDisplayProps) {
  const getCardTypeColor = (cardType: string) => {
    switch (cardType) {
      case 'business_debit':
        return 'from-slate-800 to-slate-900';
      case 'business_credit':
        return 'from-blue-800 to-blue-900';
      case 'credit':
        return 'from-purple-800 to-purple-900';
      case 'debit':
        return 'from-green-800 to-green-900';
      default:
        return 'from-gray-800 to-gray-900';
    }
  };

  const getCardTypeName = (cardType: string) => {
    switch (cardType) {
      case 'business_debit':
        return 'Business Debit';
      case 'business_credit':
        return 'Business Credit';
      case 'credit':
        return 'Credit Card';
      case 'debit':
        return 'Debit Card';
      default:
        return 'Bank Card';
    }
  };

  return (
    <div className={`relative w-96 h-60 ${className}`}>
      <div className={`w-full h-full bg-gradient-to-br ${getCardTypeColor(card.cardType)} rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/20"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10"></div>
        </div>

        {/* Bank Logo and Name */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-lg">
              BOF
            </div>
            <div>
              <div className="text-lg font-bold">Business Oldies Funds</div>
              <div className="text-sm opacity-80">{getCardTypeName(card.cardType)}</div>
            </div>
          </div>
          
          {/* Card Type Badge */}
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
            {card.status.toUpperCase()}
          </div>
        </div>

        {/* Card Number */}
        <div className="relative z-10 mb-6">
          <div className="text-2xl font-mono font-bold tracking-wider">
            **** **** **** {card.cardNumber}
          </div>
        </div>

        {/* Card Details */}
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-xs opacity-70 mb-1">CARD HOLDER</div>
            <div className="text-sm font-semibold">{card.cardHolderName}</div>
          </div>
          
          <div className="text-right">
            <div className="text-xs opacity-70 mb-1">EXPIRES</div>
            <div className="text-sm font-semibold font-mono">{card.expiryMonth}/{card.expiryYear}</div>
          </div>
          
          <div className="text-right">
            <div className="text-xs opacity-70 mb-1">CVV</div>
            <div className="text-sm font-semibold font-mono">{card.cvv}</div>
          </div>
        </div>

        {/* Chip */}
        <div className="absolute top-24 left-6 w-12 h-9 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-lg"></div>
        
        {/* Contactless Symbol */}
        <div className="absolute top-24 right-6 w-8 h-8 opacity-60">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}