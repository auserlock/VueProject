<script setup>
import { useOrderStore } from '@/stores'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { computed } from 'vue'
const orderStore = useOrderStore()
const useStore = useUserStore()

const getAddr = (daId) => {
  return useStore.userAddr.find((addr) => addr.daId === daId)
}

const displayedOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return orderStore.orders.slice().reverse().slice(startIndex, endIndex)
})

const currentPage = ref(1)
const pageSize = ref(5)

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleSizeChange = (val) => {
  pageSize.value = val
}
</script>

<template>
  <div class="body">
    <ul class="goods-list">
      <li v-for="order in displayedOrders" :key="order.orderId">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      :total="orderStore.orders.length"
      :pager-count="5"
      class="fixed-pagination"
    />
  </div>
</template>

<style scoped lang="scss">
.fixed-pagination {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* 可能需要调整的z-index */
}
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

    .el-pagination {
      margin-top: 20px;
      position: relative; /* 父元素需要设置为相对定位 */

      .el-pagination__jump {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000; /* 可能需要调整的z-index */

        .el-input.el-pagination__jump input {
          width: 60px;
          text-align: center;
        }

        .el-pagination__jump .el-button {
          margin-left: 10px;
        }
      }

      .el-pager {
        li {
          margin: 0 5px;
          cursor: pointer;
          color: #409eff;

          &.active {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
          }
        }
      }

      .el-pagination__button {
        margin: 0 5px;
      }
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
