<script setup lang="ts">
import { ref } from "vue";
import { QCard, QForm, QInput, QBtn, QSpinner } from "quasar";
import { PhLock } from "@phosphor-icons/vue";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const hasError = ref(false);
const showPassword = ref(false);

const emailRules = [
  (val: string) => !!val || "E-mail é obrigatório",
  (val: string) => /.+@.+\..+/.test(val) || "Digite um e-mail válido",
];

const passwordRules = [
  (val: string) => !!val || "Senha é obrigatória",
  (val: string) => val.length >= 6 || "Senha deve ter no mínimo 6 caracteres",
];

const handleLogin = async () => {
  errorMessage.value = "";
  hasError.value = false;
  loading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      console.log("Login bem-sucedido!", { email: email.value });
      errorMessage.value = "";
      hasError.value = false;
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = "E-mail ou senha incorretos. Tente novamente.";
    hasError.value = true;
  } finally {
    loading.value = false;
  }
};

const handleForgotPassword = () => {
  console.log("Redirecionar para recuperação de senha");
};
</script>
<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-white px-4 py-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">Cêdo</h1>
        <p class="text-sm text-gray-500 font-light">Sistema de Gestão</p>
      </div>

      <QCard flat bordered class="rounded-lg border-gray-200">
        <div class="p-6 sm:p-8">
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-1">Entrar</h2>
            <p class="text-sm text-gray-500">Acesse sua conta para continuar</p>
          </div>

          <QForm @submit="handleLogin" class="space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <QInput
                id="email"
                v-model="email"
                type="email"
                outlined
                placeholder="seu@email.com"
                :rules="emailRules"
                :error="hasError"
                dense
                class="custom-input"
                bg-color="white"
                color="gray-9"
              >
                <template v-slot:prepend>
                  <PhEnvelope class="text-gray-500" />
                </template>
              </QInput>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <QInput
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                outlined
                placeholder="••••••••"
                :rules="passwordRules"
                :error="hasError"
                dense
                class="custom-input"
                bg-color="white"
                color="gray-9"
              >
                <template v-slot:prepend>
                  <PhLock class="text-gray-500" />
                </template>
                <template v-slot:append>
                  <PhEye
                    v-if="showPassword"
                    class="cursor-pointer text-gray-500 hover:text-gray-700"
                    @click="showPassword = !showPassword"
                  />
                  <PhEyeClosed v-else @click="showPassword = !showPassword" />
                </template>
              </QInput>
            </div>

            <div v-if="errorMessage" class="px-3 py-2 bg-gray-50 rounded border border-gray-200">
              <p class="text-sm text-gray-700 flex items-center gap-2">
                <QIcon name="error_outline" size="18px" class="text-gray-600" />
                {{ errorMessage }}
              </p>
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="handleForgotPassword"
                class="text-sm text-gray-600 hover:text-gray-900 transition-colors underline-offset-2 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <QBtn
              type="submit"
              :loading="loading"
              :disable="loading"
              class="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded"
              label="Entrar"
            >
              <template v-slot:loading>
                <QSpinner color="white" size="20px" />
              </template>
            </QBtn>
          </QForm>
        </div>
      </QCard>

      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500">© 2026 Cedô • Gestão de Doceria</p>
      </div>
    </div>
  </div>
</template>
