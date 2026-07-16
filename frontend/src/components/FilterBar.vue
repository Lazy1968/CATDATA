<template>
  <div class="bg-base-200 p-4 rounded-box shadow-sm mb-4">
    <h3 class="font-bold text-md mb-2 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      ค้นหา & กรองข้อมูล
    </h3>
    
    <div class="space-y-3">
      <!-- Search Box -->
      <div class="form-control w-full">
        <input 
          v-model="filters.search" 
          @input="emitFilters"
          type="text" 
          placeholder="พิมพ์ค้นหาชื่อ, สายพันธุ์, ที่อยู่..." 
          class="input input-bordered input-sm w-full" 
        />
      </div>

      <!-- Filters Dropdowns -->
      <div class="grid grid-cols-2 gap-2">
        <select v-model="filters.gender" @change="emitFilters" class="select select-bordered select-sm w-full">
          <option value="">ทุกเพศ</option>
          <option value="ผู้">ตัวผู้</option>
          <option value="เมีย">ตัวเมีย</option>
          <option value="ไม่ระบุ">ไม่ระบุ</option>
        </select>

        <select v-model="filters.status" @change="emitFilters" class="select select-bordered select-sm w-full">
          <option value="">ทุกสถานะ</option>
          <option value="หาบ้าน">หาบ้าน</option>
          <option value="มีเจ้าของแล้ว">มีเจ้าของแล้ว</option>
          <option value="ต้องการความช่วยเหลือ">ต้องการความช่วยเหลือ</option>
        </select>
      </div>
      
      <div class="flex justify-between items-center mt-2">
        <!-- View Toggle -->
        <div class="join">
          <button 
            class="join-item btn btn-xs" 
            :class="{'btn-active': viewMode === 'grid'}" 
            @click="changeView('grid')"
          >
            Grid
          </button>
          <button 
            class="join-item btn btn-xs" 
            :class="{'btn-active': viewMode === 'list'}" 
            @click="changeView('list')"
          >
            Table
          </button>
        </div>

        <button v-if="hasActiveFilters" @click="clearFilters" class="btn btn-xs btn-ghost text-error">
          ล้าง
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  viewMode: {
    type: String,
    default: 'grid'
  }
});

const emit = defineEmits(['update:viewMode', 'filter']);

const filters = reactive({
  search: '',
  gender: '',
  status: ''
});

const hasActiveFilters = computed(() => {
  return filters.search !== '' || filters.gender !== '' || filters.status !== '';
});

const emitFilters = () => {
  emit('filter', { ...filters });
};

const changeView = (mode) => {
  emit('update:viewMode', mode);
};

const clearFilters = () => {
  filters.search = '';
  filters.gender = '';
  filters.status = '';
  emitFilters();
};
</script>
