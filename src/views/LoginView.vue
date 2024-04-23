<template>
  <div class="login-container">
    <GoogleLogin :callback="handleCallback" />
    <button v-if="userName" @click="handleLogout" class="logout-button">登出</button>
    <h1 class="user-name">{{ userName }}</h1>
  </div>

  <div class="login-form">
    <h2>登入</h2>
    <form @submit.prevent="Normallogin">
      <div class="form-group">
        <label for="username">email</label>
        <input type="text" id="username" v-model="credentials.email" required>
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>
      <button type="submit" class="btn-login">登入</button>
    </form>
    <p v-if="loginError" class="error-message">登入失敗，請檢查您的信箱或密碼。</p>
  </div>

</template>

<style scoped>
@import "../assets/scss/_LoginView.scss";
</style>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { GoogleLogin,decodeCredential,googleLogout } from "vue3-google-login";
import { googleOneTap } from "vue3-google-login";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from 'pinia'

const userName = ref("");
const loginError = ref(false);

const authStore = useAuthStore()


// 登入必填訊息
const credentials = ref({
  email: '',
  password: '',
});

// ㄧ般登入
const Normallogin = () => {
  axios.post('http://localhost:8000/api/login', credentials.value)
    .then(response => {
      console.log('登入成功:', response);
      // pinia 除存登入狀態
      authStore.setLoginStatus(true);
      authStore.user = response.data.user.name;
      // 根據需要進行跳轉或保存 token 等操作
      localStorage.setItem("token", response.data.access_token);
      loginError.value = false;
    })
    .catch(error => {
      console.error('登入失敗:', error);
      loginError.value = true;
    });
};

// google 登入和登出
const handleCallback = async (response) => {
  if (response?.credential) {
    console.log(response);
    // console.log(response.credential);
    localStorage.setItem("google_token", response.credential);
    const userData = decodeCredential(response.credential);
    // console.log("Handle the userData", userData);
    // 假設後端需要 JWT token，則直接將 credential 發送給後端
    try {
      const result = await axios.post(
        "http://localhost:8000/api/login/google/callback",
        {
          token: response.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("google_token",result);
      // console.log(result.data.token);
      // 儲存 JWT 到 localStorage
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("name", result.data.name);
      // pinia 除存登入狀態
      authStore.setLoginStatus(true);
      authStore.user = result.data.name;
      
      // console.log("Login success:", result.data);
      userName.value = result.data.name;
      console.log(userName.value);
      // 處理登入成功後的邏輯，例如保存 token
    } catch (error) {
      console.error("Login error:", error);
      // 處理登入失敗的情況
    }
  }
};

// 登出處理函數
const handleLogout = () => {
  // 清除本地儲存的 token
  localStorage.removeItem("token");
  localStorage.removeItem("name");

  // 清空用戶名
  userName.value = "";
  authStore.isLoggedIn = false;
  authStore.user = "";
-
  // 調用 googleLogout 方法來登出 Google 帳號
  googleLogout(() => {
    console.log("Logout success");
  });
};
// 第三方認證
onMounted(() => {
  googleOneTap({ autoLogin: true })
    .then((response) => {
      // 當用戶通過 One Tap 選擇了一個賬號後
      console.log("Handle the response", response);
      handleCallback(response); // 使用同樣的處理函數處理響應
    })
    .catch((error) => {
      console.log("Handle the error", error);
    });
});
</script>
