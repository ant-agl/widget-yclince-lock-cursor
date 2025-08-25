<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import draggable from 'vuedraggable';

import type { LockItem } from '@/shared/api/types';
import { useAppStore } from '@/shared/store/app';

type Entity = 'company' | 'contact';
const selectedEntity = ref<Entity>('company');

const store = useAppStore();
onMounted(() => {
  if (!store.locks.length || !store.objects.length) {
    store.loadLocksAndObjects();
  }
});

const showOnlyUnassigned = ref(false);
const filteredLocks = computed(() =>
  showOnlyUnassigned.value ? store.locks.filter((l) => !l.linkedTo) : store.locks,
);

// Возвращает реальные объекты замков, привязанных к объекту (без undefined)
const getObjectLocks = (objectId: string): LockItem[] => {
  const obj = store.objects.find((o) => o.id === objectId);
  if (!obj) return [] as LockItem[];
  return obj.locks
    .map((id) => store.locks.find((l) => l.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
};

// Тип события для vuedraggable (минимально необходимый)
type DraggableChangeEvent<T> = {
  added?: { element: T } | null
  removed?: { element: T } | null
} | null

const onChange = (objectId: string, e: DraggableChangeEvent<LockItem>) => {
  if (e?.added?.element) {
    const el = e.added.element as { id: string };
    if (el?.id) store.linkLockToObject(el.id, objectId);
  }
  if (e?.removed?.element) {
    const el = e.removed.element as { id: string };
    if (el?.id) store.unlinkLockFromObject(el.id, objectId);
  }
};

const removeFromObject = (objectId: string, lockId: string) => {
  store.unlinkLockFromObject(lockId, objectId);
};

const hasAnyLinked = computed(() => store.locks.some((l) => l.linkedTo));

// Клон элемента для vuedraggable — избавляемся от стрелки в шаблоне
const cloneLock = (lock: LockItem): LockItem => ({ ...lock });
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-card title="Настройки замков и сущностей">
      <a-radio-group v-model:value="selectedEntity" button-style="solid">
        <a-radio-button value="company">Компания</a-radio-button>
        <a-radio-button value="contact">Контакт</a-radio-button>
      </a-radio-group>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="12">
          <div class="panel">
            <div class="panel-title">Объект</div>
            <div class="objects">
              <div v-for="o in store.objects" :key="o.id" class="object">
                <div class="object-title">{{ o.name }}</div>
                <draggable
                  class="object-dnd"
                  :list="getObjectLocks(o.id)"
                  :group="{ name: 'locks', pull: false, put: true }"
                  item-key="id"
                  :sort="false"
                  @change="onChange(o.id, $event)"
                >
                  <template #item="{ element }">
                    <a-tag closable class="lock-chip" @close="() => removeFromObject(o.id, element!.id)">
                      <span class="lock-chip-text">{{ element!.name }}</span>
                    </a-tag>
                  </template>
                </draggable>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="panel">
            <div class="panel-title">
              Замок
              <a-tooltip title="Показывает только ключи, которые не привязаны к объектам">
                <a-checkbox v-model:checked="showOnlyUnassigned" style="margin-left: 8px">
                  Показать только непривязанные
                </a-checkbox>
              </a-tooltip>
            </div>
            <draggable
              class="locks"
              :list="filteredLocks"
              :group="{ name: 'locks', pull: 'clone', put: false }"
              item-key="id"
              :clone="cloneLock"
              :sort="false"
            >
              <template #item="{ element }">
                <div class="lock-row">
                  <span class="lock-title">{{ element.name }}</span>
                  <a-badge v-if="!element.linkedTo" status="processing" />
                  <a-badge v-else status="default" />
                </div>
              </template>
            </draggable>
          </div>
        </a-col>
      </a-row>

      <a-space style="margin-top: 16px">
        <router-link to="/auth"><a-button>Назад</a-button></router-link>
        <router-link to="/settings/triggers"><a-button type="primary" :disabled="!hasAnyLinked">Далее</a-button></router-link>
      </a-space>
    </a-card>
  </a-space>
</template>

<style scoped>
.panel { background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; padding: 12px; }
.panel-title { font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; }
.objects { display: flex; flex-direction: column; gap: 8px; }
.object { border: 1px dashed #e5e7eb; padding: 8px; border-radius: 6px; min-height: 44px; }
.object-title { font-weight: 500; margin-bottom: 6px; }
.object-dnd { display: flex; gap: 6px; flex-wrap: wrap; min-height: 28px; }
.locks { display: flex; flex-direction: column; gap: 8px; min-height: 44px; }
.lock-row { cursor: grab; display: flex; align-items: center; justify-content: space-between; border: 1px solid #f0f0f0; border-radius: 8px; padding: 8px 12px; }
.lock-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 12px; }
.lock-chip { display: inline-flex; align-items: center; height: 28px; }
.lock-chip-text { line-height: 1; display: inline-block; }
</style>
