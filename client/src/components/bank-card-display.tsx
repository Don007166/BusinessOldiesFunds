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
      case 'savings':
        return 'from-emerald-700 to-teal-800';
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
      case 'savings':
        return 'Savings Card';
      default:
        return 'Bank Card';
    }
  };

  return (
    <div className={`relative w-96 h-60 ${className}`}>
      <div className={`w-full h-full bg-gradient-to-br ${getCardTypeColor(card.cardType)} rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden`}>
        {/* Background Pattern with different icons based on card type */}
        <div className="absolute inset-0 opacity-10">
          {/* Different icons for different card types */}
          <div className="absolute right-8 bottom-8 w-24 h-32 opacity-30">
            {card.cardType === 'savings' ? (
              /* Savings - Tree/Growth Symbol */
              <svg viewBox="0 0 100 120" className="w-full h-full fill-white">
                <circle cx="50" cy="30" r="20"/>
                <circle cx="35" cy="45" r="15"/>
                <circle cx="65" cy="45" r="15"/>
                <circle cx="30" cy="65" r="12"/>
                <circle cx="70" cy="65" r="12"/>
                <rect x="48" y="70" width="4" height="30"/>
                <rect x="45" y="90" width="10" height="20"/>
                <path d="M40 110 L60 110 L65 120 L35 120 Z"/>
              </svg>
            ) : (
              /* Business - Statue of Liberty */
              <svg viewBox="0 0 100 120" className="w-full h-full fill-white">
                <path d="M50 10 L48 20 L52 20 Z"/>
                <path d="M45 18 L55 18 L58 25 L42 25 Z"/>
                <path d="M40 25 L60 25 L62 35 L38 35 Z"/>
                <path d="M38 35 L62 35 L65 50 L35 50 Z"/>
                <path d="M35 50 L65 50 L68 70 L32 70 Z"/>
                <path d="M32 70 L68 70 L70 90 L30 90 Z"/>
                <path d="M30 90 L70 90 L75 110 L25 110 Z"/>
                <rect x="25" y="110" width="50" height="10"/>
                <path d="M60 15 L65 12 L67 18 L62 21 Z"/>
              </svg>
            )}
          </div>
          
          {/* Premium geometric patterns */}
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/20"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10"></div>
          
          {/* Additional premium elements */}
          <div className="absolute top-16 left-8 w-16 h-16 border border-white/15 rotate-45"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 border border-white/15 rotate-12"></div>
        </div>

        {/* Bank Logo and Name */}
        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-lg">
              BOF
            </div>
            <div>
              <div className="text-lg font-bold">Business Oldies Funds</div>
              <div className="text-sm opacity-80">{getCardTypeName(card.cardType)}</div>
            </div>
          </div>
          
          {/* CHKDB Badge */}
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
            CHKDB
          </div>
        </div>

        {/* Card Number */}
        <div className="relative z-10 mb-6">
          <div className="text-2xl font-mono font-bold tracking-wider">
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mr-3">****</span>
            <span className="text-white drop-shadow-lg">**** **** {card.cardNumber}</span>
          </div>
        </div>

        {/* Card Details */}
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-xs opacity-70 mb-1 tracking-wider">CARD HOLDER</div>
            <div className="text-sm font-bold tracking-wide">{card.cardHolderName}</div>
          </div>
          
          <div className="text-right">
            <div className="text-xs opacity-70 mb-1 tracking-wider">EXPIRES</div>
            <div className="text-sm font-bold font-mono tracking-wider">{card.expiryMonth}/{card.expiryYear}</div>
          </div>
          
          <div className="text-right">
            <div className="text-xs opacity-70 mb-1 tracking-wider">CVV</div>
            <div className="text-sm font-bold font-mono tracking-wider">{card.cvv}</div>
          </div>
        </div>
        
        {/* Premium Holographic Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 opacity-60"></div>

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