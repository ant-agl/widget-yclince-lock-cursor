<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '@/shared/lib/date';

interface PaymentRow { id: string; date: string; amount: number; plan: string }

const columns = [
  { title: 'Дата', dataIndex: 'date', key: 'date' },
  { title: 'Тариф', dataIndex: 'plan', key: 'plan' },
  { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
];

const data = ref<PaymentRow[]>([ 
  { id: 'p1', date: formatDate('2024-09-01'), amount: 200, plan: 'Старт' },
  { id: 'p2', date: formatDate('2024-12-01'), amount: 1750, plan: 'Базовый' },
]);
</script>

<template>
  <a-card title="История платежей">
    <template v-if="data.length">
      <a-table :columns="columns" :data-source="data" :pagination="false" row-key="id" />
    </template>
    <a-empty v-else />
  </a-card>
</template>
