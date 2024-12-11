<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const props = defineProps({
  contactId: { type: String, required: true }
});

const router = useRouter();
const route = useRoute();
const message = ref('');
const queryClient = useQueryClient();

// Sử dụng useQuery để lấy dữ liệu liên hệ từ API
const { data: contact, error: contactError } = useQuery({
  queryKey: ['contact', props.contactId],
  queryFn: () => contactsService.fetchContact(props.contactId),
  onError: (error) => {
    console.error(error);
    router.push({
      name: 'notfound',
      params: { pathMatch: route.path.split('/').slice(1) },
      query: route.query,
      hash: route.hash
    });
  }
});

// Sử dụng useMutation để cập nhật liên hệ
const updateMutation = useMutation({
  mutationFn: (updatedContact) =>
    contactsService.updateContact(
      props.contactId,
      updatedContact instanceof FormData ? updatedContact : JSON.stringify(updatedContact)
    ),
  onSuccess: () => {
    message.value = 'Liên hệ được cập nhật thành công.';
    queryClient.invalidateQueries(['contact', props.contactId]);
  },
  onError: (error) => {
    console.error(`Error updating contact with id=${props.contactId}`, error);
    message.value = 'Có lỗi xảy ra khi cập nhật liên hệ.';
  }
});

function onUpdateContact(updatedContact) {
  updateMutation.mutate(updatedContact);
}

// Sử dụng useMutation để xóa liên hệ
const deleteMutation = useMutation({
  mutationFn: (id) => contactsService.deleteContact(id),
  onSuccess: () => {
    router.push({ name: 'contactbook' });
  },
  onError: (error) => {
    console.error(`Error deleting contact with id=${props.contactId}`, error);
  }
});

function onDeleteContact(id) {
  if (confirm('Bạn có chắc muốn xóa liên hệ này không?')) {
    deleteMutation.mutate(id);
  }
}
</script>

<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="onUpdateContact"
      @delete:contact="onDeleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
