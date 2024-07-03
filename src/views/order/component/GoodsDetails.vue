<script setup>
import { businessGetFoodListService } from '@/api/food'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useBusinessTypeStore } from '@/stores'
import { useCartStore } from '@/stores'
import { Plus, Minus } from '@element-plus/icons-vue'
const useTypeStore = useBusinessTypeStore()
const useCart = useCartStore()
const route = useRoute()
const router = useRouter()

const businessId = route.params.listID
const foodList = ref([])

const findIndexByFoodId = (foodId) => {
  return foodList.value.findIndex((item) => item.foodId === foodId)
}

const previousPath = computed(() => {
  const pathArray = route.path.split('/')
  pathArray.pop() // 移除当前路径部分
  return pathArray.join('/') || '/' // 返回上一级路径，或根路径
})

const GetFoodList = async () => {
  try {
    const res = await businessGetFoodListService(businessId)
    return res.data.data
  } catch (error) {
    console.error('Failed to fetch business list:', error)
  }
}

const currentCart = ref({})

const clickButtonPlus = (key) => {
  if (
    currentCart.value[key] !== undefined &&
    currentCart.value[key].quantity !== undefined
  ) {
    // 如果已经存在 quantity 属性，则增加数量
    currentCart.value[key].quantity++
  } else {
    // 否则从 foodList 中获取对应的商品信息，并设置 quantity 为 1
    currentCart.value[key] = {
      ...foodList.value[findIndexByFoodId(key)],
      quantity: 1
    }
  }
  // console.log(currentCart.value)
}

const clickButtonMinus = (key) => {
  if (
    currentCart.value[key] !== undefined &&
    currentCart.value[key].quantity !== undefined
  ) {
    // 如果已经存在 quantity 属性，则减少数量，但要确保数量不小于 1
    if (currentCart.value[key].quantity > 1) {
      currentCart.value[key].quantity--
    } else {
      // 如果数量为 1，则从购物车中移除该商品
      delete currentCart.value[key]
    }
    // console.log(currentCart.value)
  }
}

const order = () => {
  router.push('/order/cart')
}

const totalPrice = computed(() => {
  let total = 0
  // 防御性检查
  if (!foodList.value || !currentCart.value) {
    return total
  }
  for (const key in currentCart.value) {
    total += currentCart.value[key].quantity * currentCart.value[key].foodPrice
  }
  return total
})

onMounted(() => {
  GetFoodList().then((res) => {
    foodList.value = res
  })
  useCart.addOrUpdateMerchant(businessId, currentCart.value)
  if (useCart.cartList[businessId] !== undefined) {
    currentCart.value = useCart.cartList[businessId]
  }
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/order/list' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="previousPath">{{
            useTypeStore.BusinessTypeInfo[parseInt(route.params.id.charAt(3))]
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>餐品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>

  <div class="body">
    <ul class="goods-list">
      <li v-for="goods in foodList" :key="goods.foodId" class="goods-item">
        <div class="image-container">
          <img :src="goods.foodImg" alt="" />
        </div>
        <div class="text">
          <p class="name ellipsis">{{ goods.foodName }}</p>
          <p class="desc ellipsis">{{ goods.foodExplain }}</p>
          <p class="price ellipsis">￥{{ goods.foodPrice }}</p>
        </div>
        <div class="cart">
          <el-button
            type="primary"
            :circle="true"
            :icon="Minus"
            @click="clickButtonMinus(goods.foodId)"
            v-show="
              currentCart[goods.foodId] && currentCart[goods.foodId].quantity
                ? currentCart[goods.foodId].quantity
                : 0 > 0
            "
            class="MinusButton"
          />
          <div
            v-show="
              currentCart[goods.foodId] && currentCart[goods.foodId].quantity
                ? currentCart[goods.foodId].quantity
                : 0 > 0
            "
            class="NumberInput"
          >
            {{
              currentCart[goods.foodId] && currentCart[goods.foodId].quantity
                ? currentCart[goods.foodId].quantity
                : 0
            }}
          </div>
          <el-button
            type="primary"
            :circle="true"
            :icon="Plus"
            @click="clickButtonPlus(goods.foodId)"
            class="PlusButton"
          />
        </div>
      </li>
    </ul>
  </div>
  <div>
    {{ totalPrice }}
    <el-button type="primary" @click="order" class="orderbutton"
      >结算</el-button
    >
  </div>
</template>

<style scoped lang="scss">
.top-category {
  .bread-container {
    padding: 25px 0;
  }
}
.body {
  .goods-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    text-align: center;

    li {
      display: block;
      margin: 0px 30%;
    }

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
        width: 200px;

        p {
          padding-top: 10px;
        }
      }

      .name {
        font-size: 20px;
        font-weight: bold;
        position: relative;
        top: 0px;
        left: -20px;
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
        font-size: 22px;
        color: red;
        position: relative;
        top: 0px;
      }

      .cart {
        display: flex;
        position: relative;
        left: 150px;
        height: 100px; /* 确保父元素高度固定 */
        align-items: center; /* 使用Flexbox布局垂直居中 */
        top: 40%;

        .MinusButton {
          position: relative;
          left: -50px;
        }

        .NumberInput {
          width: 50px;
          height: 40px;
          text-align: center;
          font-size: 24px;
          border: 2px solid #007bff;
          border-radius: 5px;
          margin: 0 5px;
          line-height: 40px; /* 确保文字垂直居中 */
          position: relative;
          left: -45px;
        }

        .PlusButton {
          position: absolute;
          top: 33px;
          left: 60px;
        }
      }
    }
  }
}
</style>
