<template>
  <ul>
    <li v-for="(user, index) in list"
      :key="index">
      {{ user.username }}
    </li>
  </ul>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  const store = useStore()
  const list = computed(() => store.state.list);
</script>

<style scoped>

</style>
