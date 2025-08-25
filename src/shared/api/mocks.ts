import type { PlanOption, UserAuth, LockItem, ObjectItem } from './types';

export const mockLogin = async (email: string, password: string): Promise<UserAuth> => {
  // имитация сетевого запроса
  await new Promise((r) => setTimeout(r, 300));
  return { userId: 3, token: '39l9BvfhqTuIHEBVc3k1...' };
};

export const mockPlans = async (): Promise<PlanOption[]> => {
  await new Promise((r) => setTimeout(r, 100));
  return [
    { id: 'test', title: 'Тест — 10 ключей на один год', keys: 10, price: 1 },
    { id: 'start', title: 'Старт — 50 ключей на один год', keys: 50, price: 200 },
    { id: 'basic', title: 'Базовый — 500 ключей на один год', keys: 500, price: 1750 },
    { id: 'biz1', title: 'Бизнес — 5000 ключей на один год', keys: 5000, price: 13300 },
    { id: 'biz2', title: 'Бизнес — 50000 ключей на один год', keys: 50000, price: 104000 },
    { id: 'unlim', title: 'Безлимит на год', keys: 999999, price: 200000 },
  ];
};

export const mockLocks = async (): Promise<LockItem[]> => {
  await new Promise((r) => setTimeout(r, 120));
  return [
    { id: 'l1', name: 'Master 85' },
    { id: 'l2', name: 'Дом' },
  ];
};

export const mockObjects = async (): Promise<ObjectItem[]> => {
  await new Promise((r) => setTimeout(r, 120));
  return [
    { id: 'o1', name: 'г. СПБ, Невский 10, кв 15', locks: [] },
    { id: 'o2', name: 'г. СПБ, пр. Стачек 17, кв 14', locks: [] },
  ];
};
