<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/shared/store/app';

const email = ref('');
const password = ref('');
const loading = ref(false);

const router = useRouter();
const store = useAppStore();

const onLogin = async () => {
  loading.value = true;
  await store.login(email.value, password.value);
  await store.loadPlans();
  loading.value = false;
  router.push('/plans');
};
</script>

<template>
  <a-card title="Авторизация">
    <a-form layout="vertical" @submit.prevent>
      <a-form-item label="Email">
        <a-tooltip title="Email для входа в yClients">
          <a-input v-model:value="email" type="email" placeholder="name@company.com" />
        </a-tooltip>
        <template v-if="email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)" #help>
          Некорректный email
        </template>
      </a-form-item>
      <a-form-item label="Пароль">
        <a-tooltip title="Пароль от аккаунта">
          <a-input-password v-model:value="password" placeholder="••••••••" />
        </a-tooltip>
        <template v-if="password === '' && (email || password)" #help>
          Введите пароль
        </template>
      </a-form-item>
      <a-space>
        <a-button
          type="primary"
          :loading="loading"
          :disabled="!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)"
          @click="onLogin"
        >
          Войти
        </a-button>
      </a-space>
    </a-form>
  </a-card>
</template>
