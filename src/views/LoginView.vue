<script setup lang="ts">
import { ref } from "vue";
import { QCard, QForm, QInput, QBtn, QSpinner } from "quasar";
import { PhEnvelope, PhLock, PhEye, PhEyeClosed, PhWarning, PhCookie } from "@phosphor-icons/vue";

const email = ref("");
const password = ref("");
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (Math.random() < 0.5) throw new Error();
  } catch {
    errorMessage.value = "E-mail ou senha incorretos. Tente novamente.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen w-full bg-[#F1E8DC] flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div class="flex items-center justify-center">
          <PhCookie :size="90" color="#081534" />
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#081534]">Cêdo</h1>
      </div>

      <QCard flat bordered class="rounded-2xl shadow-lg bg-white/95 backdrop-blur">
        <div class="p-6 sm:p-8">
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Login</h2>
            <p class="text-sm text-gray-500">Acesse sua conta</p>
          </div>

          <QForm @submit="handleLogin" class="space-y-5">
            <QInput color="black" v-model="email" type="email" label="E-mail" outlined dense :rules="emailRules">
              <template #prepend>
                <PhEnvelope :size="20" />
              </template>
            </QInput>

            <QInput
              color="black"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              outlined
              dense
              :rules="passwordRules"
            >
              <template #prepend>
                <PhLock :size="20" />
              </template>
              <template #append>
                <PhEye
                  v-if="showPassword"
                  :size="20"
                  class="cursor-pointer opacity-60 hover:opacity-100"
                  @click="showPassword = false"
                />
                <PhEyeClosed
                  v-else
                  :size="20"
                  class="cursor-pointer opacity-60 hover:opacity-100"
                  @click="showPassword = true"
                />
              </template>
            </QInput>

            <div
              v-if="errorMessage"
              class="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
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
              class="w-full rounded-xl text-white transition"
              style="background-color: #081534"
              label="Entrar"
            >
              <template #loading>
                <QSpinner size="20px" />
              </template>
            </QBtn>
          </QForm>
        </div>
      </QCard>

      <div class="mt-6 text-center">
        <p class="text-xs text-[#081534]">© 2026 Cêdo • powered by BeeSync</p>
      </div>
    </div>
  </div>
</template>
