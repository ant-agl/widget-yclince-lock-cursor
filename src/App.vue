<script setup lang="ts">
// Корневой макет приложения для iFrame-виджета
import { computed } from 'vue'

import IndexTabs from '@/pages/index/IndexTabs.vue'
import { useAppStore } from '@/shared/store/app'

const store = useAppStore()
const showLowKeys = computed(() => store.isLowKeys)
</script>

<template>
  <div style="max-width: 750px; margin: 0 auto; padding: 16px">
    <IndexTabs />
    <a-modal v-model:open="(showLowKeys as any)" :footer="null" title="Мало ключей" :width="520">
      Осталось ключей: {{ store.availableKeys }}. Рекомендуем приобрести больше ключей в разделе
      «Тариф».
      <div style="margin-top: 12px">
        <router-link to="/plans"><a-button type="primary">Выбрать тариф</a-button></router-link>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
/* Базовая шапка и фон как у виджета */
</style>
