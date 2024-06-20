<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('asd')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
