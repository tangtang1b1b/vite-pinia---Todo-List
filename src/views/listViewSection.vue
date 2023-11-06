<script setup>
import Swal from 'sweetalert2';
import { reactive, computed, watch } from 'vue';
import { useStore } from '@/stores/counter';
const store = useStore();

const tags = reactive([
  { title: '全部', choose: true, type: 'all' },
  { title: '待完成', choose: false, type: 'await' },
  { title: '已完成', choose: false, type: 'complete' },
]);

//底線滑動
const changeUnderLine = (index) => {
  store.currentIndex = index;
  const listContainer = document.querySelector('.listContainer');
  const downLine = document.querySelector('.downLine');
  const movePerc = listContainer.getBoundingClientRect().width / 3;
  downLine.style.transform = `translateX(${movePerc * index}px)`;
};

//todo-item
const filterTodos = computed(() => {
  switch (tags[store.currentIndex].type) {
    case 'all':
      return reactive(store.todos);
    case 'await':
      return reactive(store.todos.filter((todo) => !todo.complete));
    case 'complete':
      return reactive(store.todos.filter((todo) => todo.complete));
  }
});

const deleteTarget = (index) => {
  store.todos.splice(store.todos.indexOf(filterTodos.value[index]), 1)
};

const deleteAll = () => {
  if (store.todos.filter((todo) => todo.complete).length !== 0) {
    Swal.fire({
      title: '確定要清除嗎?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定'
    }).then((result) => {
      if (result.isConfirmed) {
        store.todos = store.todos.filter((todo) => !todo.complete)
        Swal.fire(
          '成功'
        )
      }
    });
  }
};

const record = computed(() => {
  return store.todos.filter((todo) => !todo.complete).length;
});

watch(() => store.todos, (newState) => {
  localStorage.setItem('todos', JSON.stringify(store.todos));
}, { deep: true });

</script>

<template>
  <div class="listContainer">
    <ul class="listTags">
      <li class="tag" @click="changeUnderLine(index)" v-for="(tag, index) in tags" :key="tag">{{ tag.title }}</li>
    </ul>
    <div class="underLine">
      <div class="downLine"></div>
    </div>
    <div class="todos">
      <div class="todoItem" v-for="(todo, index) in filterTodos" :key="todo">
        <div class="checkContainer">
          <input type="checkbox" id="checkBox" v-model="todo.complete">
        </div>
        <div class="todoContent" :class="{ selected: todo.complete === true }">{{ todo.item }}</div>
        <div class="delete" @click="deleteTarget(index)"><span class="material-symbols-outlined">close</span></div>
      </div>
    </div>
    <div class="actionContainer">
      <div class="actions">
        <div class="record"><span>{{ record }}</span>個待完成項目</div>
        <div class="deleteAll" @click="deleteAll"><span>清除已完成項目</span></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import '@/assets/styles/main.scss';

@mixin centerDefault ($dis, $jc, $ai) {
  display: $dis;
  justify-content: $jc;
  align-items: $ai;
}

.listContainer {
  background-color: #fff;
  color: $title-color;
  width: 100%;
  border-radius: 8px;
  font-family: $font-family;
  box-shadow: 0px 1px 10px 1px rgba($color: #000000, $alpha: 0.1);

  .listTags {
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    height: 60px;
    cursor: pointer;
    user-select: none;

    .tag {
      width: 33.3333%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }
  }
}

.underLine {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: rgba($color: #000000, $alpha: 0.1);

  .downLine {
    position: absolute;
    top: 0;
    width: 33.333333%;
    height: 100%;
    z-index: 1;
    transition: 0.3s;
    background-color: $title-color;
  }
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(rgba(55,65,81,0.5), rgba(255,211,111,0.5));
  border-radius: 10px;
}

.todos {
  width: 100%;
  height: 50vh;
  overflow-y: scroll;

  .todoItem {
    height: 60px;
    @include centerDefault(flex, center, center);
    width: 100%;

    .checkContainer {
      width: 13.5%;
      height: 100%;
      @include centerDefault(flex, center, center);

      #checkBox {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }

    .todoContent {
      user-select: none;
      width: 73%;
      height: 100%;
      font-size: 16px;
      @include centerDefault(flex, flex-start, center);
      border-bottom: solid 2.5px rgba($color: #000000, $alpha: 0.1);

      &:hover+.delete {
        opacity: 1;
      }
    }

    .todoContent.selected {
      color: #ccc;
      text-decoration: line-through;
    }

    .delete {
      width: 13.5%;
      height: 100%;
      opacity: 0;
      @include centerDefault(flex, center, center);
      cursor: pointer;
      transition: 0.1s;

      &:hover {
        opacity: 1;
        transition: 0.1s;
      }

      .material-symbols-outlined {
        color: #ccc;
        transition: 0.1s;
      }

      &:hover .material-symbols-outlined {
        color: $title-color;
        transition: 0.1s;
      }
    }

    .delete.appear {
      opacity: 1;
      transition: 0.3s;
    }
  }
}

.actionContainer {
  display: flex;
  justify-content: center;
  height: 60px;

  .actions {
    display: flex;
    width: 80%;

    .record,
    .deleteAll {
      width: 50%;
      display: flex;
      align-items: center;
    }

    .record {
      span {
        margin-right: 5px;
      }
    }

    .deleteAll {
      justify-content: flex-end;
      cursor: pointer;

      span {
        color: #ccc;
        transition: 0.3s;

        &:hover {
          color: $title-color;
        }
      }
    }
  }
}
</style>