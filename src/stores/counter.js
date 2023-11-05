import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('counter', () => {
  const currentIndex = ref(0);
  const todos = reactive(
    JSON.parse(localStorage.getItem('todos')) || [
      { item: '五金行買水龍頭', complete: false },
      { item: '吃麥當勞', complete: false },
      { item: '星巴克喝奶茶', complete: false },
    ]
  );

  return { currentIndex, todos };
});
