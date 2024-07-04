<script setup>
import PageContainer from '../component/PageContainer.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { ref } from 'vue'
import { updateUserInfoService } from '@/api/userInfo'
import { ElMessage } from 'element-plus'
const form = ref()
const formModel = ref({
  userId: userStore.id,
  userName: userStore.userInfo.userName
})
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
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
