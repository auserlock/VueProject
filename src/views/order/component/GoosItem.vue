<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})

import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)
</script>
<!-- <RouterLink :to="`/order/list/100${index}`">{{ item }}</RouterLink> -->
<template>
  <RouterLink
    :to="`/order/list/${route.params.id}/${goods.businessId}`"
    class="goods-item"
  >
    <div class="image-container">
      <img :src="goods.businessImg" alt="" />
    </div>
    <div class="text">
      <p class="name ellipsis">{{ goods.businessName }}</p>
      <p class="desc ellipsis">{{ goods.businessExplain }}</p>
      <p class="price ellipsis">
        起送￥{{ goods.starPrice }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;配送￥{{
          goods.deliveryPrice
        }}
      </p>
      <p class="addr ellipsis">地址：{{ goods.businessAddress }}</p>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.goods-item {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  width: 600px;
  height: 150px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;
  text-decoration: none;
  margin-bottom: 20px;

  .text {
    margin-left: 40px;

    color: black;
    p {
      padding-top: 10px;
    }

    .name {
      font-size: 20px;
      font-weight: bold;
      position: relative;
      top: 0px;
    }

    .desc {
      // color: #999;
      text-align: left;
      height: 29px;
      position: relative;
      top: -20px;
    }

    .price {
      text-align: left;
      font-size: 14px;
      color: #999;
      position: relative;
      top: -45px;
    }

    .addr {
      text-align: left;
      font-size: 14px;
      color: #999;
      position: relative;
      top: -60px;
    }
  }

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }
}
</style>
