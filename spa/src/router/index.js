import { createWebHistory, createRouter } from 'vue-router';
import ContactBook from '@/views/ContactBook.vue';
import ContactAdd from '@/views/ContactAdd.vue';
const routes = [
  {
    path: '/',
    name: 'contactbook',
    component: ContactBook
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/contacts/:id',
    name: 'contact.edit',
    component: () => import('@/views/ContactEdit.vue'),
    props: (route) => ({ contactId: route.params.id })
  },
  {
    path: '/add-contact',
    name: 'contact.add',
    component: ContactAdd
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
