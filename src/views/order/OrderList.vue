<script setup>
import { businessGetByTypeService } from '@/api/business'
import { useBusinessStore } from '@/stores'
import { onMounted } from 'vue'
// import { getUserInfoService } from '@/api/userInfo'
const businessStore = useBusinessStore()
// const userInfoStore = useUserInfoStore()

import BusinessCategory from './component/BusinessCategory.vue'
import BusinessBanner from './component/BusinessBanner.vue'

onMounted(async () => {
  if (businessStore.hasFetched == false) {
    for (let i = 1; i <= 10; i++) {
      try {
        const res = await businessGetByTypeService(i)
        res.data.data.forEach((item) => {
          businessStore.setBusiness(i, item)
        })
        businessStore.setHasFetched()
        // const userInfo = await getUserInfoService()
        // userInfoStore.userInfo = userInfo.data.data
      } catch (error) {
        console.error('Failed to fetch business list:', error)
      }
    }
  }
})
</script>

<template>
  <BusinessCategory />
  <BusinessBanner />
</template>

<style scoped></style>
