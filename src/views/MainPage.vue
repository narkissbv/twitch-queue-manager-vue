<template>
  <div class="wrapper">
    <div class="header">
      <qm-header/>
    </div>
    <div class="list">
      <qm-list/>
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
  import { computed } from 'vue'
  import QmHeader from '@/components/QmHeader'
  import QmList from '@/components/QmList';
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

</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px
  }
  .list {
    height: calc(100% - 100px);
    overflow-y: auto;
  }

  .list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #808080;
  }

  .list::-webkit-scrollbar {
    width: 6px;
  }

  .list::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #d3d3d3;
  }

  /* .list::after {
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 50px;
    background-image: linear-gradient(transparent, #1f1f23);
  } */
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