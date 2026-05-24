import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwfEYe0JztVcatqsbI6vUmjizJBaSKpYQ",
    authDomain: "messi-2704f.firebaseapp.com",
    projectId: "messi-2704f",
    storageBucket: "messi-2704f.firebasestorage.app",
    messagingSenderId: "605613457448",
    appId: "1:605613457448:web:d8f4de486df83a1e3d751d",
    measurementId: "G-KHZQ294WXP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.fs = { collection, getDocs, doc, getDoc };
