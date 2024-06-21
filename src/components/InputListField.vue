<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import BaseInput from './BaseInput.vue'

defineProps<{
  type: InputTypeHTMLAttribute
  label: string
  inputId: string
  valueList: string[]
  error?: string
  size?: number
}>()

const emit = defineEmits<{
  (event: 'update', index: number, value: string): void
}>()

const handleInput = (index: number, value: string) => {
  emit('update', index, value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-4">
      <label :for="inputId">{{ label }}</label>
    </div>
    <div class="flex gap-4 w-full">
      <BaseInput
        v-for="(value, index) in valueList"
        :key="`${inputId}-${index}`"
        :type="type"
        :size="size"
        :inputId="inputId"
        :value="value"
        @update="handleInput(index, $event)"
      />
    </div>
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<style scoped></style>
