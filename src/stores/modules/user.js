import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const id = ref('')
    const password = ref('')
    const userInfo = ref({
      userId: 1234532,
      userName: 'asdd',
      userSex: '男'
    })
    const userAddr = ref({})
    const remStatus = ref(false)
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const setId = (newId) => {
      id.value = newId
    }
    const removeId = () => {
      id.value = ''
    }
    const setPassword = (newPassword) => {
      password.value = newPassword
    }
    const removePassword = () => {
      password.value = ''
    }
    return {
      id,
      token,
      password,
      remStatus,
      userAddr,
      userInfo,
      setId,
      removeId,
      setToken,
      removeToken,
      setPassword,
      removePassword
    }
  },
  {
    persist: true
  }
)
