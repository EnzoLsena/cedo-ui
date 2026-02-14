<script setup lang="ts">
import { reactive, ref } from "vue";
import { QCard, QForm, QInput, QBtn, QSpinner } from "quasar";
import { PhEnvelope, PhLock, PhEye, PhEyeClosed, PhWarning, PhCookie } from "@phosphor-icons/vue";

import authService from "@/services/auth-service";
import { useRouter } from "vue-router";
const router = useRouter();
const payload = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);

const emailRules = [
  (value: string) => !!value || "E-mail é obrigatório",
  (value: string) => /.+@.+\..+/.test(value) || "Digite um e-mail válido",
];

const passwordRules = [
  (value: string) => !!value || "Senha é obrigatória",
  (value: string) => value.length >= 6 || "Senha deve ter no mínimo 6 caracteres",
];

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    await authService.login(payload);
    router.push({ path: "/" });
  } catch {
    errorMessage.value = "E-mail ou senha incorretos. Tente novamente.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="relative min-h-screen w-full overflow-hidden bg-[#FFEBD6] px-4 py-8 sm:px-6"
  >
    <div
      class="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#782736]/10 blur-3xl"
    />
    <div
      class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[#FFEBD6]/35 blur-3xl"
    />

    <div
      class="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center"
    >
      <QCard
        flat
        bordered
        class="w-full overflow-hidden rounded-3xl bg-white/85 shadow-xl backdrop-blur-lg"
      >
        <div class="grid min-h-140 lg:grid-cols-[1.1fr_1fr]">
          <section
            class="hidden bg-[#782736] p-10 text-white lg:flex lg:flex-col lg:justify-between"
          >
            <div>
              <div
                class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"
              >
                <PhCookie :size="30" color="#F5EBD9" />
              </div>

              <h1 class="text-4xl font-semibold leading-tight">
                Simples e rápido para o seu dia a dia.
              </h1>
              <p class="mt-6 max-w-sm text-sm leading-6 text-white/75">
                Entre para acompanhar seus fluxos com uma experiência moderna e objetiva.
              </p>
            </div>

            <p class="text-xs text-white/55">© 2026 Cêdo • powered by BeeSync</p>
          </section>

          <section class="flex items-center p-6 sm:p-10 lg:p-12">
            <div class="mx-auto w-full max-w-md">
              <div class="mb-8 lg:hidden">
                <div class="mb-4 flex items-center justify-center">
                  <PhCookie :size="64" color="#782736" />
                </div>

                <h1 class="text-center text-3xl font-semibold text-[#782736]">Cêdo</h1>
              </div>

              <div class="mb-7">
                <h2 class="text-2xl font-semibold text-slate-900">Bem-vindo de volta</h2>
                <p class="mt-2 text-sm text-slate-500">
                  Use suas credenciais para acessar sua conta.
                </p>
              </div>

              <QForm @submit="handleLogin" class="space-y-5">
                <QInput
                  color="dark"
                  v-model="payload.email"
                  type="email"
                  label="E-mail"
                  outlined
                  dense
                  :rules="emailRules"
                  
                >
                  <template #prepend>
                    <PhEnvelope :size="20" class="text-slate-500" />
                  </template>
                </QInput>

                <QInput
                  color="dark"
                  v-model="payload.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Senha"
                  outlined
                  dense
                  :rules="passwordRules"
                  class="rounded-xl"
                >
                  <template #prepend>
                    <PhLock :size="20" class="text-slate-500" />
                  </template>
                  <template #append>
                    <PhEye
                      v-if="showPassword"
                      :size="20"
                      class="cursor-pointer text-slate-500 transition hover:text-slate-900"
                      @click="showPassword = false"
                    />
                    <PhEyeClosed
                      v-else
                      :size="20"
                      class="cursor-pointer text-slate-500 transition hover:text-slate-900"
                      @click="showPassword = true"
                    />
                  </template>
                </QInput>

                <div
                  v-if="errorMessage"
                  class="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  <PhWarning :size="18" />
                  {{ errorMessage }}
                </div>

                <QBtn
                  type="submit"
                  :loading="loading"
                  :disable="loading"
                  unelevated
                  no-caps
                  class="w-full rounded-xl py-2 text-white transition"
                  style="background-color: #782736"
                  label="Entrar"
                >
                  <template #loading>
                    <QSpinner size="20px" />
                  </template>
                </QBtn>
              </QForm>

              <p class="mt-8 text-center text-xs text-slate-400 lg:hidden">
                © 2026 Cêdo • powered by BeeSync
              </p>
            </div>
          </section>
        </div>
      </QCard>
    </div>
  </div>
</template>
