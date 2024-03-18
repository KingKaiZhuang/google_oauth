<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#">GoogleCalendar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/shop">Shop</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span v-if="!isLoggedIn">帳號</span>
              <span v-if="isLoggedIn">{{ user }}</span>
            </a>
            <ul class="dropdown-menu">
              <li v-if="isLoggedIn"><a class="dropdown-item" href="#"><router-link class="nav-link active" to="/api/login">個人檔案</router-link></a></li>
              <li v-if="!isLoggedIn"><a class="dropdown-item" href="#"><router-link class="nav-link active" to="/api/login">登入</router-link></a></li>
              <li v-if="!isLoggedIn"><a class="dropdown-item" href="#"><router-link class="nav-link active" to="/api/registtion">註冊</router-link></a></li>
              <li v-if="isLoggedIn"><hr class="dropdown-divider" /></li>
              <li v-if="isLoggedIn" @click="handleLogout"><a class="dropdown-item" href="#">登出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/auth.js'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isLoggedIn,user } = storeToRefs(authStore)

const handleLogout = () => {
  // 清除本地儲存的 token
  localStorage.removeItem("token");
  localStorage.removeItem("name");

  // 清空用戶名
  authStore.isLoggedIn = false;
  authStore.user = "";
};
</script>
