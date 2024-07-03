<script setup>
import PageContainer from '@/views/component/PageContainer.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

const rules = {
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '用户名必须是6-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  sex: [{ required: true, message: '请输入用户性别', trigger: 'blur' }]
}
</script>
<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userStore.userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录ID">
            <el-input v-model="userStore.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input v-model="userStore.userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户性别" prop="sex">
            <el-input v-model="userStore.userInfo.userSex"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
