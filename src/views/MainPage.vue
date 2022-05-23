<template>
  <div class="wrapper">
    <div class="header">
      <qm-header/>
    </div>
    <div class="list">
      <queue-list/>
    </div>
    <div class="actions">
      <button @click="requestAuth" v-if="!viewer.id">Authorize</button>
      <button @click="leaveQueue" v-else-if="isInQueue">Leave</button>
      <button @click="joinQueue" v-else>Join</button>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import QmHeader from '@/components/QmHeader'
  import QueueList from '@/components/QueueList';
  import twitch from '@/utils/twitch'

  const store = useStore()
  const list = computed(() => store.state.list);
  const username = computed(() => store.state.username);
  const viewer = computed(() => store.state.viewer);
  const isInQueue = computed(() => {
    return list.value.some( item => {
      return item.username === username.value
    });
  });

  async function joinQueue () {
    await store.dispatch('joinQueue');
    store.dispatch('fetchList');
  }

  async function leaveQueue () {
    await store.dispatch('leaveQueue');
    store.dispatch('fetchList');
  }

  function requestAuth() {
    twitch.actions.requestIdShare();
  }

  onMounted( () => {
    store.dispatch('fetchList');
  });
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px
  }
  .list {
    max-height: calc(100% - 100px);
    overflow-y: auto;
  }
  .actions {
    height: 50px;
    text-align: center;
  }

  .actions button {
    width: 90%;
    height: 100%;
    cursor: pointer;
  }
</style>