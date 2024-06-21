<script setup lang="ts">
import { InputHTMLAttributes } from 'vue'

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  inputId: string
  value: string
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'update', value: string): void
}>()

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update', value)
}
</script>

<template>
  <input
    :type="type"
    class="p-2 border border-gray-300 rounded-md"
    :id="inputId"
    :value="value"
    :size="size"
    @input="handleInput"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
