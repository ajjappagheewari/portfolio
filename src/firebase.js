/**
 * Firebase Firestore & Email Service Module for Contact Form
 * Uses Firebase Modular Web SDK v10+
 */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Read Firebase Configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Target email where messages must arrive
export const TARGET_EMAIL = "ajjappagheewari@gmail.com";

// Detect whether a valid Firebase configuration is present
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes("YOUR_") &&
  !firebaseConfig.projectId.includes("YOUR_")
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase initialization notice:", err);
  }
}

/**
 * Dispatches an email inquiry directly to ajjappagheewari@gmail.com
 * using FormSubmit AJAX API with reply-to formatting.
 */
export async function sendEmailToInbox({ name, email, subject, message }) {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || `New Portfolio Inquiry from ${name}`,
        message,
        _subject: `⚡ New Portfolio Message from ${name} (${email})`,
        _replyto: email,
        _template: "table",
        _captcha: "false"
      })
    });

    const data = await response.json().catch(() => ({}));
    return { success: response.ok, data };
  } catch (err) {
    console.warn("Direct email dispatch notice:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Submits a contact inquiry:
 * 1. Dispatches directly to ajjappagheewari@gmail.com inbox.
 * 2. Simultaneously records the document in Firebase Cloud Firestore.
 * 3. Safely backs up to localStorage.
 */
export async function submitContactMessage({ name, email, subject, message }) {
  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: (subject || "Portfolio Direct Message").trim(),
    message: message.trim(),
    userAgent: navigator.userAgent,
    submittedAt: new Date().toISOString()
  };

  // 1. Dispatch email directly to ajjappagheewari@gmail.com
  const emailPromise = sendEmailToInbox(payload);

  // 2. Simultaneously record in Cloud Firestore if configured
  let firestoreSaved = false;
  let firestoreId = null;
  let firestoreError = null;

  if (isFirebaseConfigured && db) {
    try {
      const messagesRef = collection(db, "contacts");
      const docRef = await addDoc(messagesRef, {
        ...payload,
        createdAt: serverTimestamp()
      });
      firestoreSaved = true;
      firestoreId = docRef.id;
    } catch (firebaseErr) {
      console.warn("Firestore submission warning:", firebaseErr);
      firestoreError = firebaseErr;
    }
  }

  // Await email delivery result
  const emailResult = await emailPromise;

  // 3. Local storage safety backup
  try {
    const STORAGE_KEY = "ajjappa_portfolio_messages";
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift({
      id: firestoreId || `msg_${Date.now()}`,
      ...payload,
      emailSent: emailResult.success,
      firestoreSaved
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (storageErr) {
    console.warn("Storage notice:", storageErr);
  }

  // If email was dispatched or Firestore saved, consider it delivered!
  if (emailResult.success || firestoreSaved) {
    return {
      success: true,
      id: firestoreId || `msg_${Date.now()}`,
      emailSent: emailResult.success,
      firestoreSaved,
      targetEmail: TARGET_EMAIL
    };
  }

  // If email failed AND Firestore gave a permission error, alert the user about Firestore rules
  if (firestoreError && !emailResult.success) {
    if (
      firestoreError.code === "permission-denied" ||
      firestoreError.message?.includes("insufficient permissions") ||
      firestoreError.message?.includes("Missing or insufficient permissions")
    ) {
      throw new Error(
        "Firestore Permission Denied: Your Cloud Firestore Security Rules currently deny public writes. Please update your rules in Firebase Console to allow writing to the 'contacts' collection (see firestore.rules)."
      );
    }
    throw new Error(
      firestoreError.message || `Failed to transmit message. Please try sending directly to ${TARGET_EMAIL}`
    );
  }

  return {
    success: true,
    id: `msg_${Date.now()}`,
    emailSent: false,
    firestoreSaved: false,
    targetEmail: TARGET_EMAIL
  };
}

/**
 * Returns any locally cached messages (useful for testing/demo).
 */
export function getLocalStoredMessages() {
  try {
    return JSON.parse(localStorage.getItem("ajjappa_portfolio_messages") || "[]");
  } catch {
    return [];
  }
}
