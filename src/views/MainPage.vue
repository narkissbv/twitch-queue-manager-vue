<template>
  <div class="wrapper">
    <div class="header">
      <qm-header/>
    </div>
    <div class="list">
      <qm-list/>
    </div>
    <div class="actions">
      <button @click="requestAuth"
              v-if="!viewer?.id"
              class="button-85">
        Authorize
      </button>
      <button @click="leaveQueue"
              v-else-if="isInQueue"
              class="button-85">
        Leave
      </button>
      <button @click="joinQueue"
              v-else
              class="button-85">
        Join
      </button>
    </div>
  </div>
  <qm-loader/>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import QmHeader from '@/components/QmHeader'
  import QmList from '@/components/QmList';
  import QmLoader from '@/components/QmLoader';
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

  const joinQueue = async () => {
    store.dispatch('setLoader', true);
    await store.dispatch('joinQueue');
    await store.dispatch('fetchList');
    store.dispatch('setLoader', false);
  }

  const leaveQueue = async () => {
    store.dispatch('setLoader', true);
    await store.dispatch('leaveQueue');
    await store.dispatch('fetchList');
    store.dispatch('setLoader', false);
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
  }
  .list {
    height: 390px;
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

  .actions {
    height: 60px;
    text-align: center;
  }

  .actions button {
    width: 90%;
    height: 50px;
    cursor: pointer;
    font-size: 24px;
    padding: 0;
  }

 /* Taken from https://getcssscan.com/css-buttons-examples */
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

</style>