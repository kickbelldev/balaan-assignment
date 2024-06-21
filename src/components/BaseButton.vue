<template>
  <button
    :type="type"
    class="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type: 'button' | 'submit' | 'reset'
  label: string
}>()

const emit = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped></style>
