import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useBusinessStore = defineStore(
  'business',
  () => {
    const BusinessInfo = ref([])
    const setBusiness = (newBusiness) => {
      BusinessInfo.value.push(newBusiness)
    }
    const removeBusiness = (businessId) => {
      BusinessInfo.value = BusinessInfo.value.filter(
        (business) => business.businessId !== businessId
      )
    }
    return {
      BusinessInfo,
      setBusiness,
      removeBusiness
    }
  },
  {
    persist: true
  }
)
