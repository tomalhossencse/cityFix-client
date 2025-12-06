// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_api_key,
  authDomain: import.meta.env.VITE_auth_domain,
  projectId: import.meta.env.VITE_project_id,
  storageBucket: import.meta.env.VITE_storage_bucket,
  messagingSenderId: import.meta.env.VITE_messaging_sender_id,
  appId: import.meta.env.VITE_app_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
