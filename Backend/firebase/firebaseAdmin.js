import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

initializeApp({
  credential: cert(serviceAccount),
});
