<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'

const registerData = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = () => {
  console.log(registerData.value)
  window.alert(registerData.value)
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <BaseInput
      type="text"
      label="이메일"
      inputId="email"
      :value="registerData.email"
      @update="(value) => (registerData.email = value)"
    />
    <BaseInput
      type="password"
      label="비밀번호"
      inputId="password"
      :value="registerData.password"
      @update="(value) => (registerData.password = value)"
    />
    <BaseInput
      type="password"
      label="비밀번호 확인"
      inputId="confirmPassword"
      :value="registerData.confirmPassword"
      @update="(value) => (registerData.confirmPassword = value)"
    />
  </form>
</template>
