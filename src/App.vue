<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useSystemStore } from "@/store";

const store = useSystemStore();
store.updateSystemDeviceInfo(false);
</script>

<style lang="scss">
@import "@/assets/css/reset.scss";
</style>
