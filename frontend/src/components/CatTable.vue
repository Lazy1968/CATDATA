<template>
  <div class="overflow-x-auto bg-base-100 rounded-box shadow">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>รูปภาพ</th>
          <th>ชื่อ</th>
          <th>เพศ / สี</th>
          <th>สายพันธุ์ / อายุ</th>
          <th>ที่อยู่</th>
          <th>สถานะ</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in cats" :key="cat.id" class="hover">
          <td>
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="cat.image_url" :alt="cat.name" @error="handleImageError" />
              </div>
            </div>
          </td>
          <td class="font-bold">{{ cat.name }}</td>
          <td>
            <div>{{ cat.gender }}</div>
            <div class="text-sm opacity-70">{{ cat.color }}</div>
          </td>
          <td>
            <div>{{ cat.breed }}</div>
            <div class="text-sm opacity-70">{{ cat.age }}</div>
          </td>
          <td class="max-w-xs truncate" :title="cat.location">{{ cat.location }}</td>
          <td>
            <div class="badge badge-sm" :class="statusBadgeClass(cat.status)">{{ cat.status }}</div>
          </td>
          <td class="text-center space-x-2">
            <button @click="$emit('edit', cat)" class="btn btn-xs btn-info">แก้ไข</button>
            <button @click="$emit('delete', cat.id)" class="btn btn-xs btn-error">ลบ</button>
          </td>
        </tr>
        <tr v-if="cats.length === 0">
          <td colspan="7" class="text-center py-8 text-base-content/50">ไม่พบข้อมูลแมว</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cats: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);

const statusBadgeClass = (status) => {
  switch (status) {
    case 'ว่าง':
    case 'หาบ้าน':
      return 'badge-success';
    case 'มีเจ้าของแล้ว':
      return 'badge-info';
    case 'ต้องการความช่วยเหลือ':
      return 'badge-warning';
    default:
      return 'badge-ghost';
  }
};

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/100x100?text=No+Img';
};
</script>
