<script setup>
import {defineProps} from 'vue';


const props = defineProps({
  items: {
    type: Array
  }
})
</script>

<template>
  <div v-for="item in items" :key="item.id" class="p-5 border rounded-md border-zinc-950/10">
    <header class="text-sm font-medium text-zinc-700">
      <span>{{item.title}}</span>
    </header>
    <main class="mt-1">
      <div class="flex justify-between text-sm font-medium text-zinc-950">
        <span class="">{{item.value}}</span>
        <span :class="[item.trend > 0 ? 'text-green-600/80' : 'text-red-600/80']">{{item.trend}}%</span>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>