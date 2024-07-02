<script setup>
import { businessGetFoodListService } from '@/api/food'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useBusinessTypeStore } from '@/stores'
import { Plus } from '@element-plus/icons-vue'
const useTypeStore = useBusinessTypeStore()
const route = useRoute()

const businessId = route.params.listID
const foodList = ref([])

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

onMounted(() => {
  GetFoodList().then((res) => {
    foodList.value = res
  })
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
          <el-button type="primary" :icon="Plus" circle="true" class="button" />
        </div>
      </li>
    </ul>
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
        position: relative;
        left: 200px;
        top: 40%;
      }
    }
  }
}
</style>
