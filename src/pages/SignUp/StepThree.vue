<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import InputListField from '@/components/InputListField.vue'
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
  return validateField('cardNumber')
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
    <InputListField
      type="text"
      label="카드번호"
      inputId="card-number"
      :valueList="registerData.cardNumber.valueList || []"
      @update="(index: number, value: string) => { if (registerData.cardNumber.valueList) registerData.cardNumber.valueList[index] = value }"
      :error="registerData.cardNumber.error"
      :size="4"
    />
    <div class="flex gap-4">
      <BaseButton type="submit">
        <span>다음</span>
      </BaseButton>
    </div>
  </form>
</template>
