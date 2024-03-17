<template>
  <div class="shop-list-container">
    <ul class="shop-list">
      <li v-for="shop in shops" :key="shop.id" class="shop-item">{{ shop.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
@import '../assets/scss/_ShopList.scss';
</style>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

const shops = ref([]);

const fetchShops = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  axios
    .get("http://localhost:8000/api/shops", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      shops.value = response.data;
    })
    .catch((error) => {
      console.error(error);
      alert("無法獲取商店列表");
    });
};

// 使用 onMounted 生命週期鉤子來在組件掛載後調用 fetchShops 函數
onMounted(fetchShops);
</script>

