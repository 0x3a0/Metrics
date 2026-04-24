<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (v) => ['success', 'error', 'warning'].includes(v)
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const emit = defineEmits(['close']);

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
    emit('close');
  }, props.duration);
});

const handleManualClose = () => {
  visible.value = false;
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div class="toast toast-top toast-end z-50">
      <div
        :class="[
          'alert shadow-lg transition-all duration-200',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-8px]',
          type === 'success' && 'alert-success',
          type === 'error' && 'alert-error',
          type === 'warning' && 'alert-warning'
        ]"
      >
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5" />
        </svg>
        <span>{{ message }}</span>
        <button @click="handleManualClose" class="btn btn-ghost btn-xs btn-square shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
