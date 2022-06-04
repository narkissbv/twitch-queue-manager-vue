<template>
  <qm-header/>
  <div class="flex">
    <div class="list">
      <qm-list/>
    </div>
    <div class="live-config">
      <qm-live-config/>
    </div>
  </div>
  <qm-loader/>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import QmList from '@/components/QmList'
  import QmHeader from '@/components/QmHeader';
  import QmLiveConfig from '@/components/QmLiveConfig';
  import QmLoader from '@/components/QmLoader';
  import twitch from '@/utils/twitch'

  const store = useStore()
  const viewer = computed(() => store.state.viewer)

  onMounted( () => {
    twitch.onAuthorized(async function (auth) {
      await store.dispatch('setAuth', auth);
      await store.dispatch('setViewer');
      if (viewer.value?.id) {
        await store.dispatch('fetchUserData');
      }
      store.dispatch('fetchList');
      store.dispatch('fetchConfig');
    })
  })


</script>

<style>
  body {
    background: #1f1f23;
    color: white;
    padding: 0;
    margin: 0;
    font-family: Inter,Roobert,Helvetica Neue,Helvetica,Arial,sans-serif;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
</style>

<style scoped>
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .list {
    overflow-y: auto;
    flex: 3;
    max-height: calc(100vh - 60px);
    z-index: 1;
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
  .live-config {
    margin: 0 25px;
  }
</style>