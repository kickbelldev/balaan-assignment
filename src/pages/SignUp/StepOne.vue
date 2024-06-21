<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import InputField from '@/components/InputField.vue'
import { RegisterData } from '@/types'

const props = defineProps<{
  registerData: RegisterData
}>()

const emit = defineEmits<{
  (event: 'next'): void
}>()

const validateField = (field: keyof RegisterData) => {
  const fieldData = props.registerData[field]
  fieldData.error = fieldData.validate()
  return !fieldData.error
}

const validate = () => {
  const isEmailValid = validateField('email')
  const isPasswordValid = validateField('password')
  const isConfirmPasswordValid = validateField('confirmPassword')
  return isEmailValid && isPasswordValid && isConfirmPasswordValid
}

const handleSubmit = () => {
  if (!validate()) {
    return
  }
  emit('next')
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <InputField
      type="text"
      label="이메일"
      inputId="email"
      :value="registerData.email.value || ''"
      @update="(value) => (registerData.email.value = value)"
      :error="registerData.email.error"
    />
    <InputField
      type="password"
      label="비밀번호"
      inputId="password"
      :value="registerData.password.value || ''"
      @update="(value) => (registerData.password.value = value)"
      :error="registerData.password.error"
    />
    <InputField
      type="password"
      label="비밀번호 확인"
      inputId="confirmPassword"
      :value="registerData.confirmPassword.value || ''"
      @update="(value) => (registerData.confirmPassword.value = value)"
      :error="registerData.confirmPassword.error"
    />
    <div class="flex gap-4">
      <BaseButton type="submit">
        <span>다음</span>
      </BaseButton>
    </div>
  </form>
</template>
