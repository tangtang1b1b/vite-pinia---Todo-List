<script setup>
import projectTitle from './views/projectTitle.vue';
import listInput from './views/listInput.vue';
import listViewSection from './views/listViewSection.vue';

</script>

<template>
  <projectTitle msg="TODO&ensp;LIST"></projectTitle>
  <listInput items="新增待辦事項"></listInput>
  <listViewSection></listViewSection>
</template>

<style lang="scss" scoped>

</style>
