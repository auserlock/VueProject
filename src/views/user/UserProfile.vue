<script setup>
import PageContainer from '../component/PageContainer.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { ref } from 'vue'
import { updateUserInfoService } from '@/api/userInfo'
import { ElMessage } from 'element-plus'
import { User, Phone, House } from '@element-plus/icons-vue'
import { deleteAddressService } from '@/api/address'
import {
  getAddressListService,
  addAddressService,
  updateAddressService
} from '@/api/address'
const form = ref()
const formModel = ref({
  userId: userStore.id,
  userName: userStore.userInfo.userName
})
const ifEdited = ref(false)
const formAddress = ref()
const formModelAddress = ref({
  contactName: '',
  contactSex: 1,
  contactTel: '',
  address: ''
})
const rulesAddress = {
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
  await formAddress.value.validate()
  try {
    if (ifEdited.value) {
      ifEdited.value = false
      await updateAddressService(formModelAddress.value)
    } else {
      await addAddressService(formModelAddress.value)
    }
    const res = await getAddressListService()
    userStore.setAddressList(res.data.data)
  } catch (error) {
    console.error('Failed to add address:', error)
  }
  showEditDialog.value = false
}
const rules = {
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{3,10}$/,
      message: '用户名必须是3-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  sex: [{ required: true, message: '请输入用户性别', trigger: 'blur' }]
}
const submitChange = async () => {
  await form.value.validate()
  await updateUserInfoService(
    formModel.value.userName,
    userStore.userInfo.userSex
  ).then(() => {
    ElMessage({ type: 'success', message: '修改成功' })
    userStore.userInfo.userName = formModel.value.userName
  })
}

const editAddress = (id, index) => {
  formModelAddress.value = userStore.userAddr[index]
  showEditDialog.value = true
  ifEdited.value = true
}

const showDialog = ref(false)
const showEditDialog = ref(false)

const deleteAddress = async (id, index) => {
  userStore.userAddr.splice(index, 1)
  await deleteAddressService(id)
}
</script>
<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="formModel"
          :rules="rules"
          ref="form"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录ID">
            <el-input v-model="formModel.userId" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formModel.userName"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 20px" prop="contactSex" label="性别">
            <el-radio-group v-model="userStore.userInfo.userSex" class="ml-4">
              <el-radio :value="1" border>男</el-radio>
              <el-radio :value="0" border>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitChange">提交修改</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showDialog = true"
              >地址管理</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog v-model="showDialog" title="管理收货地址" width="30%" center>
      <div class="addressWrapper">
        <div
          class="address-item"
          :key="item.id"
          v-for="(item, index) in userStore.userAddr"
        >
          <ul class="address-details">
            <li>
              <span>收<i />货<i />人：</span>{{ item.contactName }}
            </li>
            <li>
              <span>性别：</span>{{ item.contactSex === 1 ? '男' : '女' }}
            </li>
            <li><span>联系方式：</span>{{ item.contactTel }}</li>
            <li><span>收货地址：</span>{{ item.address }}</li>
          </ul>
          <div class="buttons">
            <el-button @click="editAddress(item.daId, index)" size="default"
              >编辑</el-button
            >
            <el-button
              @click="deleteAddress(item.daId, index)"
              type="danger"
              size="default"
              >删除</el-button
            >
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="showEditDialog = true" size="large"
            >新增地址</el-button
          >
          <el-button type="primary" @click="showDialog = false" size="large"
            >确定修改</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="showEditDialog"
      title="编辑收货地址"
      width="30%"
      center
      @close="
        () => {
          formModelAddress = {
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
          :model="formModelAddress"
          :rules="rulesAddress"
          ref="formAddress"
          size="large"
          autocomplete="off"
        >
          <el-form-item prop="contactName">
            <el-input
              v-model="formModelAddress.contactName"
              maxlength="16"
              show-word-limit
              :prefix-icon="User"
              placeholder="请输入联系人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 20px" prop="contactSex">
            <el-radio-group v-model="formModelAddress.contactSex" class="ml-4">
              <el-radio :value="1" border>男</el-radio>
              <el-radio :value="0" border>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="contactTel">
            <el-input
              v-model="formModelAddress.contactTel"
              :prefix-icon="Phone"
              type="tel"
              placeholder="请输入联系方式"
            />
          </el-form-item>
          <el-form-item prop="address">
            <el-input
              v-model="formModelAddress.address"
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
                showEditDialog = false
                formModelAddress = {
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
  </page-container>
</template>

<style scoped>
.addressWrapper {
  padding: 20px;
}
.address-item {
  border: 1px solid #ebeef5;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}
.address-details {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.address-details li {
  margin-bottom: 5px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
