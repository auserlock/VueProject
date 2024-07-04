<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ordersUpdateService } from '@/api/orders'
import { cartDeleteService } from '@/api/cart'
import { useOrderStore } from '@/stores'
import { onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const cartStore = useCartStore()

const updateOrder = async () => {}

let ids = route.query.id

onBeforeUnmount(async () => {
  console.log(ids)
  if (typeof ids === 'string') {
    ids = ids.split(',') // 将逗号分隔的字符串转换为数组
  } else if (!Array.isArray(ids)) {
    ids = [ids] // 将单个值转换为数组
  }
  try {
    for (let i = 0; i < ids.length; i++) {
      await ordersUpdateService(ids[i], 1)
    }
  } catch (error) {
    console.error('Failed to update order:', error)
  }
  orderStore.setOrders(
    orderStore.orders.map((order) => {
      for (let i = 0; i < ids.length; i++) {
        if (order.orderId == ids[i]) {
          order.orderState = 1
          break
        }
      }
      return order
    })
  )
  try {
    for (const key in cartStore.cartList) {
      if (Object.keys(cartStore.cartList[key]).length > 0) {
        for (const item in cartStore.cartList[key]) {
          await cartDeleteService(
            cartStore.cartList[key][item].foodId,
            cartStore.cartList[key][item].businessId
          )
        }
      }
    }
  } catch (error) {
    console.error('Failed to add address:', error)
  }
  cartStore.removeAll()
})
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <span class="iconfont icon-shanchu red"></span>
        <p class="tit">支付成功</p>
        <p class="tip">我们将尽快为您配送，请保持手机畅通</p>
        <p>支付方式：<span>支付宝</span></p>
        <p>
          支付金额：<span>¥{{ route.query.price }}</span>
        </p>
        <div class="btn">
          <el-button
            type="primary"
            style="margin-right: 20px"
            @click="
              () => {
                updateOrder()
                router.push('/order/manage')
              }
            "
            >查看订单</el-button
          >
          <el-button
            @click="
              () => {
                updateOrder()
                router.push('/order/list')
              }
            "
            >进入首页</el-button
          >
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：吃饭吃的不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  > .iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: red;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
