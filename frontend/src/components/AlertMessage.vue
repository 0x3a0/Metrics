<script setup>
defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning'].includes(value)
  },
  message: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div role="alert" :class="['alert alert-soft rounded-lg', 'alert-' + type]">
    <!-- Success Icon -->
    <svg 
      v-if="type === 'success'" 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6 shrink-0 stroke-current" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    
    <!-- Error Icon -->
    <svg 
      v-else-if="type === 'error'" 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6 shrink-0 stroke-current" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    
    <!-- Warning Icon -->
    <svg 
      v-else-if="type === 'warning'" 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6 shrink-0 stroke-current" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5" />
    </svg>
    
    <span>{{ message }}</span>
  </div>
</template>