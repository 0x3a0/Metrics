<script setup>
import {defineProps, onMounted, ref} from 'vue';


const props = defineProps([
  "webName",
])

const timeQuantum = ref(null);
const judgeTimeQuantum = () => {
  const hour = new Date().getHours();
  if (hour > 6 && hour < 12) {
    timeQuantum.value = "早上好";
  } else if  (hour >= 12 && hour < 18) {
    timeQuantum.value = "下午好"
  } else {
    timeQuantum.value = "晚上好";
  }
}

onMounted(() => {
  judgeTimeQuantum();
})
</script>

<template>
  <div class="relative flex w-full min-h-svh bg-zinc-900/3">
    <!-- Sidebar container -->
    <aside class="fixed inset-y-0 left-0 w-64">
      <div class="flex flex-col h-full">
        <!-- Sidebar header -->
        <div class="shrink-0 px-4 py-3.5">   <!-- shrink-0 防止flex item缩小 -->
          <button class="flex items-center text-base/6 text-left font-semibold">
            <img src="@/assets/logo.svg" alt="">
            <span>{{ props.webName }}</span>
          </button>
        </div>

        <!-- Sidebar content -->
        <div class="flex-1 flex flex-col overflow-y-auto p-4 gap-0.5">
          <slot name="sidebar-content"></slot>
        </div>

        <!-- Sidebar footer-->
        <div class="shrink-0 px-4 py-3.5">
          <slot name="sidebar-footer"></slot>
        </div>
      </div>
    </aside>

    <!-- skeleton-->
    <div></div>

    <!-- main -->
    <div class="flex-1 flex flex-col ml-64 pb-2 pt-2 pr-2">
      <div class="grow border border-zinc-950/10 bg-white rounded-lg shadow-xs px-10 py-9">
        <h1 class="text-2xl/6 font-semibold">{{ timeQuantum }}</h1>

        <!-- main container -->
        <slot name="main-content"></slot>
      </div>
    </div>
  </div>
</template>
