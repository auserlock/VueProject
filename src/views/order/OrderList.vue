<script setup>
import { businessGetByTypeService } from '@/api/business'
const fn = async () => {
  const res = await businessGetByTypeService(1)
  console.log(res.data.data)
}
</script>

<template>
  <el-button @click="fn">获取商家列表</el-button>
</template>

<style scoped></style>
