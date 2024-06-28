import { defineStore } from 'pinia'
import { ref } from 'vue'
// 商户列表
export const useBusinessTypeStore = defineStore(
  'type',
  () => {
    const BusinessTypeInfo = ref([
      '美食餐点',
      '早餐铺子',
      '跑腿代购',
      '汉堡披萨',
      '甜品饮品',
      '速食简餐',
      '地方小吃',
      '米粉面馆',
      '包子粥铺',
      '炸鸡炸串'
    ])
    return {
      BusinessTypeInfo
    }
  },
  {
    persist: true
  }
)
