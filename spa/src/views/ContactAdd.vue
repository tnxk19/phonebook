<script setup>
import { ref } from 'vue';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const avatarFile = ref(null);
const message = ref('');
const $emit = defineEmits(['add:contact']);

const queryClient = useQueryClient();

// Sử dụng useMutation để tạo liên hệ mới
const mutation = useMutation({
  mutationFn: contactsService.createContact,
  onSuccess: () => {
    message.value = 'Liên hệ đã được thêm thành công.';
    $emit('add:contact'); // Phát tín hiệu để cập nhật danh sách liên hệ
    queryClient.invalidateQueries(['contacts']); // Làm mới danh sách liên hệ
  },
  onError: (error) => {
    console.error('Có lỗi xảy ra khi thêm liên hệ:', error);
    message.value = 'Có lỗi xảy ra khi thêm liên hệ.';
  }
});

// Hàm gọi mutation khi submit
function onAddContact(contactData) {
  mutation.mutate(contactData);
}
</script>

<template>
  <div class="page">
    <h4>Thêm Liên hệ Mới</h4>
    <ContactForm
      :contact="{ name: '', email: '', address: '', phone: '', favorite: 0, avatar: avatarFile }"
      @submit:contact="onAddContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
</style>
