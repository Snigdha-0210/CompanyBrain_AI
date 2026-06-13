import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHc9ldlZCffx4BUtfWVe31qcF1u6gTOXU",
  authDomain: "company-e28d3.firebaseapp.com",
  projectId: "company-e28d3",
  storageBucket: "company-e28d3.firebasestorage.app",
  messagingSenderId: "1041944905808",
  appId: "1:1041944905808:web:ff95b4702d7a277a38e955",
  measurementId: "G-NVXJ1LYPZ0"
};

// Initialize Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
