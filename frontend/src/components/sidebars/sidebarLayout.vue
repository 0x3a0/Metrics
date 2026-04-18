<script setup>
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <aside class="w-64 bg-gray-50 border-r border-gray-200 shrink-0">
      <slot name="sidebar-content"></slot>
    </aside>
    
    <main class="flex-1 overflow-auto p-8 bg-white">
      <slot name="main-content"></slot>
    </main>
  </div>
</template>
