<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar, QLayout, QPageContainer, QPage } from 'quasar';
import {
  PhArchiveBox,
  PhCube,
  PhUsersThree,
  PhShoppingCart,
} from '@phosphor-icons/vue';
import BottomNavigation, {
  type NavigationModule,
} from '@/components/navigation/BottomNavigation.vue';
import Sidebar from '@/components/navigation/Sidebar.vue';

const $q = useQuasar();
const isDesktop = computed(() => $q.screen.gt.sm);

const activeModule = ref('estoque');
const isSidebarCollapsed = ref(false);

const modules: NavigationModule[] = [
  { key: 'estoque', label: 'Estoque', icon: PhArchiveBox },
  { key: 'produtos', label: 'Produtos', icon: PhCube },
  { key: 'clientes', label: 'Clientes', icon: PhUsersThree },
  { key: 'pedidos', label: 'Pedidos', icon: PhShoppingCart },
];

const activeModuleLabel = computed(
  () => modules.find((module) => module.key === activeModule.value)?.label,
);
</script>

<template>
  <QLayout view="lHh Lpr lFf" class="bg-slate-50">
    <Sidebar
      v-if="isDesktop"
      v-model="activeModule"
      v-model:collapsed="isSidebarCollapsed"
      :modules="modules"
    />

    <QPageContainer>
      <QPage
        class="flex min-h-screen items-center justify-center px-4 pb-24 pt-8 transition-all duration-200 sm:px-6 md:px-10"
        :class="isDesktop ? 'pb-8' : ''"
      >
        <section
          class="w-full max-w-2xl rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
            Visão geral
          </p>
          <h1 class="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Home
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Você está no módulo
            <span class="font-semibold text-slate-900">{{ activeModuleLabel }}</span
            >. Estruture aqui cards, gráficos e alertas importantes para a operação
            diária.
          </p>
        </section>
      </QPage>
    </QPageContainer>

    <BottomNavigation
      v-if="!isDesktop"
      v-model="activeModule"
      :modules="modules"
    />
  </QLayout>
</template>
