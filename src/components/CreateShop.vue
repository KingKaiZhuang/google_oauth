<template>
  <div>
    <input v-model="name" type="text" placeholder="商店名稱" />
    <button @click="createShop">創建商店</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";

// 定義一個響應式的引用，用於綁定輸入框的值
const name = ref("");

// 定義創建商店的方法
const createShop = async () => {
  // 從localStorage獲取token
  const token = localStorage.getItem('token');
  console.log(token);
  try {
    const response = await axios.post("http://localhost:8000/api/shops", { name: name.value }, {
      headers: {
        // 使用Bearer認證方案附加token
        'Authorization': `Bearer ${token}`
      }
    });
    alert("商店創建成功");
    name.value = ""; // 重置表單
  } catch (error) {
    console.error(error);
    alert("商店創建失敗");
  }
};
</script>

