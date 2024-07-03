<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="bread-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: router.options.history.state.back }"
        >前页</el-breadcrumb-item
      >
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
