<script setup>
import Swal from 'sweetalert2';
import { defineProps, onMounted, ref, nextTick } from 'vue';
import { useStore } from '@/stores/counter';
const store = useStore();

const props = defineProps({ items: String });

const keyWord = ref('');

const keyTodo = () => {
  if (keyWord.value === '' || keyWord.value.length === 0) {
    Swal.fire({
      icon: 'error',
      title: '不能沒事情做喔!',
    })
    return
  }
  const keyDetail = { item: keyWord.value, complete: false };
  store.todos.push(keyDetail);
  keyWord.value = '';
  localStorage.setItem('todos', JSON.stringify(store.todos));
}

</script>

<template>
  <div id="inputContainer">
    <input type="text" :placeholder="items" v-model="keyWord" @keyup.enter="keyTodo">
    <div id="addButton" @click="keyTodo">
      <span class="material-symbols-outlined">add</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import '@/assets/styles/main.scss';

#inputContainer {
  position: relative;
  width: 100%;
  margin-bottom: 32px;

  input {
    width: 100%;
    border-color: none;
    border-width: 0;
    box-sizing: border-box;
    padding: 15px 10px;
    border-radius: 8px;
    font-family: $font-family;
    letter-spacing: 1px;
    font-size: 16px;

    &:focus-visible {
      outline: none;
    }
  }

  #addButton {
    cursor: pointer;
    width: 48px;
    height: 48px;
    user-select: none;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    margin: 2.5px;
    border-radius: 8px;
    background-color: #ccc;
    transition: background-color 0.3s;

    &:hover {
      background-color: $title-color;
    }

    &:hover .material-symbols-outlined {
      color: #fff;
    }

    &:active {
      transform: scale(0.95);
    }

    .material-symbols-outlined {
      color: $title-color;
      transition: 0.3s;
    }
  }
}
</style>