import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Vue Query
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

// Khởi tạo QueryClient
const queryClient = new QueryClient();

// Khởi tạo ứng dụng Vue và tích hợp Vue Query
createApp(App)
  .use(router)
  .use(VueQueryPlugin, { queryClient }) // Cấu hình Vue Query với QueryClient
  .mount('#app');
