// Общие типы API (моки)
export interface UserAuth {
  userId: number;
  token: string;
}

export interface PlanOption {
  id: string;
  title: string;
  keys: number;
  price: number;
}

export interface LockItem {
  id: string;
  name: string;
  linkedTo?: string;
}

export interface ObjectItem {
  id: string;
  name: string;
  locks: string[];
}

export type EntityType = 'company' | 'contact';
