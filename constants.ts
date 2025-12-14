import { PricingPack, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  id: 123456789,
  username: 'crypto_enthusiast',
  balanceNft: 2,
  balanceNftLocked: 0,
  balanceDice: 5,
  referralLevel: 1,
  referralEarnings: {
    TON: 1.5,
    USDT: 5.0,
    STARS: 150,
  },
  language: 'ru',
};

// 1 NFT = 11 TON / 36.6 USDT / 2000 Stars
export const NFT_PACKS: PricingPack[] = [
  { amount: 1, prices: { TON: 11, USDT: 36.6, STARS: 2000 } },
  { amount: 3, prices: { TON: 33, USDT: 109.8, STARS: 6000 } },
  { amount: 5, prices: { TON: 55, USDT: 183.0, STARS: 10000 } },
  { amount: 7, prices: { TON: 77, USDT: 256.2, STARS: 14000 } },
];

// 1 Attempt = 36.6 TON / 121 USDT / 6666 Stars
export const DICE_PACKS: PricingPack[] = [
  { amount: 1, prices: { TON: 36.6, USDT: 121, STARS: 6666 } },
  { amount: 3, prices: { TON: 109.8, USDT: 363, STARS: 19998 } },
  { amount: 5, prices: { TON: 183.0, USDT: 605, STARS: 33330 } },
  { amount: 7, prices: { TON: 256.2, USDT: 847, STARS: 46662 } },
];

export const SYSTEM_INSTRUCTION = `
Ты - официальный ИИ-ассистент проекта "nahuy_NFT_bot".
Твоя задача - помогать пользователям с вопросами о покупке NFT, лотерее и реферальной программе.

Основные факты:
1. Проект продает NFT токены.
2. Есть лотерея (Dice): покупаешь попытки, кидаешь кубик. Выпавшее число (1-6) = количеству выигранных NFT.
3. Валюты: Telegram Stars, TON, USDT.
4. Stars имеют холд 21 день (антифрод).
5. Реферальная программа: 3 уровня по 3%.
6. NFT реально минтятся (lazy mint) только при выводе.

Цены NFT:
- 1 NFT: 11 TON / 36.6 USDT / 2000 Stars
- Пакеты по 1, 3, 5, 7 штук.

Цены Лотереи (Dice):
- 1 Попытка: 36.6 TON / 121 USDT / 6666 Stars
- Пакеты по 1, 3, 5, 7 попыток.

Лимиты:
- Покупка NFT: до 42 шт/сутки.
- Попытки лотереи: до 21 шт/сутки.
- Лотерея: 1 бросок раз в 3 секунды.

Отвечай кратко, вежливо и по делу. Используй эмодзи.
Если спрашивают что-то сложное про блокчейн или смарт-контракты, давай развернутый ответ.
`;