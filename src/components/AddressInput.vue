<script setup lang="ts">
import { onMounted } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

declare global {
  interface Window {
    daum: any
  }
}

interface IAddr {
  address: string
  zonecode: string
}

defineProps<{
  label: string
  address: string
  detailAddress: string
  addressError?: string
  detailAddressError?: string
}>()

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

const handleSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data: IAddr) => {
      emit('update', data.address)
    },
  }).open()
}

onMounted(() => {})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-4">
      <label class="grow-[3.5]" :for="'address'">{{ label }}</label>
      <BaseButton type="button" @click="handleSearch">우편번호</BaseButton>
    </div>
    <BaseInput
      type="text"
      :inputId="'address'"
      :value="address"
      :disabled="true"
      @click="handleSearch"
    />
    <p v-if="addressError" class="text-red-500 text-xs">{{ addressError }}</p>
    <BaseInput
      type="text"
      :inputId="'detail-address'"
      :value="detailAddress"
      :disabled="!address"
    />
    <p v-if="detailAddressError" class="text-red-500 text-xs">
      {{ detailAddressError }}
    </p>
  </div>
</template>

<style scoped></style>
