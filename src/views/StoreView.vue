<template>
  <div>
    <h1>商店管理</h1>
    <router-link to="/shop/create" class="btn btn-primary"
      >創建商店</router-link
    >
    <router-link to="/shop/list" class="btn btn-secondary"
      >商店列表</router-link
    >
    <router-view></router-view>
    <!-- 子路由將在這裡渲染 -->
  </div>
</template>

<script setup>

</script>

<!-- 加上一些基本的樣式 -->

<style scoped>
@import '../assets/scss/_StoreView.scss';
</style>