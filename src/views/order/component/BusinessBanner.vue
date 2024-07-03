<script setup></script>

<template>
  <div class="home-banner">
    <el-carousel height="600px">
      <el-carousel-item>
        <img src="@/assets/1.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/2.png" alt="" />
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
  top: 21.1%;
  z-index: 98;

  img {
    width: 100%;
    height: 600px;
  }
}
</style>
