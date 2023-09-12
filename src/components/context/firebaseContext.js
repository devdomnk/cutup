// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4K1REaKQ_QiOplf-FPDcBG6u3ItwKCiw",
  authDomain: "cutup-austria.firebaseapp.com",
  projectId: "cutup-austria",
  storageBucket: "cutup-austria.appspot.com",
  messagingSenderId: "863467691054",
  appId: "1:863467691054:web:999ba137ef7656684c13bf",
  measurementId: "G-V9HD3W0SMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();
const functions = getFunctions(app, "europe-west1");

/* const analytics = getAnalytics(app); */

const FirebaseContext = createContext(app);
const FirestoreContext = createContext(firestore);
const StorageContext = createContext(storage);
const UserContext = createContext();
const FunctionsContext = createContext(functions);

export function useFirebaseApp() {
  return useContext(FirebaseContext);
}

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function useStorage() {
  return useContext(StorageContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function useFunctions() {
  return useContext(FunctionsContext);
}

async function signInAnonym() {
  const user = await signInAnonymously(auth);
  /* console.log(user); */
}

export default function FirebaseContextFunction({ children }) {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      /* console.log(user); */
    } else {
      signInAnonym();
    }
  });

  return (
    <FirebaseContext.Provider value={app}>
      <FirestoreContext.Provider value={firestore}>
        <StorageContext.Provider value={storage}>
          <UserContext.Provider value={user}>
            <FunctionsContext.Provider value={functions}>
              {children}
            </FunctionsContext.Provider>
          </UserContext.Provider>
        </StorageContext.Provider>
      </FirestoreContext.Provider>
    </FirebaseContext.Provider>
  );
}
