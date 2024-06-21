<script setup lang="ts">
import { RegisterData } from '@/types'

defineProps<{
  registerData: RegisterData
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-12 gap-8">
    <h1 class="text-3xl font-bold text-center leading-relaxed">
      "{{ registerData.name.value }}"님<br />회원가입이<br />완료되었습니다.
    </h1>
    <div class="flex flex-col gap-4">
      <p class="text-lg">
        <strong>이메일:</strong> {{ registerData.email.value }}
      </p>
      <p class="text-lg">
        <strong>연락처:</strong> {{ registerData.contact.value }}
      </p>
      <p class="text-lg">
        <strong>주소:</strong> {{ registerData.address.value }}
        <br />
        {{
          registerData.detailAddress.value
            ? `, ${registerData.detailAddress.value}`
            : ''
        }}
      </p>
    </div>
  </div>
</template>
