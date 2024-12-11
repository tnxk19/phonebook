<script setup>
import contactsService from '@/services/contacts.service'; // Import toàn bộ object
import { ref, onMounted, computed } from 'vue'; // Import thêm ref và onMounted

const selectedIndex = ref(-1);
const page = ref(1);
const limit = ref(10);

const props = defineProps({
  contacts: {
    type: Array,
    default: () => []
  }
});

const contacts = computed(() => props.contacts);

onMounted(async () => {
  const data = await contactsService.getContacts(page.value, limit.value); // Truy cập hàm getContacts từ contactsService
  contacts.value = data.contacts;
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item px-3"
      v-for="(contact, index) in contacts"
      :class="{ active: index === selectedIndex }"
      :key="contact.id"
      @click="$emit('update:selectedIndex', index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

