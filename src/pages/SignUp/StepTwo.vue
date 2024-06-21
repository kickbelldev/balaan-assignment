<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import InputField from '@/components/InputField.vue'
import AddressInput from '@/components/AddressInput.vue'
import { RegisterData } from '@/types'
import ButtonContainer from '@/components/ButtonContainer.vue'

const props = defineProps<{
  registerData: RegisterData
}>()

const emit = defineEmits<{
  (event: 'prev'): void
  (event: 'next'): void
}>()

const validateField = (field: keyof RegisterData) => {
  const fieldData = props.registerData[field]
  fieldData.error = fieldData.validate()
  return !fieldData.error
}

const validate = () => {
  const isNameValid = validateField('name')
  const isContactValid = validateField('contact')
  const isAddressValid = validateField('address')
  return isNameValid && isContactValid && isAddressValid
}

const handlePrev = () => {
  emit('prev')
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
      label="이름"
      inputId="name"
      :value="registerData.name.value || ''"
      @update="(value) => (registerData.name.value = value)"
      :error="registerData.name.error"
    />
    <InputField
      type="text"
      label="연락처"
      inputId="contact"
      :value="registerData.contact.value || ''"
      @update="(value) => (registerData.contact.value = value)"
      :error="registerData.contact.error"
    />
    <AddressInput
      label="주소"
      :address="registerData.address.value || ''"
      :detail-address="registerData.detailAddress.value || ''"
      :address-error="registerData.address.error"
      :detail-address-error="registerData.detailAddress.error"
      @update="(value) => (registerData.address.value = value)"
    />
    <ButtonContainer>
      <BaseButton type="button" @click="handlePrev">
        <span>이전</span>
      </BaseButton>
      <BaseButton type="submit">
        <span>다음</span>
      </BaseButton>
    </ButtonContainer>
  </form>
</template>
