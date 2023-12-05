<template>
    <div class="new-category-view">
      <Card class="new-category-card">
        <template #title>
          <h2 class="p-mb-4">New Category</h2>
        </template>
        <template #content>
          <div class="p-grid p-fluid">
            <!-- Name Input -->
            <div class="p-col-12 p-mb-3">
              <div class="field">
                <div class="p-input-icon-right">
                  <i class="pi pi-user" />
                  <InputText v-model="formData.name" id="name" class="p-inputtext" placeholder="Name" autofocus />
                </div>
              </div>
            </div>
  
            <!-- Slug Input -->
            <div class="p-col-12 p-mb-3">
              <div class="field">
                <div class="p-input-icon-right">
                  <i class="pi pi-pencil" />
                  <InputText v-model="formData.slug" id="slug" class="p-inputtext" placeholder="Slug" />
                </div>
              </div>
            </div>
  
            <!-- Icon URL Input -->
            <div class="p-col-12 p-mb-3">
              <div class="field">
                <div class="p-input-icon-right">
                  <i class="pi pi-image" />
                  <InputText v-model="formData.iconUrl" id="iconUrl" class="p-inputtext" placeholder="Icon URL" />
                </div>
              </div>
            </div>
  
            <!-- Active From Input -->
            <div class="p-col-12 p-mb-3">
              <div class="field">
                <label for="activeFrom">Active From</label>
                <Calendar v-model="formData.activeFrom" id="activeFrom" class="p-inputtext" showIcon />
              </div>
            </div>
  
            <!-- Active Until Input -->
            <div class="p-col-12 p-mb-3">
              <div class="field">
                <label for="activeUntil">Active Until</label>
                <Calendar v-model="formData.activeUntil" id="activeUntil" class="p-inputtext" showIcon />
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="p-col-12">
              <Button label="Save" @click="saveCategory" class="p-button-success" />
            </div>
          </div>
        </template>
      </Card>
       <!-- PrimeVue Toast Component -->
       <Toast ref="toast" />
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';

const formData = ref({
  name: '',
  slug: '',
  iconUrl: '',
  activeFrom: null,
  activeUntil: null,
});

const toast = useToast();

const saveCategory = () => {
  // Validate form data
  if (!formData.value.name || !formData.value.slug) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Name and Slug are required fields. Please fill them out.', life: 5000 });
    return;
  }

  // Save the form data to local storage
  localStorage.setItem('formData', JSON.stringify(formData.value));

  // Convert the data to a Blob
  const blob = new Blob([JSON.stringify(formData.value, null, 2)], { type: 'application/json' });

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'category_data.json';

  // Append the link to the document and trigger a click
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // Show success toast
  toast.add({ severity: 'success', summary: 'Success', detail: 'Download successful!', life: 3000 });
};

// Load form data from local storage on component mount
onMounted(() => {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    Object.assign(formData, JSON.parse(savedData));
  }
});
</script>

  <style>
  .new-category-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
  }

  .new-category-card {
    width: 300px;
  }

  .p-inputtext {
    width: 100%;
  }

  .field {
    margin-bottom: 15px; /* Converted from 1em to pixels */
  }

  .p-button-success {
    width: 100%;
  }

  /* Additional changes with units in pixels */
  .p-mb-3 {
    margin-bottom: 15px;
  }

  .p-col-12 {
    width: 100%;
  }

  .p-fluid {
    margin-right: -15px;
    margin-left: -15px;
  }

  .p-grid {
    margin-right: -15px;
    margin-left: -15px;
  }

  .p-input-icon-right {
    position: relative;
  }

  .pi {
    font-size: 24px; 
  }

  .p-button {
    min-width: 64px;
    padding: 8px 16px; 
    font-size: 16px;
  }
</style>