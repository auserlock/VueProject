import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useBusinessStore = defineStore(
  'business',
  () => {
    const BusinessInfo = ref({})
    const hasFetched = ref(false)

    const setBusiness = (categoryId, newBusiness) => {
      if (!BusinessInfo.value[categoryId]) {
        BusinessInfo.value[categoryId] = []
      }
      BusinessInfo.value[categoryId].push(newBusiness)
    }

    const setHasFetched = () => {
      hasFetched.value = true
    }

    const removeBusiness = (categoryId, businessId) => {
      if (BusinessInfo.value[categoryId]) {
        BusinessInfo.value[categoryId] = BusinessInfo.value[categoryId].filter(
          (business) => business.businessId !== businessId
        )
      }
    }

    const removeAll = () => {
      BusinessInfo.value = {}
      hasFetched.value = false
    }

    return {
      BusinessInfo,
      hasFetched,
      setBusiness,
      setHasFetched,
      removeAll,
      removeBusiness
    }
  },
  {
    persist: true
  }
)
