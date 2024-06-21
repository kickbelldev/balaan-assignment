<script setup lang="ts">
import { ref } from 'vue'
import { useFunnel } from '@/composable/useFunnel'
import StepOne from './StepOne.vue'
import { RegisterData } from '@/types'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'
import StepComplete from './StepComplete.vue'

const { Step, Funnel, setStep } = useFunnel<
  'step1' | 'step2' | 'step3' | 'complete'
>('step1')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}/
const koreanRegex = /^[가-힣]{2,}$/
const englishRegex = /^[A-Za-z]{3,}$/
const phoneNumberRegex = /^0\d{2}([-|\s]?)\d{3,4}\1\d{4}$/
const registerData = ref<RegisterData>({
  email: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '이메일을 입력해주세요.'
      }
      if (!emailRegex.test(value)) {
        return '올바른 이메일 형식이 아닙니다.'
      }
    },
  },
  password: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '비밀번호를 입력해주세요.'
      }
      if (!passwordRegex.test(value)) {
        return '비밀번호는 8자 이상으로 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
      }
    },
  },
  confirmPassword: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '비밀번호 확인을 입력해주세요.'
      }
      if (!passwordRegex.test(value)) {
        return '비밀번호는 8자 이상으로 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
      }
      if (value !== registerData.value.password.value) {
        return '비밀번호가 일치하지 않습니다.'
      }
    },
  },
  name: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '이름을 입력해주세요.'
      }
      if (value.length < 2 || !koreanRegex.test(value)) {
        if (value.length < 3 || !englishRegex.test(value)) {
          return '이름은 2글자 이상의 한글 완성형 또는 3글자 이상의 영문 알파벳이어야 합니다. 특수문자, 숫자, 공백은 사용할 수 없습니다.'
        }
      }
    },
  },
  contact: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '연락처를 입력해주세요.'
      }
      if (!phoneNumberRegex.test(value)) {
        return '올바른 연락처 형식이 아닙니다.'
      }
    },
  },
  address: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '주소를 입력해주세요.'
      }
    },
  },
  detailAddress: {
    value: '',
    error: undefined,
    validate() {
      const { value } = this
      if (!value) {
        return '상세 주소를 입력해주세요.'
      }
    },
  },
  cardNumber: {
    valueList: ['', '', '', ''],
    error: undefined,
    validate() {
      const { valueList } = this
      if (!valueList || !valueList.every((value) => value)) {
        return '카드 번호를 입력해주세요.'
      }
      const cardNumber = valueList.join('')
      if (
        valueList.some((value) => value.length !== 4) ||
        !/^\d{16}$/.test(cardNumber)
      ) {
        return '카드 번호는 16자리 숫자여야 합니다.'
      }

      const digits = cardNumber.split('').map(Number)
      let sum = 0

      for (let i = 0; i < digits.length; i++) {
        if ((i + 1) % 2 === 0) {
          const doubled = digits[i] * 2
          sum += doubled > 9 ? (doubled % 10) + 1 : doubled
        } else {
          sum += digits[i]
        }
      }

      if (sum % 10 !== 0) {
        return '유효하지 않은 카드 번호입니다.'
      }
    },
  },
})
</script>

<template>
  <Funnel>
    <Step name="step1">
      <StepOne :registerData="registerData" @next="setStep('step2')" />
    </Step>
    <Step name="step2">
      <StepTwo
        :registerData="registerData"
        @prev="setStep('step1')"
        @next="setStep('step3')"
      />
    </Step>
    <Step name="step3">
      <StepThree
        :registerData="registerData"
        @prev="setStep('step2')"
        @next="setStep('complete')"
      />
    </Step>
    <Step name="complete">
      <StepComplete :registerData="registerData" />
    </Step>
  </Funnel>
</template>
