<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  inventories: {
    type: Array,
    required: false
  }
})
</script>

<template>
  <div class="flex flex-col h-210">
    <table class="table flex-1 text-left">
      <thead class="text-zinc-950/70 text-sm">
        <tr class="bg-zinc-950/3">
          <th class="font-medium p-3  rounded-tl-lg rounded-bl-lg">饰品名称</th>
          <th class="font-medium p-3 rounded-tr-lg rounded-br-lg text-center">价值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.inventories" :key="item.market_name">
          <td class="font-normal px-3 border-b border-zinc-950/5">{{ item.market_name }}</td>
          <td class="font-normal px-3 border-b border-zinc-950/5 text-center">{{ item.sell_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>