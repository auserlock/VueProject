<script setup>
import {
  Management,
  Connection,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { useBusinessStore } from '@/stores'
import { useBusinessTypeStore } from '@/stores'
import { useCartStore, useOrderStore } from '@/stores'
import { RouterLink } from 'vue-router'
import { cartDeleteService } from '@/api/cart'
// import avatar from '@/assets/default.png'
const router = useRouter()
const useStore = useUserStore()
const businessStore = useBusinessStore()
const businessTypeStore = useBusinessTypeStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const handleCommand = async (key) => {
  if (key === 'logout') {
    if (window.confirm('确定要退出登录吗？')) {
      // 用户点击了确认按钮
      try {
        for (const key in cartStore.cartList) {
          if (Object.keys(cartStore.cartList[key]).length > 0) {
            for (const item in cartStore.cartList[key]) {
              await cartDeleteService(
                cartStore.cartList[key][item].foodId,
                cartStore.cartList[key][item].businessId
              )
            }
          }
        }
      } catch (error) {
        console.error('Failed to add address:', error)
      }
      router.push('/login') // 退出操作：跳转到登录页面
      useStore.removeToken() // 移除 token
      businessStore.removeAll() // 清空 business 数据
      cartStore.removeAll() // 清空购物车数据
      orderStore.removeOrders() // 清空订单数据
    }
  } else {
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="250px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/order/list">
          <el-icon>
            <Management />
          </el-icon>
          <span>商家列表</span>
        </el-menu-item>
        <el-menu-item index="/order/cart">
          <el-icon>
            <Connection />
          </el-icon>
          <span>购物车</span>
        </el-menu-item>
        <el-menu-item index="/order/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
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
            <el-avatar :src="useStore.userInfo.userImg" />
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
      <el-main class="main-style">
        <router-view></router-view>
      </el-main>
      <el-footer>CausedByEating ©2024 Created</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 200vh;
  background-color: #f5f1f3;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      // background: url('@/assets/logo.jpeg') no-repeat center / cover;
    }

    .el-menu {
      border-right: none;
    }
  }

  .header-icons {
    background: url('@/assets/name.png') no-repeat center top / 400px auto;
    .app-header-nav {
      display: flex;
      list-style: none;
      padding: 20px;
      margin: 100px 0 0 0;
    }
    .app-header-nav a {
      text-decoration: none;
      color: black;
    }

    .app-header-nav a:hover {
      color: #0caa5b;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 10px;
    }
    .app-header-nav li {
      margin-right: 46px;
      margin-left: 20px;
      font-size: 18px;
      text-align: center;
      .active {
        color: #0caa5b;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 10px;
      }
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
