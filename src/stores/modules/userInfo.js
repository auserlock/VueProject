import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref({})
    return { userInfo }
  },
  {
    persist: true
  }
)
