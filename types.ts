export type Currency = 'TON' | 'USDT' | 'STARS';

export interface UserProfile {
  id: number;
  username: string;
  balanceNft: number;
  balanceNftLocked: number;
  balanceDice: number;
  referralLevel: 1 | 2 | 3;
  referralEarnings: {
    TON: number;
    USDT: number;
    STARS: number;
  };
  language: 'ru' | 'en';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface PriceMap {
  TON: number;
  USDT: number;
  STARS: number;
}

export interface PricingPack {
  amount: number;
  prices: PriceMap;
}