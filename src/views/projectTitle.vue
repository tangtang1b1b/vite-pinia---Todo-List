<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  msg: String,
})
</script>

<template>
  <div class="titleContainer">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.titleContainer {
  display: flex;
  justify-content: center;
  margin: 0px 0px 32px 0px;

  h1 {
    font-size: 36px;
    @include titleFontSet;
  }
}
</style>