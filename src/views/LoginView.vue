<template>
  <GoogleLogin :callback="handleCallback" />
  <h1>{{ userName }}</h1>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"; // 導入 axios
import { GoogleLogin } from "vue3-google-login";
import { decodeCredential } from "vue3-google-login";
import { googleOneTap } from "vue3-google-login";

const userName = ref("");

const handleCallback = async (response) => {
  if (response?.credential) {
    console.log(response);
    console.log(response.credential);
    const userData = decodeCredential(response.credential);
    console.log("Handle the userData", userData);
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
      console.log(result.data.token); // 調整對應的 console.log 輸出
      // 儲存 JWT 到 localStorage
      localStorage.setItem("token", result.data.token);
      
      console.log("Login success:", result.data); // 使用 result.data 來訪問響應數據
      userName.value = result.data.name;
      console.log(userName.value);
      // 處理登入成功後的邏輯，例如保存 token
    } catch (error) {
      console.error("Login error:", error);
      // 處理登入失敗的情況
    }
  }
};

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
