<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useFunnel } from '@/composable/useFunnel'

const { Step, Funnel, setStep } = useFunnel<'step1' | 'step2' | 'step3'>(
  'step1'
)

const registerData = ref<{
  [key: string]: {
    value: string
    error?: string
    validate: (value: string) => string | undefined
  }
}>({
  email: {
    value: '',
    error: undefined,
    validate: (value: string) => {
      if (!value) {
        return '이메일을 입력해주세요.'
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return '올바른 이메일 형식이 아닙니다.'
      }
    },
  },
  password: {
    value: '',
    error: undefined,
    validate: (value: string) => {
      if (!value) {
        return '비밀번호를 입력해주세요.'
      }
      if (!/[A-Za-z0-9!@#$%^&*()_+]{8}/.test(value)) {
        return '비밀번호는 8자 이상으로 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.'
      }
    },
  },
  confirmPassword: {
    value: '',
    error: undefined,
    validate: (value: string) => {
      if (!value) {
        return '비밀번호 확인을 입력해주세요.'
      }
      if (value !== registerData.value.password.value) {
        return '비밀번호가 일치하지 않습니다.'
      }
    },
  },
})

const validateStepOne = () => {
  registerData.value.email.error = registerData.value.email.validate(
    registerData.value.email.value
  )
  return !registerData.value.email.error
}
const handleStepOne = () => {
  if (!validateStepOne()) {
    return
  }
  setStep('step2')
}

const validateStepTwo = () => {
  registerData.value.password.error = registerData.value.password.validate(
    registerData.value.password.value
  )
  registerData.value.confirmPassword.error =
    registerData.value.confirmPassword.validate(
      registerData.value.confirmPassword.value
    )
  return (
    !registerData.value.password.error &&
    !registerData.value.confirmPassword.error
  )
}

const handleStepTwo = () => {
  console.log('asd')
  if (!validateStepTwo()) {
    return
  }
  setStep('step3')
}
</script>

<template>
  <Funnel>
    <Step name="step1">
      <form
        class="flex flex-col gap-4"
        id="step1"
        :key="'step1'"
        @submit.prevent="handleStepOne"
      >
        <BaseInput
          type="text"
          label="이메일"
          inputId="email"
          :value="registerData.email.value"
          @update="(value) => (registerData.email.value = value)"
          :error="registerData.email.error"
        />
        <div class="flex gap-4">
          <BaseButton type="submit" form="step1">
            <span>다음</span>
          </BaseButton>
        </div>
      </form>
    </Step>
    <Step name="step2">
      <form
        class="flex flex-col gap-4"
        id="step2"
        :key="'step2'"
        @submit.prevent="handleStepTwo"
      >
        <BaseInput
          type="password"
          label="비밀번호"
          inputId="password"
          :value="registerData.password.value"
          @update="(value) => (registerData.password.value = value)"
          :error="registerData.password.error"
        />
        <BaseInput
          type="password"
          label="비밀번호 확인"
          inputId="confirmPassword"
          :value="registerData.confirmPassword.value"
          @update="(value) => (registerData.confirmPassword.value = value)"
          :error="registerData.confirmPassword.error"
        />
        <div class="flex gap-4">
          <BaseButton type="button" @click="setStep('step1')">
            <span>이전</span>
          </BaseButton>
          <BaseButton type="submit" form="step2">
            <span>회원가입</span>
          </BaseButton>
        </div>
      </form>
    </Step>
  </Funnel>
</template>
