<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useAppStore } from '@/shared/store/app';

const router = useRouter();
const route = useRoute();
const store = useAppStore();

const activeKey = computed({
  get: () => route.path,
  set: (v: string) => router.push(v),
});

const isAuthed = computed(() => Boolean(store.token));
</script>

<template>
  <a-tabs v-model:active-key="activeKey">
    <a-tab-pane v-if="!isAuthed" key="/auth" tab="Авторизация" />
    <a-tab-pane v-if="isAuthed" key="/plans" tab="Тариф" />
    <a-tab-pane v-if="isAuthed" key="/settings" tab="Настройка" />
    <a-tab-pane v-if="isAuthed" key="/payments" tab="История платежей" />
  </a-tabs>
  <router-view />
</template>
