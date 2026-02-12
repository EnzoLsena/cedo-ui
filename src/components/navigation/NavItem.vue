<script setup lang="ts">
import { computed, type Component } from 'vue';

type IconWeight =
  | 'thin'
  | 'light'
  | 'regular'
  | 'bold'
  | 'fill'
  | 'duotone';

interface Props {
  label: string;
  icon: Component;
  active?: boolean;
  mobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  mobile: false,
});

const iconWeight = computed<IconWeight>(() =>
  props.active ? 'fill' : 'regular',
);

const iconSize = computed(() => (props.mobile ? 22 : 20));
</script>

<template>
  <span
    class="inline-flex items-center"
    :class="mobile ? 'flex-col justify-center gap-1' : 'gap-3'"
  >
    <component :is="icon" :size="iconSize" :weight="iconWeight" />
    <span>{{ label }}</span>
  </span>
</template>
