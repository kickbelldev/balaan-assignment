<script setup lang="ts">
import BaseInput from './BaseInput.vue'

defineProps<{
  type: HTMLInputElement['type']
  label: string
  inputId: string
  value: string
  placeholder?: string
  error?: string
}>()

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

const handleInput = (value: string) => {
  emit('update', value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-4">
      <label :for="inputId">{{ label }}</label>
      <BaseInput
        :type="type"
        :inputId="inputId"
        :value="value"
        @update="handleInput"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<style scoped></style>
