<template>
  <qm-header/>
  <qm-list/>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import QmList from '@/components/QmList'
  import QmHeader from '@/components/QmHeader.vue';
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
