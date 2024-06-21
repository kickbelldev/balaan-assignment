<script setup lang="ts">
defineProps<{
  type: 'button' | 'submit' | 'reset'
  form?: string
}>()

const emit = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    role="button"
    :type="type"
    :form="form"
    class="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
