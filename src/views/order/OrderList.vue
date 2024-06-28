<script setup>
import { businessGetListService } from '@/api/business'
import { useBusinessStore } from '@/stores'
import { onMounted } from 'vue'
const useStore = useBusinessStore()

onMounted(async () => {
  try {
    const res = await businessGetListService()
    res.data.data.forEach((item) => {
      useStore.setBusiness(item)
    })
  } catch (error) {
    console.error('Failed to fetch business list:', error)
  }
})
const fn = () => {}
</script>

<template>
  <el-button @click="fn">获取商家列表</el-button>
</template>

<style scoped></style>
