// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "emare-4aab7.firebaseapp.com",
  projectId: "emare-4aab7",
  storageBucket: "emare-4aab7.firebasestorage.app",
  messagingSenderId: "149394074239",
  appId: "1:149394074239:web:8a3c1af2db85e946ae2d4a",
  measurementId: "G-Z4J0MB43D2",
};

const app = initializeApp(firebaseConfig);

// Final sayfasının kullandığı export BU: değişmedi.
export const db = getFirestore(app);

// Analytics opsiyonel (destek varsa)
let analytics = null;
isSupported()
  .then((ok) => {
    if (ok) {
      try { analytics = getAnalytics(app); } catch {}
    }
  })
  .catch(() => {});

// Görünmez event
export function trackEntryChannel(profileKey, extra = {}) {
  try {
    if (analytics) logEvent(analytics, "entry_channel", { profileKey, ...extra });
  } catch {}
}

// Giriş logunu 'enteries' koleksiyonuna yaz
export async function saveEntryToDB({ profileKey, detectiveNo = null, caseNo = null }) {
  try {
    const ref = collection(db, "enteries");
    await addDoc(ref, {
      profileKey,
      detectiveNo,
      caseNo,
      ts: serverTimestamp(),
      href: typeof location !== "undefined" ? location.href : null,
      ua: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch {}
}

export { app };
