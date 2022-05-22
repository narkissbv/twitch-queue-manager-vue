<template>
  <div class="list">
    <ul>
      <li v-for="(user, index) in list"
        :key="index">
        {{ user.username }}
      </li>
    </ul>
    <button @click="join" v-if="isInQueue">Join</button>
    <button @click="leave" v-else>Leave</button>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
import { join } from 'path';

  const store = useStore()
  const list = computed(() => store.state.list);
  const username = computed(() => store.state.username);
  isInQueue = () => {
    return list.some( item => {
      return item.username === username
    })
  }

  join = () => {
    store.dispatch('joinQueue');
  }

  leave = () => {
    store.dispatch('leaveQueue');
  }

  onMounted( () => {
    store.dispatch('fetchList');
  });
</script>

<style scoped>

</style>