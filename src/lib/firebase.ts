// lib/firebase.ts
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export const NEXT_ORS = process.env.NEXT_ORS;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const apps = getApps();
const app = apps.length ? apps[0]! : initializeApp(firebaseConfig);

let appCheck: any = null;

if (typeof window !== 'undefined') {
  const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  if (reCaptchaSiteKey) {
    try {
        const debugToken = process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN;
        if (debugToken) {
          (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
        }

      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(reCaptchaSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
      
      console.log('✅ Firebase App Check initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Firebase App Check:', error);
    }
  } else {
    console.warn('⚠️ reCAPTCHA site key not found. App Check not initialized.');
  }
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { appCheck };

export default app;
