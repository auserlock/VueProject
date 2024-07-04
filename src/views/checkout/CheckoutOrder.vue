<script setup>
import { useCartStore } from '@/stores'
import { useUserStore } from '@/stores'
import { User, Phone, House } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { addAddressService, getAddressListService } from '@/api/address'
import { useRouter } from 'vue-router'
import { ordersAddService } from '@/api/orders'
const userStore = useUserStore()
const cartStore = useCartStore()
const showDialog = ref(false)
const showAddAddr = ref(false)
const form = ref()
const router = useRouter()

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

const selectedCount = computed(() => {
  let count = 0
  for (const key in cartStore.cartList) {
    for (const item in cartStore.cartList[key]) {
      count += cartStore.cartList[key][item].quantity
    }
  }
  return count
})

const activeAddress = ref(userStore.userAddr[0] || {})
const changedAddress = ref({})
const switchAddress = (item) => {
  changedAddress.value = item
}
const confirm = () => {
  activeAddress.value = changedAddress.value
  showDialog.value = false
  changedAddress.value = {}
}

const formModel = ref({
  contactName: '',
  contactSex: 1,
  contactTel: '',
  address: ''
})
const rules = {
  userName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { min: 4, message: '联系人姓名包含至少4位字符', trigger: 'blur' }
  ],
  contactTel: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '联系方式必须是11位数字',
      trigger: 'blur'
    }
  ],
  address: [{ required: true, message: '请输入配送地址', trigger: 'blur' }]
}
const confirmAdd = async () => {
  await form.value.validate()
  try {
    await addAddressService(formModel.value)
    const res = await getAddressListService()
    userStore.setAddressList(res.data.data)
  } catch (error) {
    console.error('Failed to add address:', error)
  }
  showAddAddr.value = false
}

const submitOrder = async () => {
  let orderId = []
  try {
    for (const key in cartStore.cartList) {
      if (Object.keys(cartStore.cartList[key]).length > 0) {
        const res = await ordersAddService(
          parseInt(key),
          activeAddress.value.daId
        )
        orderId.push(res.data.data.orderId)
      }
    }
  } catch (error) {
    console.error('Failed to add address:', error)
  }

  router.push({
    path: '/payment',
    query: {
      id: orderId
    }
  })
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!userStore.userAddr">
                您需要先添加收货地址才可提交订单。
              </div>
              <ul v-else style="list-style-type: none">
                <li>
                  <span>收<i />货<i />人：</span>{{ activeAddress.contactName }}
                </li>
                <li><span>联系方式：</span>{{ activeAddress.contactTel }}</li>
                <li><span>收货地址：</span>{{ activeAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true"
                >切换地址</el-button
              >
              <el-button size="large" @click="showAddAddr = true"
                >添加地址</el-button
              >
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(item, index) in cartStore.cartList"
                :key="index"
              >
                <tr v-for="i in item" :key="i.foodId">
                  <td>
                    <a href="javascript:;" class="info">
                      <img :src="i.foodImg" alt="" />
                      <div class="right">
                        <p>{{ i.foodName }}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{ i.foodPrice }}</td>
                  <td>{{ i.quantity }}</td>
                  <td>&yen;{{ i.foodPrice * i.quantity }}</td>
                  <td>&yen;{{}}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">立刻到达</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>外卖件数：</dt>
              <dd>{{ selectedCount }}</dd>
            </dl>
            <dl>
              <dt>外卖总价：</dt>
              <dd>¥{{ selectedPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥5</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                {{ parseInt(selectedPrice) + 5 }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="submitOrder"
            >提交订单</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div
        class="text item"
        :class="{ active: changedAddress.daId === item.daId }"
        @click="switchAddress(item)"
        :key="item.id"
        v-for="item in userStore.userAddr"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.contactName }}
          </li>
          <li><span>联系方式：</span>{{ item.contactTel }}</li>
          <li><span>收货地址：</span>{{ item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          size="large"
          @click="
            () => {
              showDialog = false
            }
          "
          >取消</el-button
        >
        <el-button type="primary" @click="confirm" size="large">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="showAddAddr"
    title="添加收货地址"
    width="30%"
    center
    @close="
      () => {
        formModel = {
          contactName: '',
          contactSex: 1,
          contactTel: '',
          address: ''
        }
      }
    "
  >
    <div class="addressWrapper">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <el-form-item prop="contactName">
          <el-input
            v-model="formModel.contactName"
            maxlength="16"
            show-word-limit
            :prefix-icon="User"
            placeholder="请输入联系人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px" prop="contactSex">
          <el-radio-group v-model="formModel.contactSex" class="ml-4">
            <el-radio :value="1" border>男</el-radio>
            <el-radio :value="0" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="contactTel">
          <el-input
            v-model="formModel.contactTel"
            :prefix-icon="Phone"
            type="tel"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <el-form-item prop="address">
          <el-input
            v-model="formModel.address"
            :prefix-icon="House"
            type="text"
            placeholder="请输入配送地址"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          size="large"
          @click="
            () => {
              showAddAddr = false
              formModel = {
                contactName: '',
                contactSex: 1,
                contactTel: '',
                address: ''
              }
            }
          "
          >取消</el-button
        >
        <el-button size="large" type="primary" @click="confirmAdd"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: black;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: black;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: red;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: black;
      background: #e2f7f2;
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
