<script setup></script>

<template>
  <div class="home-banner">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1270px;
  height: 600px;
  position: absolute;
  left: 23%;
  top: 17.8%;
  z-index: 98;

  img {
    width: 100%;
    height: 600px;
  }
}
</style>
