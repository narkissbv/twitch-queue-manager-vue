<template>
  <div class="title">Queue Manager</div>
  <div class="action refresh" @click="refresh"></div>
</template>

<script setup>
  import { useStore } from 'vuex'

  const store = useStore()
  const refresh = async () => {
    store.dispatch('setLoader', true);
    await store.dispatch('fetchList')
    store.dispatch('setLoader', false);
  }

</script>

<style scoped>
  .title {
    background: -webkit-linear-gradient(#d13838,#9147ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 30px;
  }

  .action {
    position: absolute;
    top: 10px;
    width: 24px;
    height: 24px;
    background-size: contain;
    cursor: pointer;
  }
  .action.refresh {
    left: 10px;
    background-image: url('~@/assets/refresh.svg');
  }
</style>
