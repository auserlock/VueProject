import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const addCart = () => {
      // 添加购物车
    }
    return { cartList, addCart }
  },
  {
    persist: true
  }
)
