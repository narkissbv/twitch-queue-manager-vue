<template>
  <div class="flex">
    <div class="index">
      {{ index + 1 }}
    </div>
    <div class="name">
      {{ user }}
    </div>
    <div v-if="isAdmin">
      <div class="actions">
        <div class="action up"
             @click="moveUp">
          <img :src="require('@/assets/up.svg')"/>
        </div>
        <div class="action down"
             @click="moveDown">
          <img :src="require('@/assets/down.svg')"/>
        </div>
        <div class="action delete"
             @click="removeFromQueue">
          <img :src="require('@/assets/delete.svg')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { defineProps } from 'vue'

  const props = defineProps({
    user: String,
    index: Number
  })

  const store = useStore()
  const list = computed(() => store.state.list);
  const viewer = computed(() => store.state.viewer);
  const isAdmin = computed(() => {
    switch (viewer?.value?.role) {
      case 'moderator':
      case 'broadcaster':
        return true;
      default:
        return false;
    }
  })

  const moveUp = async () => {
    if (props.index === 0) return;
    console.log(`promoting ${props.user}`);
    store.dispatch('setLoader', true);
    await store.dispatch('promote', props.user);
    store.dispatch('setLoader', false);
  }

  const moveDown = async () => {
    if (props.index + 1 === list.value.length) return;
    console.log(`demoting ${props.user}`);
    store.dispatch('setLoader', true);
    await store.dispatch('demote', props.user);
    store.dispatch('setLoader', false);
  }

  const removeFromQueue = async () => {
    console.log(`removing ${props.user} from queue`);
    store.dispatch('setLoader', true);
    await store.dispatch('removeFromQueue', props.user);
    store.dispatch('setLoader', false);
  }

</script>

<style scoped>
  .flex {
    display: flex;
    padding: 0 5px 5px;
    border-bottom: 1px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    margin-bottom: 5px;
  }
  .flex:last-child {
    border: none;
  }
  .index {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #bd7bff;
    line-height: 30px;
    text-align: center;
    background: radial-gradient(transparent, rebeccapurple);
  }
  .name {
    flex-grow: 1;
    line-height: 30px;
    padding-left: 10px;
  }
  .actions {
    display: flex;
    width: 90px;
    height: 30px;
    align-items: center;
  }
  .actions .action {
    width: 30px;
    height: 24px;
    text-align: center;
    cursor: pointer;
  }
</style>
