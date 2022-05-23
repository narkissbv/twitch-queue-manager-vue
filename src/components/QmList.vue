<template>
  <qm-item v-for="(user, index) in list"
    :key="user.username"
    :user="user.username"
    :index="index"
  />
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import QmItem from './QmItem';

  const store = useStore()
  const list = computed(() => store.state.list);
</script>

<style scoped>

</style>
