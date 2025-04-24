# 🛒 Amazon Clone (React + Firebase + Stripe)

A full-stack eCommerce clone inspired by Amazon, built with **React**, **Firebase**, **Firestore**, and **Stripe**. 
This project demonstrates user authentication, cart functionality, order processing, and real-time payment integration — all wrapped in a responsive UI.

---

## 🚀 Live Demo

[View Deployed App](https://zaio--clone-1f5bd.web.app)

---

## Key Features

- **User Authentication**  
  Google OAuth powered by Firebase Authentication.

- **Product Catalog**  
  Product data fetched from Firestore and displayed with a modern responsive layout.

- **Shopping Cart**  
  Add, remove, and manage items — with subtotal calculations and quantity support.

- **Stripe Checkout Integration**  
  Fully secure checkout flow powered by Stripe for payment processing.

- **Order Storage**  
  Orders are saved to Firestore and associated with the authenticated user.

- **Zoom on Product Images**  
  Hover zoom feature on the single product page for detailed viewing.

- **Responsive Design**  
  Built mobile-first using modern CSS layout techniques.

---

## Tech Stack

| Frontend     | Backend / Services      | Styling       |
|--------------|-------------------------|---------------|
| React + Vite | Firebase Authentication | CSS Modules   |
| React Router | Firestore (NoSQL DB)    | Custom Styles |
| Stripe SDK   | Firebase Hosting        |               |

---


---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/MeezaanD/zaio-amazon-clone.git
cd zaio-amazon-clone

npm install

Create a .env file in the root and add your credentials:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

npm run dev