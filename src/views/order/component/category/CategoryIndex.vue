<script setup>
import { useRoute } from 'vue-router'
import { useBusinessTypeStore } from '@/stores'
const useTypeStore = useBusinessTypeStore()
import { useBusinessStore } from '@/stores'
const businessStore = useBusinessStore()

import GoodsItem from '../GoodsItem.vue'

const route = useRoute()
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/order/list' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{
            useTypeStore.BusinessTypeInfo[parseInt(route.params.id.charAt(3))]
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
  <div class="body">
    <ul class="goods-list">
      <li
        v-for="goods in businessStore.BusinessInfo[
          parseInt(route.params.id.charAt(3)) + 1
        ]"
        :key="goods.businessId"
      >
        <GoodsItem :goods="goods"></GoodsItem>
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
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: red;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
