<script setup>
import { useOrderStore } from '@/stores'
import { useUserStore } from '@/stores'
const orderStore = useOrderStore()
const useStore = useUserStore()

const getAddr = (daId) => {
  return useStore.userAddr.find((addr) => addr.daId === daId)
}
</script>

<template>
  <div class="body">
    <ul class="goods-list">
      <li v-for="order in orderStore.orders" :key="order.orderId">
        <div class="goods-item">
          <div class="text">
            <p class="name ellipsis">总价格：{{ order.orderTotal }}</p>
            <p class="desc ellipsis">下单时间：{{ order.orderDate }}</p>
            <p class="price ellipsis">
              订单状态：
              {{ order.orderState === 0 ? '未支付' : '已支付' }}
            </p>
            <p class="addr ellipsis">地址：{{ getAddr(order.daId).address }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.body {
  .goods-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      display: block;
      margin: 0px 30%;
    }
  }
}
.goods-item {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  width: 600px;
  height: 120px;
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
      top: 20px;
      left: -80px;
    }

    .desc {
      // color: #999;
      text-align: left;
      height: 29px;
      position: relative;
      top: 0px;
      left: -13px;
    }

    .price {
      text-align: left;
      font-size: 14px;
      color: #999;
      position: relative;
      top: -10px;
      left: -15px;
    }

    .addr {
      text-align: left;
      font-size: 14px;
      color: #999;
      position: relative;
      top: -30px;
      left: -15px;
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
