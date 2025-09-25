
export interface User {
  name: string;
  email: string;
}

export enum Page {
  HOME = 'HOME',
  WALLET = 'WALLET',
  PAYMENT = 'PAYMENT'
}

export enum BadgeType {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD'
}

export interface Badge {
    type: BadgeType;
    count: number;
}
