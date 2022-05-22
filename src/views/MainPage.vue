<template>
  <h2>Welcome, {{ username }}</h2>
  <p>Auth data: {{ authData }}</p>
  <p>List: {{ list }}</p>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'

  const store = useStore()
  const username = computed(() => store.state.username);
  const list = computed(() => store.state.list);
  const authData = store.state.auth;

  onMounted( () => {
    store.dispatch('fetchList');
  });
</script>

<style scoped>

</style>