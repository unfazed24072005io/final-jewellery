// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqDnTWFf0xluB_U41GXxCYfKsGK5QX9Ag",
  authDomain: "luxe-b95d0.firebaseapp.com",
  projectId: "luxe-b95d0",
  storageBucket: "luxe-b95d0.firebasestorage.app",
  messagingSenderId: "217781331790",
  appId: "1:217781331790:web:881aee2b3ace08f297201f",
  measurementId: "G-BJGZTH01TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Firestore Collections Reference
export const collections = {
  products: "products",
  collections: "jewellery_collections",
  blogs: "blogs",
  orders: "orders",
  users: "users"
};

// Sample data fetcher functions
export async function getProducts() {
  // This would connect to Firestore in production
  return sampleProducts;
}

export async function getCollections() {
  return sampleCollections;
}

export async function getBlogs() {
  return sampleBlogs;
}

// Sample data for demonstration
const sampleProducts = [
  {
    id: "1",
    slug: "diamond-eternity-ring",
    name: "Diamond Eternity Ring",
    price: 2999.99,
    description: "18k white gold eternity ring with brilliant cut diamonds",
    category: "Rings",
    material: "White Gold",
    images: [],
    featured: true
  },
  {
    id: "2",
    slug: "pearl-necklace",
    name: "Pearl Necklace",
    price: 1899.99,
    description: "Elegant South Sea pearl necklace with diamond clasp",
    category: "Necklaces",
    material: "Yellow Gold",
    images: [],
    featured: true
  },
  {
    id: "3",
    slug: "emerald-earrings",
    name: "Emerald Earrings",
    price: 2450.00,
    description: "Colombian emerald drop earrings with diamond accents",
    category: "Earrings",
    material: "Platinum",
    images: [],
    featured: false
  },
  {
    id: "4",
    slug: "gold-bracelet",
    name: "Italian Gold Bracelet",
    price: 3200.00,
    description: "Handcrafted Italian gold link bracelet",
    category: "Bracelets",
    material: "Yellow Gold",
    images: [],
    featured: true
  }
];

const sampleCollections = [
  {
    id: "1",
    slug: "bridal-collection",
    name: "Bridal Collection",
    description: "Timeless pieces for your special day",
    image: "",
    featured: true
  },
  {
    id: "2",
    slug: "signature-collection",
    name: "Signature Collection",
    description: "Our most iconic designs",
    image: "",
    featured: true
  },
  {
    id: "3",
    slug: "limited-edition",
    name: "Limited Edition",
    description: "Exclusive pieces for the discerning collector",
    image: "",
    featured: false
  }
];

const sampleBlogs = [
  {
    id: "1",
    slug: "guide-to-diamond-quality",
    title: "Guide to Diamond Quality: The 4 Cs",
    excerpt: "Learn how to evaluate diamond quality using the 4 Cs: Cut, Color, Clarity, and Carat.",
    date: "2024-03-15",
    image: "",
    featured: true
  },
  {
    id: "2",
    slug: "caring-for-your-jewellery",
    title: "How to Care for Your Luxury Jewellery",
    excerpt: "Essential tips to keep your precious jewellery looking its best for generations.",
    date: "2024-03-10",
    image: "",
    featured: true
  }
];