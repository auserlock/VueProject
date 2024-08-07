import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const id = ref('')
    const password = ref('')
    const userInfo = ref({})
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
    const setAddressList = (newAddr) => {
      userAddr.value = newAddr
    }
    const removeAddressList = () => {
      userAddr.value = {}
    }
    const removeUserInfo = () => {
      userInfo.value = {}
    }

    const removeAll = () => {
      removeUserInfo()
      removeAddressList()
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
      removePassword,
      setAddressList,
      removeAll
    }
  },
  {
    persist: true
  }
)
