<script lang="ts" setup>
// import { useUserStore } from '@/stores'
// const userStore = useUserStore()
</script>

<template>
  <div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style scoped></style>
