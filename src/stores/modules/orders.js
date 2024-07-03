import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useOrderStore = defineStore(
  'orders',
  () => {
    const orders = ref({})
    const setOrders = (data) => {
      orders.value = data
    }
    const removeOrders = () => {
      orders.value = {}
    }
    return {
      orders,
      setOrders,
      removeOrders
    }
  },
  {
    persist: true
  }
)
