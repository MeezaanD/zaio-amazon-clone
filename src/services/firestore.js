import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";


export const createOrder = async (user, cart, total) => {
  try {
    const orderData = {
      userId: user.uid,
      products: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: total,
      createdAt: Timestamp.fromDate(new Date()),
      status: "Pending",
    };

    const orderRef = await addDoc(collection(db, "orders"), orderData);
    return orderRef.id; // Return the order ID
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
};
