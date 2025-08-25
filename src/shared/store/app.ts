import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { PlanOption, UserAuth, LockItem, ObjectItem } from '@/shared/api/types';
import { mockLogin, mockLocks, mockObjects, mockPlans } from '@/shared/api/mocks';
import { addYears, formatDate } from '@/shared/lib/date';

export const useAppStore = defineStore('app', () => {
  // Авторизация
  const auth = ref<UserAuth | null>(null);
  const token = ref<string | null>(null);

  // Тарифы и ключи
  const plans = ref<PlanOption[]>([]);
  const selectedPlanId = ref<string | null>(null);
  const availableKeys = ref<number>(72); // по умолчанию из примера
  const paidUntil = ref<Date | null>(null);

  // Замки и объекты
  const locks = ref<LockItem[]>([]);
  const objects = ref<ObjectItem[]>([]);

  const isLowKeys = computed(() => availableKeys.value < 10);
  const selectedPlan = computed(() => plans.value.find((p) => p.id === selectedPlanId.value) || null);
  const paidUntilFormatted = computed(() => (paidUntil.value ? formatDate(paidUntil.value) : ''));

  async function login(email: string, password: string) {
    auth.value = await mockLogin(email, password);
    token.value = auth.value.token; // мокаем токен в сторе
    paidUntil.value = addYears(new Date(), 1);
    return auth.value;
  }

  function logout() {
    auth.value = null;
    token.value = null;
  }

  async function loadPlans() {
    plans.value = await mockPlans();
    if (!selectedPlanId.value) selectedPlanId.value = plans.value[0]?.id ?? null;
  }

  async function loadLocksAndObjects() {
    [locks.value, objects.value] = await Promise.all([mockLocks(), mockObjects()]);
  }

  function linkLockToObject(lockId: string, objectId: string) {
    const obj = objects.value.find((o) => o.id === objectId);
    if (!obj) return;
    if (!obj.locks.includes(lockId)) obj.locks.push(lockId);
    const lock = locks.value.find((l) => l.id === lockId);
    if (lock) lock.linkedTo = objectId;
  }

  function unlinkLockFromObject(lockId: string, objectId: string) {
    const obj = objects.value.find((o) => o.id === objectId);
    if (!obj) return;
    obj.locks = obj.locks.filter((id) => id !== lockId);
    const lock = locks.value.find((l) => l.id === lockId);
    if (lock) delete lock.linkedTo;
  }

  return {
    auth,
    token,
    plans,
    selectedPlanId,
    selectedPlan,
    availableKeys,
    isLowKeys,
    paidUntil,
    paidUntilFormatted,
    locks,
    objects,
    login,
    logout,
    loadPlans,
    loadLocksAndObjects,
    linkLockToObject,
    unlinkLockFromObject,
  };
});
