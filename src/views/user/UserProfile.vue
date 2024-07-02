<script setup>
import PageContainer from '@/views/component/PageContainer.vue'
import { useUserInfoStore } from '@/stores'
const userInfoStore = useUserInfoStore()

const rules = {
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '用户名必须是6-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
</script>
<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="useUserInfoStore.userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录ID">
            <el-input
              v-model="userInfoStore.userInfo.userId"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input v-model="userInfoStore.userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户性别" prop="email">
            <el-input v-model="userInfoStore.userInfo.userSex"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
