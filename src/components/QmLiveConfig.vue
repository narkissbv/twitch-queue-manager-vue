<template>
  <div>
    <div class="power-switch">
      <qm-power-button @isActive="setIsActive" class="power-switch"/>
    </div>
    <div class="role-select">
      <select v-model="role" @change="setRole">
        <option v-for="(role, index) in roles"
                       :key="index"
                       :value="role.value">
          {{ role.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex'
  import QmPowerButton from './QmPowerButton';

  const store = useStore()

  const isActive = ref(store.state.config.isActive);
  const role = ref(store.state.config.role);

  store.watch((state) => state.config.role, () => {
    role.value = store.state.config.role;
  });
  store.watch((state) => state.config.isActive, () => {
    isActive.value = store.state.config.isActive;
  });

  const roles = ref([
    { text: 'Viewers', value: 'viewers'},
    { text: 'Subscribers', value: 'subs' },
    { text: 'Moderators', value: 'mods' }
  ]);
  const setIsActive = ( newVal ) => {
    isActive.value = newVal;
    submitConfig();
  }

  const setRole = (val) => {
    role.value = val.target.value
    submitConfig();
  }

  const submitConfig = () => {
    store.dispatch('changeConfig', {
      role: role.value,
      isActive: isActive.value
    });
  }

</script>

<style scoped>
  .power-switch {
    height: 230px;
  }
  .role-select select {
    height: 40px;
    width: 100%;
    max-width: 150px;
    font-size: 24px;
  }
</style>
