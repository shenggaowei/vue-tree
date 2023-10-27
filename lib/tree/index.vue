<template>
  <div :class="style.container">tree 组件</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const valueRef = ref();
</script>

<style lang="scss" module="style">
.container {
  background: orange;
}
</style>
