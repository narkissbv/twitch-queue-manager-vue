<template>
  <div class="list">
    <ul>
      <li v-for="(user, index) in list"
        :key="index">
        {{ user.username }}
      </li>
    </ul>
    <button @click="leaveQueue" v-if="isInQueue">Leave</button>
    <button @click="joinQueue" v-else>Join</button>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'

  const store = useStore()
  const list = computed(() => store.state.list);
  const username = computed(() => store.state.username);
  const isInQueue = computed(() => {
    return list.value.some( item => {
      return item.username === username.value
    });
  });

  function joinQueue () {
    store.dispatch('joinQueue');
  }

  function leaveQueue () {
    store.dispatch('leaveQueue');
  }

  onMounted( () => {
    store.dispatch('fetchList');
  });
</script>

<style scoped>

</style>