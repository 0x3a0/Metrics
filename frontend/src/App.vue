<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import SidebarLayout from '@/components/sidebars/sidebarLayout.vue';
import SidebarContent from '@/components/sidebars/sidebarContent.vue';
import LineCard from "@/components/cards/lineCard.vue";
import TreemapCard from "@/components/cards/treemapCard.vue";
import InventoryTable from '@/components/tables/inventoryTable.vue';


// 库存数据
let inventoryDatas = ref([]);
// 时间
const timeQuantum = ref("");
// 账号绑定状态
const bind = ref();
// 加载状态，默认为 true
const loading = ref(true);


// 获取绑定账号
async function getAccount() {
  try {
    const resp = await axios.get("http://localhost:9280/api/v1/user/getAccount");
    setTimeout(() => {
      if (resp.data['message']['accounts'].length > 0) {
        bind.value = true;
        loading.value = false;
      } else {
        bind.value = false;
        loading.value = false;
      }
    }, 2500)
  } catch (err) {
    console.error(err);
  }
}

// 计算当前时间
function judgeTimeQuantum() {
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
  getAccount();
  judgeTimeQuantum();
}
)
</script>

<template>
  <sidebar-layout>
    <template v-slot:sidebar-content>
      <SidebarContent></SidebarContent>
    </template>

    <template v-slot:main-content>
      <!-- 加载状态 -->
      <div v-if="loading" class="h-full flex-1 flex items-center justify-center">
        <div class="loading loading-ring loading-xl"></div>
      </div>

      <!-- 账户未绑定状态 -->
      <div v-if="bind == false" class="h-full flex-1 flex items-center justify-center">
        <span class="text-base underline hover:cursor-pointer">点我绑定Steam账户</span>
      </div>
      
    </template>
  </sidebar-layout>
</template>

<style scoped>
/* 动画定义 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease-out;
}

/* 进入前和离开后的状态：向上偏移并透明 */
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
