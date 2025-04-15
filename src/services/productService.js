import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const productCollection = collection(db, "products");

// Fetch all products
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(productCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), 
    }));
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    throw error;
  }
};