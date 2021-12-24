import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import './assets/css/main.scss';
import 'element-plus/dist/index.css';
// import vuetify from './plugins/vuetify';
import { initializeApp } from 'firebase/app';
/*import { loadFonts } from './plugins/webfontloader';

loadFonts();*/

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app');
