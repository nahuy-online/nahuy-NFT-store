export enum Currency {
  TON = 'TON',
  USDT = 'USDT',
  STARS = 'STARS'
}

export enum AppTab {
  MARKET = 'market',
  LOTTERY = 'lottery',
  PROFILE = 'profile',
  SUPPORT = 'support'
}

export interface User {
  id: number;
  username: string;
  balanceNft: number;
  balanceNftLocked: number;
  balanceDice: number;
  walletAddress: string | null;
}

export interface NftPackage {
  id: number;
  amount: number;
  price: Record<Currency, number>;
  image: string;
  title: string;
}

export interface ReferralStat {
  level: number;
  percent: number;
  earned: number;
}