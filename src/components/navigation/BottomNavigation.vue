<script setup lang="ts">
import type { Component } from 'vue';
import { QFooter, QTabs, QTab } from 'quasar';
import NavItem from './NavItem.vue';

export interface NavigationModule {
  key: string;
  label: string;
  icon: Component;
}

interface Props {
  modelValue: string;
  modules: NavigationModule[];
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <QFooter class="border-t border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
    <QTabs
      :model-value="modelValue"
      dense
      indicator-color="transparent"
      active-color="primary"
      class="mx-auto w-full max-w-lg"
      @update:model-value="(value) => emit('update:modelValue', value)"
    >
      <QTab
        v-for="module in modules"
        :key="module.key"
        :name="module.key"
        no-caps
        class="min-h-16 flex-1 px-1 transition-all duration-200"
        content-class="w-full"
      >
        <div
          class="flex w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-xs font-medium transition-all duration-200"
          :class="
            modelValue === module.key
              ? 'bg-primary/10 text-primary'
              : 'text-slate-500'
          "
        >
          <NavItem
            :icon="module.icon"
            :label="module.label"
            :active="modelValue === module.key"
            mobile
          />
        </div>
      </QTab>
    </QTabs>
  </QFooter>
</template>
