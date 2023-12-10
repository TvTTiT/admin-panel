<template>
  <div>
  <!-- Name Input -->
    <div class="field">
      <div class="p-input-icon-right">
        <i class="pi pi-user" />
        <InputText v-model="formData.name" id="name" class="p-inputtext" placeholder="Name" autofocus autocomplete="name" />
      </div>
    </div>

  <!-- Slug Input -->
    <div class="field">
      <div class="p-input-icon-right">
        <i class="pi pi-pencil" />
        <InputText v-model="formData.slug" id="slug" class="p-inputtext" placeholder="Slug" autocomplete="slug" />
      </div>
    </div>

  <!-- Icon URL Input -->
    <div class="field">
      <div class="p-input-icon-right">
        <i class="pi pi-image" />
        <InputText v-model="formData.iconUrl" id="iconUrl" class="p-inputtext" placeholder="Icon URL" autocomplete="iconUrl" />
      </div>
    </div>

  <!-- Active From Input -->
    <div class="field">
      <label for="activeFrom">Active From</label>
      <Calendar v-model="formData.activeFrom" id="activeFrom" class="p-inputtext" showIcon autocomplete="activeFrom" />
    </div>

  <!-- Active Until Input -->
    <div class="field">
      <label for="activeUntil">Active Until</label>
      <Calendar v-model="formData.activeUntil" id="activeUntil" class="p-inputtext" showIcon autocomplete="activeUntil" />
    </div>

  <!-- Save Button -->
    <Button label="Save & Download" @click="saveCategory" class="p-button-success" />
  </div>
</template>
  
  
<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import supabase from '../lib/supabase';

const formData = ref({
  name: '',
  slug: '',
  iconUrl: '',
  activeFrom: null,
  activeUntil: null,
});

const toast = useToast();

const saveCategory = async () => {
  // Validate form data
  if (!formData.value.name || !formData.value.slug) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Name and Slug are required fields. Please fill them out.', life: 5000 });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('Categories')
      .insert([
        {
          name: formData.value.name,
          slug: formData.value.slug,
          iconUrl: formData.value.iconUrl,
          activeFrom: formData.value.activeFrom,
          activeUntil: formData.value.activeUntil,
          createdAt: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to save category.', life: 5000 });
    } else {
      console.log('Data inserted successfully:', data);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Category saved successfully.', life: 5000 });

      // Reset form data after successful submission
      formData.value = {
        name: '',
        slug: '',
        iconUrl: '',
        activeFrom: null,
        activeUntil: null,
      };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred.', life: 5000 });
  }
};

  
  </script>
  
  <style scoped>
  .p-inputtext {
    width: 100%;
  }
  
  .field {
    margin-bottom: 15px; 
  }
  
  .p-button-success {
    width: 100%;
  }
  
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