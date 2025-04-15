import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const ordersRef = collection(db, "orders");

export const storeOrder = async (order) => {
  try {
    const docRef = await addDoc(ordersRef, {
      ...order,
      createdAt: Timestamp.now(),
    });
    console.log("Order stored with ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error storing order:", err);
    throw err;
  }
};
