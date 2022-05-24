<template>
  <div class="flex">
    <div class="index">
      {{ index + 1 }}
    </div>
    <div class="name">
      {{ user }}
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  defineProps({
    user: String,
    index: Number
  })

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
</style>
