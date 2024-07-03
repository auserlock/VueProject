import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref({})
    const addOrUpdateMerchant = (merchantId, products) => {
      if (!cartList.value[merchantId]) {
        // 如果商户不存在，添加新的商户
        cartList.value[merchantId] = products
      } else {
        // 如果商户已存在，更新其产品
        for (const productId in products) {
          if (Object.prototype.hasOwnProperty.call(products, productId)) {
            cartList.value[merchantId][productId] = products[productId]
          }
        }
      }
    }
    const removeAll = () => {
      cartList.value = {}
    }
    return {
      cartList,
      addOrUpdateMerchant,
      removeAll
    }
  },
  {
    persist: true
  }
)
