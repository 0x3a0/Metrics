<script setup>
import { ref } from 'vue'

const inventoryData = ref([
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', quantity: 150, status: 'In Stock', category: 'Electronics' },
  { id: 2, name: 'Smart Watch Pro', sku: 'SW-002', quantity: 45, status: 'Low Stock', category: 'Electronics' },
  { id: 3, name: 'USB-C Cable', sku: 'UC-003', quantity: 320, status: 'In Stock', category: 'Accessories' },
  { id: 4, name: 'Laptop Stand', sku: 'LS-004', quantity: 0, status: 'Out of Stock', category: 'Accessories' },
  { id: 5, name: 'Bluetooth Speaker', sku: 'BS-005', quantity: 78, status: 'In Stock', category: 'Electronics' },
  { id: 6, name: 'Phone Case', sku: 'PC-006', quantity: 12, status: 'Low Stock', category: 'Accessories' }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'In Stock':
      return 'badge-success'
    case 'Low Stock':
      return 'badge-warning'
    case 'Out of Stock':
      return 'badge-error'
    default:
      return 'badge-ghost'
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Inventory Data</h2>
      <button class="btn btn-sm btn-primary">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Item
      </button>
    </div>
    
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="table">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-gray-600 font-medium">Product Name</th>
            <th class="text-gray-600 font-medium">SKU</th>
            <th class="text-gray-600 font-medium">Category</th>
            <th class="text-gray-600 font-medium">Quantity</th>
            <th class="text-gray-600 font-medium">Status</th>
            <th class="text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventoryData" :key="item.id" class="hover:bg-gray-50">
            <td class="font-medium text-gray-900">{{ item.name }}</td>
            <td class="text-gray-500 font-mono text-sm">{{ item.sku }}</td>
            <td class="text-gray-600">{{ item.category }}</td>
            <td class="text-gray-900">{{ item.quantity }}</td>
            <td>
              <span :class="['badge badge-sm', getStatusClass(item.status)]">
                {{ item.status }}
              </span>
            </td>
            <td>
              <div class="flex items-center gap-2">
                <button class="btn btn-ghost btn-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <button class="btn btn-ghost btn-xs text-red-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
