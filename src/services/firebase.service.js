import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAk3wCKdd0PwtwttGI-OnPLfzpr7-ibj5Q",
  authDomain: "swap-test-marketplace.firebaseapp.com",
  projectId: "swap-test-marketplace",
  storageBucket: "swap-test-marketplace.firebasestorage.app",
  messagingSenderId: "260416824579",
  appId: "1:260416824579:web:fbbe5d22d61585ce05f536"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

class FirebaseService {
  constructor() {
    this.auth = auth;
    this.db = db;
    this.storage = storage;
  }

  // Auth methods
  async login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async register(email, password, name) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      // Store additional user data in Firestore
      await addDoc(collection(this.db, "users"), {
        uid: result.user.uid,
        email: email,
        name: name,
        createdAt: new Date().toISOString()
      });
      return result.user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout() {
    return signOut(this.auth);
  }

  onAuthChange(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  // Firestore methods
  async getItems(limit = 20) {
    try {
      const q = query(
        collection(this.db, "items"),
        orderBy("createdAt", "desc"),
        limit(limit)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting items:", error);
      return [];
    }
  }

  async addItem(itemData) {
    try {
      const docRef = await addDoc(collection(this.db, "items"), {
        ...itemData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  }

  // Storage methods
  async uploadImage(file, path) {
    const storageRef = ref(this.storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }
}

export default new FirebaseService();
