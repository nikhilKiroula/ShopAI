import mongoose from "mongoose";
import dotenv from "dotenv";

import { Product } from "../src/models/product.model.js";
import {User} from "../src/models/user.model.js";
dotenv.config();

const products = [
    {
        name: "iPhone 15 Pro",
        description:
            "Premium smartphone with powerful performance, advanced camera system and premium titanium design.",
        price: 89999,
        category: "mobiles",
        stock: 18,
        images: [
            {
                url: "https://images.unsplash.com/photo-1592286927505-2fd0b6a6e9a4",
                publicId: "seed-iphone-15-pro",
            },
        ],
        ratings: {
            average: 4.7,
            count: 214,
        },
        isActive: true,
    },

    {
        name: "Samsung Galaxy S24",
        description:
            "Flagship Android smartphone with a bright display, powerful processor and versatile cameras.",
        price: 74999,
        category: "mobiles",
        stock: 25,
        images: [
            {
                url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
                publicId: "seed-galaxy-s24",
            },
        ],
        ratings: {
            average: 4.6,
            count: 187,
        },
        isActive: true,
    },

    {
        name: "Cotton Hoodie",
        description:
            "Soft and comfortable cotton hoodie suitable for everyday casual wear.",
        price: 1299,
        category: "men's clothing",
        stock: 75,
        images: [
            {
                url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                publicId: "seed-cotton-hoodie",
            },
        ],
        ratings: {
            average: 4.3,
            count: 88,
        },
        isActive: true,
    },

    {
        name: "Women's Denim Jacket",
        description:
            "Classic denim jacket with a modern fit for casual everyday outfits.",
        price: 2199,
        category: "women's clothing",
        stock: 42,
        images: [
            {
                url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a",
                publicId: "seed-denim-jacket",
            },
        ],
        ratings: {
            average: 4.5,
            count: 103,
        },
        isActive: true,
    },

    {
        name: "Leather Handbag",
        description:
            "Elegant everyday handbag with spacious compartments and premium finish.",
        price: 2899,
        category: "women's clothing",
        stock: 30,
        images: [
            {
                url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
                publicId: "seed-leather-handbag",
            },
        ],
        ratings: {
            average: 4.4,
            count: 76,
        },
        isActive: true,
    },

    {
        name: "Silver Bracelet",
        description:
            "Minimal silver bracelet with an elegant design for everyday styling.",
        price: 1599,
        category: "jewelery",
        stock: 35,
        images: [
            {
                url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
                publicId: "seed-silver-bracelet",
            },
        ],
        ratings: {
            average: 4.6,
            count: 64,
        },
        isActive: true,
    },

    {
        name: "Diamond Style Earrings",
        description:
            "Elegant diamond-style earrings designed for parties and special occasions.",
        price: 2499,
        category: "jewelery",
        stock: 20,
        images: [
            {
                url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
                publicId: "seed-diamond-earrings",
            },
        ],
        ratings: {
            average: 4.7,
            count: 82,
        },
        isActive: true,
    },

    {
        name: "Smart Home Speaker",
        description:
            "Compact smart speaker with voice assistant support and rich room-filling sound.",
        price: 3499,
        category: "electronics",
        stock: 40,
        images: [
            {
                url: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
                publicId: "seed-smart-speaker",
            },
        ],
        ratings: {
            average: 4.4,
            count: 129,
        },
        isActive: true,
    },

    {
        name: "Wireless Gaming Mouse",
        description:
            "Low-latency wireless gaming mouse with precise tracking and ergonomic design.",
        price: 1499,
        category: "gaming",
        stock: 55,
        images: [
            {
                url: "https://images.unsplash.com/photo-1527814050087-3793815479db",
                publicId: "seed-gaming-mouse",
            },
        ],
        ratings: {
            average: 4.5,
            count: 98,
        },
        isActive: true,
    },

    {
        name: "Gaming Headset",
        description:
            "Immersive gaming headset with surround sound and noise-isolating ear cushions.",
        price: 2299,
        category: "gaming",
        stock: 32,
        images: [
            {
                url: "https://images.unsplash.com/photo-1599669454699-248893623440",
                publicId: "seed-gaming-headset",
            },
        ],
        ratings: {
            average: 4.3,
            count: 71,
        },
        isActive: true,
    },

    {
        name: "Yoga Mat",
        description:
            "Non-slip exercise and yoga mat with comfortable cushioning for home workouts.",
        price: 899,
        category: "sports",
        stock: 90,
        images: [
            {
                url: "https://images.unsplash.com/photo-1601925228574-9e7a2f5b8d2c",
                publicId: "seed-yoga-mat",
            },
        ],
        ratings: {
            average: 4.5,
            count: 154,
        },
        isActive: true,
    },

    {
        name: "Football",
        description:
            "Durable training football suitable for outdoor matches and practice sessions.",
        price: 799,
        category: "sports",
        stock: 65,
        images: [
            {
                url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
                publicId: "seed-football",
            },
        ],
        ratings: {
            average: 4.4,
            count: 92,
        },
        isActive: true,
    },

    {
        name: "Mechanical Engineering Book",
        description:
            "Comprehensive educational book covering important mechanical engineering concepts.",
        price: 899,
        category: "books",
        stock: 45,
        images: [
            {
                url: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
                publicId: "seed-engineering-book",
            },
        ],
        ratings: {
            average: 4.6,
            count: 57,
        },
        isActive: true,
    },

    {
        name: "Wireless Keyboard",
        description:
            "Slim wireless keyboard with comfortable keys and long battery life.",
        price: 1199,
        category: "electronics",
        stock: 70,
        images: [
            {
                url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
                publicId: "seed-wireless-keyboard",
            },
        ],
        ratings: {
            average: 4.2,
            count: 83,
        },
        isActive: true,
    },

    {
        name: "Air Fryer",
        description:
            "Digital air fryer with multiple cooking modes for quick and healthier meals.",
        price: 4999,
        category: "appliances",
        stock: 28,
        images: [
            {
                url: "https://images.unsplash.com/photo-1585515320310-259814833e62",
                publicId: "seed-air-fryer",
            },
        ],
        ratings: {
            average: 4.5,
            count: 116,
        },
        isActive: true,
    },

    {
        name: "Coffee Maker",
        description:
            "Compact coffee maker designed for convenient preparation of fresh coffee at home.",
        price: 3299,
        category: "appliances",
        stock: 34,
        images: [
            {
                url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
                publicId: "seed-coffee-maker",
            },
        ],
        ratings: {
            average: 4.4,
            count: 89,
        },
        isActive: true,
    },

    {
        name: "Face Care Kit",
        description:
            "Complete daily skincare kit designed for a simple and refreshing skincare routine.",
        price: 1299,
        category: "beauty",
        stock: 50,
        images: [
            {
                url: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
                publicId: "seed-face-care-kit",
            },
        ],
        ratings: {
            average: 4.3,
            count: 102,
        },
        isActive: true,
    },

    {
        name: "Premium Perfume",
        description:
            "Long-lasting premium fragrance with a sophisticated and refreshing scent.",
        price: 1999,
        category: "beauty",
        stock: 38,
        images: [
            {
                url: "https://images.unsplash.com/photo-1541643600914-78b084683601",
                publicId: "seed-premium-perfume",
            },
        ],
        ratings: {
            average: 4.6,
            count: 137,
        },
        isActive: true,
    },

    {
        name: "Wooden Study Table",
        description:
            "Minimal wooden study table with spacious surface for work and study.",
        price: 5499,
        category: "home",
        stock: 12,
        images: [
            {
                url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
                publicId: "seed-study-table",
            },
        ],
        ratings: {
            average: 4.5,
            count: 61,
        },
        isActive: true,
    },

    {
        name: "Decorative Table Lamp",
        description:
            "Modern decorative lamp that adds warm ambient lighting to your room.",
        price: 1499,
        category: "home",
        stock: 48,
        images: [
            {
                url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
                publicId: "seed-table-lamp",
            },
        ],
        ratings: {
            average: 4.4,
            count: 73,
        },
        isActive: true,
    },
];
const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected");

        const admin = await User.findOne({ role: "admin" });

        if (!admin) {
            throw new Error(
                "No admin user found. Please create an admin account first."
            );
        }

        const productsWithAdmin = products.map((product) => ({
            ...product,
            createdBy: admin._id,
        }));

        let insertedCount = 0;
        let skippedCount = 0;

        for (const product of productsWithAdmin) {
            const existingProduct = await Product.findOne({
                name: product.name,
                createdBy: admin._id,
            });

            if (existingProduct) {
                skippedCount++;
                continue;
            }

            await Product.create(product);
            insertedCount++;
        }

        console.log(`Products inserted: ${insertedCount}`);
        console.log(`Products skipped: ${skippedCount}`);
        console.log("Product seeding completed successfully");

        process.exit(0);
    } catch (error) {
        console.error("Product seeding failed:", error);
        process.exit(1);
    }
};seedProducts();