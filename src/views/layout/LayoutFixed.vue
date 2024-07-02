<script setup></script>

<template>
  <el-header class="header-icons" height="150px">
    <ul class="app-header-nav">
      <li class="home">
        <RouterLink to="/">首页</RouterLink>
      </li>
      <li
        v-for="(item, index) in businessTypeStore.BusinessTypeInfo"
        :key="item"
      >
        <RouterLink active-class="active" :to="`/order/list/100${index}`">{{
          item
        }}</RouterLink>
      </li>
    </ul>
    <el-dropdown placement="bottom-end" @command="handleCommand">
      <span class="el-dropdown__box">
        <el-avatar />
        <el-icon>
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile" :icon="User"
            >基本资料</el-dropdown-item
          >
          <el-dropdown-item command="avatar" :icon="Crop"
            >更换头像</el-dropdown-item
          >
          <el-dropdown-item command="password" :icon="EditPen"
            >重置密码</el-dropdown-item
          >
          <el-dropdown-item command="logout" :icon="SwitchButton"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
