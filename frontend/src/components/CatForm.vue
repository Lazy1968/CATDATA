<template>
  <div class="bg-base-100 p-4 rounded-box shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-lg">{{ isEditing ? 'แก้ไขข้อมูลแมว' : 'เพิ่มข้อมูลแมวใหม่' }}</h3>
      <button v-if="isEditing" @click="resetForm" class="btn btn-sm btn-ghost text-error">ยกเลิกการแก้ไข</button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"><span class="label-text">ชื่อแมว *</span></label>
          <input v-model="formData.name" type="text" placeholder="เช่น นวล, ดำ, ส้ม" class="input input-bordered w-full input-sm" required />
        </div>
        
        <div class="form-control">
          <label class="label"><span class="label-text">สายพันธุ์ *</span></label>
          <input v-model="formData.breed" type="text" placeholder="เช่น แมวไทย" class="input input-bordered w-full input-sm" required />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">เพศ *</span></label>
          <select v-model="formData.gender" class="select select-bordered w-full select-sm" required>
            <option value="" disabled selected>เลือกเพศ</option>
            <option value="ผู้">ตัวผู้</option>
            <option value="เมีย">ตัวเมีย</option>
            <option value="ไม่ระบุ">ไม่ระบุ</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">สี</span></label>
          <input v-model="formData.color" type="text" placeholder="เช่น ส้ม, ดำ" class="input input-bordered w-full input-sm" />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">อายุ</span></label>
          <input v-model="formData.age" type="text" placeholder="เช่น 2 เดือน" class="input input-bordered w-full input-sm" />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">สถานะ *</span></label>
          <select v-model="formData.status" class="select select-bordered w-full select-sm" required>
            <option value="หาบ้าน">หาบ้าน</option>
            <option value="มีเจ้าของแล้ว">มีเจ้าของแล้ว</option>
            <option value="ต้องการความช่วยเหลือ">ต้องการความช่วยเหลือ</option>
          </select>
        </div>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">ที่อยู่ / พิกัด</span></label>
        <input v-model="formData.location" type="text" placeholder="ระบุสถานที่ที่พบ หรือที่อยู่" class="input input-bordered w-full input-sm" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">URL รูปภาพ</span></label>
        <input v-model="formData.image_url" type="url" placeholder="https://..." class="input input-bordered w-full input-sm" />
        <div v-if="formData.image_url" class="mt-2 avatar">
          <div class="w-16 rounded">
            <img :src="formData.image_url" alt="Preview" @error="handleImageError" />
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-full">{{ isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูลเข้าสู่ระบบ' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save', 'clear']);

const isEditing = ref(false);
const formData = ref({
  name: '',
  breed: '',
  gender: '',
  color: '',
  age: '',
  status: 'หาบ้าน',
  location: '',
  image_url: ''
});
const resetFormState = () => {
  formData.value = {
    name: '',
    breed: '',
    gender: '',
    color: '',
    age: '',
    status: 'หาบ้าน',
    location: '',
    image_url: ''
  };
  isEditing.value = false;
};

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
    isEditing.value = true;
  } else {
    resetFormState();
  }
}, { immediate: true });

const resetForm = () => {
  resetFormState();
  emit('clear');
};

const handleSubmit = () => {
  emit('save', { ...formData.value });
  if (!isEditing.value) {
    resetFormState(); // clear form only if adding new
  }
};

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/400x300?text=Invalid+URL';
};
</script>
