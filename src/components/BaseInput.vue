<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-4">
      <label :for="inputId">{{ label }}</label>
      <input
        :type="type"
        class="p-2 border border-gray-300 rounded-md"
        :id="inputId"
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
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

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update', value)
}
</script>

<style scoped></style>
