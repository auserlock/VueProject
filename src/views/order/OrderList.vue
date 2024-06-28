<script setup>
import { businessGetListService } from '@/api/business'
import { useBusinessStore } from '@/stores'
import { onMounted } from 'vue'
const useStore = useBusinessStore()

import BusinessBanner from './component/BusinessBanner.vue'

onMounted(async () => {
  if (useStore.BusinessInfo.length == 0) {
    try {
      const res = await businessGetListService()
      res.data.data.forEach((item) => {
        useStore.setBusiness(item)
      })
    } catch (error) {
      console.error('Failed to fetch business list:', error)
    }
  }
})
</script>

<template>
  <BusinessBanner />
</template>

<style scoped></style>
