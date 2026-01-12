<script setup>
import {defineProps, ref} from 'vue';


const props = defineProps({
  items: {
    type: Array
  }
})

const activeId = ref(1);
const setActiveItem = id => {
  activeId.value = id;
}
</script>

<template>
  <a href="/" v-for="item in props.items" :key="item.id" class="px-2 py-1.5 rounded-lg hover:bg-zinc-950/5" :class="[activeId === item.id ? 'bg-zinc-950/5' : '']" @click="setActiveItem(item.id)">
    <div class="flex gap-2 items-center">
      <component :is="item.icon" class="w-5 h-5"></component>
      <span class="flex-1 font-medium">{{item.title}}</span>
    </div>
  </a>
</template>

<style scoped>

</style>