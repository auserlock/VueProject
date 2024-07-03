<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useCartStore } from '@/stores'
const cartStore = useCartStore()

import { useBusinessStore } from '@/stores'
const businessStore = useBusinessStore()

import { cartSetService } from '@/api/cart'

const delCart = (item, key) => {
  delete cartStore.cartList[key][item]
}

const visitHome = () => {
  router.push('/')
}

const handleQuantityChange = (value, key, item) => {
  if (value === 0) {
    delCart(item, key)
  }
}

const selectedCount = computed(() => {
  let count = 0
  for (const key in cartStore.cartList) {
    for (const item in cartStore.cartList[key]) {
      count += cartStore.cartList[key][item].quantity
    }
  }
  return count
})

const selectedPrice = computed(() => {
  let price = 0
  for (const key in cartStore.cartList) {
    for (const item in cartStore.cartList[key]) {
      price +=
        cartStore.cartList[key][item].quantity *
        cartStore.cartList[key][item].foodPrice
    }
  }
  return price.toFixed(2)
})

//计算cart中有几家商家
const selectedBusiness = computed(() => {
  let business = 0
  for (const key in cartStore.cartList) {
    if (Object.keys(cartStore.cartList[key]).length > 0) {
      business++
    }
  }
  return business
})

const setCart = async () => {
  for (const key in cartStore.cartList) {
    if (Object.keys(cartStore.cartList[key]).length > 0) {
      for (const item in cartStore.cartList[key]) {
        await cartSetService(
          cartStore.cartList[key][item].foodId,
          cartStore.cartList[key][item].businessId,
          cartStore.cartList[key][item].quantity
        )
      }
    }
  }
  router.push(`/checkout/`)
}
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
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="450">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
              <th width="240">商家信息</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <template v-for="(item, index) in cartStore.cartList" :key="index">
              <tr v-for="i in item" :key="i.foodId">
                <td>
                  <div class="goods">
                    <img :src="i.foodImg" alt="" />
                    <div>
                      <p class="name ellipsis">
                        {{ i.foodName }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ i.foodPrice }}</p>
                </td>
                <td class="tc">
                  <el-input-number
                    v-model="i.quantity"
                    :min="0"
                    @change="handleQuantityChange(i.quantity, index, i.foodId)"
                  />
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (i.foodPrice * i.quantity).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p>
                    <el-popconfirm
                      title="确认删除吗?"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      @confirm="delCart(i.foodId, index)"
                    >
                      <template #reference>
                        <a href="javascript:;">删除</a>
                      </template>
                    </el-popconfirm>
                  </p>
                </td>
                <td class="tc">{{ businessStore.BusinessName[index] }}</td>
              </tr>
            </template>
            <tr
              v-if="
                Object.keys(cartStore.cartList).every(
                  (key) => Object.keys(cartStore.cartList[key]).length === 0
                )
              "
            >
              <td colspan="7">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="visitHome"
                      >随便逛逛</el-button
                    >
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ selectedCount }} 件商品，共来自{{
            selectedBusiness
          }}家商户，商品合计：
          <span class="red">¥ {{ selectedPrice }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="setCart"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: black;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: black;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
