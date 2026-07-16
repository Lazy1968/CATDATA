<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
    <figure class="relative h-48 w-full overflow-hidden">
      <img :src="cat.image_url" :alt="cat.name" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" @error="handleImageError" />
      <div class="absolute top-2 right-2">
        <div class="badge" :class="statusBadgeClass">{{ cat.status }}</div>
      </div>
    </figure>
    <div class="card-body p-4">
      <h2 class="card-title text-xl font-bold flex justify-between">
        {{ cat.name }}
        <div class="badge badge-outline">{{ cat.gender }}</div>
      </h2>
      <div class="text-sm space-y-1 mt-2 text-base-content/80">
        <p><span class="font-semibold">อายุ:</span> {{ cat.age }}</p>
        <p><span class="font-semibold">สายพันธุ์:</span> {{ cat.breed }}</p>
        <p><span class="font-semibold">สี:</span> {{ cat.color }}</p>
        <p class="truncate" :title="cat.location"><span class="font-semibold">ที่อยู่:</span> {{ cat.location }}</p>
      </div>
      <div class="card-actions justify-end mt-4">
        <button @click="$emit('edit', cat)" class="btn btn-sm btn-info btn-outline">แก้ไข</button>
        <button @click="$emit('delete', cat.id)" class="btn btn-sm btn-error btn-outline">ลบ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cat: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);

const statusBadgeClass = computed(() => {
  switch (props.cat.status) {
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
});

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/400x300?text=No+Image';
};
</script>
