<script setup lang="ts">
import { ref } from 'vue';

// Моки стадий сделок и действий
interface Stage { id: string; name: string }
interface Trigger { stageId: string; action: 'attach' | 'detach' }

const stages: Stage[] = [
  { id: 's1', name: 'Входящая бронь' },
  { id: 's2', name: 'Инструкция' },
  { id: 's3', name: 'Бронь оплачена' },
  { id: 's4', name: 'Заселение гостя' },
  { id: 's5', name: 'Выезд гостя' },
  { id: 's6', name: 'Сделка успешна' },
  { id: 's7', name: 'Сделка провалена' },
];

const selected = ref<Record<string, Trigger>>({});
</script>

<template>
  <a-card title="Настройка событий бизнес-процесса">
    <a-form layout="vertical">
      <a-form-item label="Сделки">
        <div class="grid">
          <div v-for="s in stages" :key="s.id" class="stage">
            <a-tooltip :title="`Событие: ${s.name}`">
              <a-checkbox v-model:checked="selected[s.id]">
                {{ s.name }}
              </a-checkbox>
            </a-tooltip>
            <a-select
              v-if="selected[s.id]"
              v-model:value="selected[s.id].action"
              style="width: 180px; margin-left: 8px"
              :options="[
                { label: 'Привязать ключ', value: 'attach' },
                { label: 'Отвязать ключ', value: 'detach' },
              ]"
              placeholder="Выберите действие"
            />
          </div>
        </div>
      </a-form-item>
    </a-form>
    <a-space>
      <router-link to="/settings"><a-button>Назад</a-button></router-link>
      <a-button type="primary">Сохранить</a-button>
    </a-space>
  </a-card>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.stage { display: grid; grid-template-columns: 220px 200px; align-items: center; gap: 12px; }
</style>
