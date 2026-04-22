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
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Inventory Data</h2>
        <p class="text-sm text-gray-500 mt-0.5">Manage your product inventory</p>
      </div>
      <button class="btn btn-sm bg-gray-900 text-white hover:bg-gray-800 border-0">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Item
      </button>
    </div>

    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">SKU</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="item in inventoryData"
              :key="item.id"
              class="hover:bg-gray-50/50 transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <div class="font-medium text-gray-900">{{ item.name }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded inline-block">{{ item.sku }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-600">{{ item.category }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="font-medium text-gray-900">{{ item.quantity.toLocaleString() }}</div>
              </td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                    'bg-rose-50 text-rose-700'
                  ]"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-1.5">
                  <button class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                  </button>
                  <button class="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors">
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

      <div class="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Showing <span class="font-medium">6</span> of <span class="font-medium">6</span> items
          </div>
          <div class="flex items-center gap-2">
            <button class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
