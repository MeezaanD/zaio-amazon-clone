
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

export const fetchProductById = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);

    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product by ID from Firestore:", error);
    throw error;
  }
};
