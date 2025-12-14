import { Currency, NftPackage, User } from '../types';

export const mockUser: User = {
  id: 12345678,
  username: 'crypto_king',
  balanceNft: 12,
  balanceNftLocked: 5,
  balanceDice: 3,
  walletAddress: null
};

export const nftPackages: NftPackage[] = [
  {
    id: 1,
    amount: 1,
    title: "Starter Pack",
    price: { [Currency.TON]: 2, [Currency.USDT]: 10, [Currency.STARS]: 100 },
    image: "https://picsum.photos/200/200?random=1"
  },
  {
    id: 2,
    amount: 3,
    title: "Collector's Trio",
    price: { [Currency.TON]: 5, [Currency.USDT]: 25, [Currency.STARS]: 250 },
    image: "https://picsum.photos/200/200?random=2"
  },
  {
    id: 3,
    amount: 5,
    title: "Investor Bundle",
    price: { [Currency.TON]: 8, [Currency.USDT]: 40, [Currency.STARS]: 400 },
    image: "https://picsum.photos/200/200?random=3"
  },
  {
    id: 4,
    amount: 7,
    title: "Whale Set",
    price: { [Currency.TON]: 10, [Currency.USDT]: 50, [Currency.STARS]: 500 },
    image: "https://picsum.photos/200/200?random=4"
  }
];

export const simulateApiCall = <T,>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};