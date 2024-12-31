import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = require("@/service_key.json");

const adminApp: App =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceKey) })
    : getApp();

const adminDb = getFirestore(adminApp);

export { adminApp, adminDb };
