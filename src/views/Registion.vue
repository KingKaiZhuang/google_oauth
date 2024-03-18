<template>
    <div class="register-container">
    <h2>註冊</h2>
    <form @submit.prevent="NormalRegistion">
      <div>
        <label for="email">電子郵箱:</label>
        <input id="email" type="email" v-model="user.email" required>
      </div>
      <div>
        <label for="name">姓名:</label>
        <input id="name" type="text" v-model="user.name" required>
      </div>
      <div>
        <label for="password">密碼:</label>
        <input id="password" type="password" v-model="user.password" required>
      </div>
      <div>
        <label for="password_confirmation">確認密碼:</label>
        <input id="password_confirmation" type="password" v-model="user.password_confirmation" required>
      </div>
      <button type="submit">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 用戶註冊必填訊息
const user = ref({
  email: '',
  name: '',
  password: '',
  password_confirmation: ''
});

// 一般註冊
const NormalRegistion = () => {
  axios.post('http://localhost:8000/api/register', user.value)
    .then(response => {
      // 處理響應，例如跳轉到登入頁面或首頁
      console.log(response.data);
      alert('註冊成功！');
    })
    .catch(error => {
      // 處理錯誤，例如顯示錯誤訊息
      console.error(error);
      alert('註冊失敗，請檢查輸入資訊！');
    });
};
</script>