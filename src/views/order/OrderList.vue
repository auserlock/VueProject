<script setup>
import { businessGetByTypeService } from '@/api/business'
import { getUserInfoService } from '@/api/userInfo'
import { getAddressListService } from '@/api/address'
import { ordersGetService } from '@/api/orders'
import { useBusinessStore, useUserStore, useOrderStore } from '@/stores'
import { onMounted } from 'vue'
// import { getUserInfoService } from '@/api/userInfo'
const businessStore = useBusinessStore()
const userStore = useUserStore()
const orderStore = useOrderStore()

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
      } catch (error) {
        console.error('Failed to fetch business list:', error)
      }
    }
  }
  try {
    const res = await getAddressListService()
    userStore.setAddressList(res.data.data)
  } catch (error) {
    console.error('Failed to fetch address list:', error)
  }
  try {
    const res = await ordersGetService()
    orderStore.setOrders(res.data.data)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
  try {
    const res = await getUserInfoService()
    userStore.userInfo = res.data.data
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
})
</script>

<template>
  <BusinessCategory />
  <BusinessBanner />
</template>

<style scoped></style>
