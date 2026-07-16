<template>
  <div class="min-h-screen bg-base-300 p-4 font-sans h-screen flex flex-col">
    <!-- Navbar (Fixed at top) -->
    <Navbar @add-cat="prepareAddCat" class="flex-none mb-4" />

    <!-- Split Screen Layout -->
    <div class="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
      
      <!-- Left Column: Controls & Form (1/3 width on desktop) -->
      <aside class="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
        <!-- Search & Filter -->
        <FilterBar 
          v-model:viewMode="viewMode" 
          @filter="updateFilters" 
        />
        
        <!-- Add/Edit Form -->
        <CatForm 
          :initial-data="editingCat"
          @save="saveCat"
          @clear="clearForm"
        />
      </aside>

      <!-- Right Column: Data Display (2/3 width on desktop) -->
      <main class="w-full lg:w-2/3 xl:w-3/4 flex flex-col bg-base-100 rounded-box shadow-inner overflow-hidden">
        <div class="p-4 border-b bg-base-200 flex justify-between items-center">
          <h2 class="text-xl font-bold">ฐานข้อมูลแมว ({{ filteredCats.length }} รายการ)</h2>
        </div>
        
        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-4 bg-base-200/50">
          
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <CatCard 
              v-for="cat in filteredCats" 
              :key="cat.id" 
              :cat="cat" 
              @edit="editCat" 
              @delete="deleteCat" 
            />
          </div>

          <!-- List View -->
          <div v-else>
            <CatTable 
              :cats="filteredCats" 
              @edit="editCat" 
              @delete="deleteCat" 
            />
          </div>

          <!-- Empty State -->
          <div v-if="filteredCats.length === 0" class="text-center py-20 text-base-content/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto mb-4 opacity-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-lg">ไม่พบข้อมูลแมวที่ตรงกับเงื่อนไข</p>
          </div>

        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import FilterBar from './components/FilterBar.vue';
import CatForm from './components/CatForm.vue';
import CatCard from './components/CatCard.vue';
import CatTable from './components/CatTable.vue';

// Mock Data
const cats = ref([
  {
    id: 1,
    name: 'ส้มจี๊ด',
    gender: 'ผู้',
    color: 'ส้ม',
    age: '2 ปี',
    breed: 'แมวไทย',
    location: 'กรุงเทพมหานคร',
    status: 'หาบ้าน',
    image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'นวล',
    gender: 'เมีย',
    color: 'ขาว-ดำ',
    age: '8 เดือน',
    breed: 'พันทาง',
    location: 'เชียงใหม่',
    status: 'มีเจ้าของแล้ว',
    image_url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'ลีโอ',
    gender: 'ผู้',
    color: 'ลายสลิด',
    age: '3 ปี',
    breed: 'อเมริกันช็อตแฮร์',
    location: 'ภูเก็ต',
    status: 'ต้องการความช่วยเหลือ',
    image_url: 'https://images.unsplash.com/photo-1536590158209-e9d615d525e4?auto=format&fit=crop&w=400&q=80'
  }
]);

const viewMode = ref('grid');
const editingCat = ref(null);
const currentFilters = ref({ search: '', gender: '', status: '' });

const filteredCats = computed(() => {
  return cats.value.filter(cat => {
    const matchSearch = cat.name.includes(currentFilters.value.search) || 
                        cat.breed.includes(currentFilters.value.search) ||
                        cat.location.includes(currentFilters.value.search);
    const matchGender = currentFilters.value.gender ? cat.gender === currentFilters.value.gender : true;
    const matchStatus = currentFilters.value.status ? cat.status === currentFilters.value.status : true;
    
    return matchSearch && matchGender && matchStatus;
  });
});

const updateFilters = (filters) => {
  currentFilters.value = filters;
};

// Handle Form & Actions
const prepareAddCat = () => {
  editingCat.value = null; // resets the form to "Add mode"
};

const editCat = (cat) => {
  editingCat.value = { ...cat };
};

const clearForm = () => {
  editingCat.value = null;
};

const saveCat = (catData) => {
  if (editingCat.value) {
    // Update
    const index = cats.value.findIndex(c => c.id === catData.id);
    if (index !== -1) {
      cats.value[index] = { ...catData, updated_at: new Date().toISOString() };
    }
  } else {
    // Create
    const newId = cats.value.length > 0 ? Math.max(...cats.value.map(c => c.id)) + 1 : 1;
    cats.value.push({ 
      ...catData, 
      id: newId,
      created_at: new Date().toISOString() 
    });
  }
  // Clear edit mode if it was editing
  editingCat.value = null;
};

const deleteCat = (id) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลแมวตัวนี้?')) {
    cats.value = cats.value.filter(cat => cat.id !== id);
    if (editingCat.value && editingCat.value.id === id) {
      editingCat.value = null; // clear form if deleting the currently edited cat
    }
  }
};
</script>
