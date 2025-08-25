<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/shared/store/app';
import { diffInDays, formatDate } from '@/shared/lib/date';

const store = useAppStore();

const selected = computed({
  get: () => store.selectedPlanId,
  set: (v) => (store.selectedPlanId = v as string),
});
const showLowKeys = computed(() => store.isLowKeys);
const router = useRouter();

const onPay = () => {
  router.push('/settings');
};
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-alert type="info" show-icon v-if="store.paidUntil">
      <template #message>
        До конца подписки осталось
        {{ diffInDays(new Date(), store.paidUntil as Date) }}
        {{ // корректное склонение
          (function(){ const d=diffInDays(new Date(), store.paidUntil as Date); const n10=d%10, n100=d%100; if(n10===1&&n100!==11)return 'день'; if(n10>=2&&n10<=4&&(n100<10||n100>=20)) return 'дня'; return 'дней'; })()
        }}
        ({{ formatDate(store.paidUntil as Date) }})
      </template>
    </a-alert>
    <a-alert v-if="showLowKeys" type="warning" show-icon>
      <template #message>
        Осталось ключей: {{ store.availableKeys }}. Рекомендуем докупить.
      </template>
    </a-alert>

    <a-card>
      <template #title>
        Осталось ключей: {{ store.availableKeys }}
      </template>
      <a-form layout="vertical">
        <a-form-item label="Выберите тариф:" :rules="[{ required: true }]">
          <a-tooltip title="Выберите подходящий объём ключей на год">
            <a-select
              v-model:value="selected"
              :options="store.plans.map(p => ({ label: `${p.title} / ${p.price}₽`, value: p.id }))"
              placeholder="Например: Базовый — 500 ключей"
            />
          </a-tooltip>
        </a-form-item>
        <a-button type="primary" block :disabled="!selected" @click="onPay">Оплатить</a-button>
      </a-form>
    </a-card>

    <a-card type="success" title="Вы успешно авторизованы">
      <pre style="white-space: pre-wrap">Токен авторизации: {{ store.token?.slice(0,8) }}...<br>ID пользователя: {{ store.auth?.userId }}</pre>
      <a-tooltip title="Завершить текущую сессию">
        <a-button danger @click="store.logout(); $router.push('/auth')">Выйти</a-button>
      </a-tooltip>
    </a-card>
  </a-space>
</template>
