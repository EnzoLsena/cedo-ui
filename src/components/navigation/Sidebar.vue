<script setup lang="ts">
import type { Component } from 'vue';

defineOptions({
  name: 'HomeSidebar',
});
import {
  QDrawer,
  QList,
  QItem,
  QItemSection,
  QBtn,
  QSeparator,
  QTooltip,
} from 'quasar';
import { PhCaretDoubleLeft, PhCaretDoubleRight } from '@phosphor-icons/vue';
import NavItem from './NavItem.vue';

interface NavigationModule {
  key: string;
  label: string;
  icon: Component;
}

interface Props {
  modelValue: string;
  modules: NavigationModule[];
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:collapsed': [value: boolean];
}>();
</script>

<template>
  <QDrawer
    show-if-above
    :mini="collapsed"
    :width="248"
    :mini-width="84"
    bordered
    class="border-r border-slate-200/80 bg-white"
  >
    <div class="flex h-full flex-col px-3 py-4">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-3 overflow-hidden px-2">
          <div
            class="grid h-10 w-10 shrink-0 place-content-center rounded-xl bg-primary/10 text-primary shadow-sm"
          >
            CE
          </div>
          <Transition name="fade">
            <div v-if="!collapsed" class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-900">Cedo UI</p>
              <p class="truncate text-xs text-slate-500">Painel operacional</p>
            </div>
          </Transition>
        </div>

        <QBtn
          round
          flat
          dense
          color="grey-7"
          @click="emit('update:collapsed', !collapsed)"
        >
          <component :is="collapsed ? PhCaretDoubleRight : PhCaretDoubleLeft" :size="16" />
          <QTooltip> {{ collapsed ? 'Expandir menu' : 'Recolher menu' }} </QTooltip>
        </QBtn>
      </div>

      <QSeparator class="mb-4" />

      <QList padding class="space-y-1">
        <QItem
          v-for="module in modules"
          :key="module.key"
          clickable
          dense
          class="rounded-xl px-2 py-2 text-slate-600 transition-all duration-200"
          :class="
            modelValue === module.key
              ? 'bg-primary/10 font-semibold text-primary shadow-sm'
              : 'hover:bg-slate-100/80 hover:text-slate-900'
          "
          @click="emit('update:modelValue', module.key)"
        >
          <QItemSection>
            <NavItem
              :icon="module.icon"
              :label="collapsed ? '' : module.label"
              :active="modelValue === module.key"
            />
          </QItemSection>

          <QTooltip v-if="collapsed">{{ module.label }}</QTooltip>
        </QItem>
      </QList>
    </div>
  </QDrawer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
