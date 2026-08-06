import ROUTES from "./routes";

import {
  Laptop,
  Gem,
  Shirt,
  ShoppingBag,
  Smartphone,
  House,
  Brush,
  Tv,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Gift,
} from "lucide-react";

export const NAV_LINKS = [
 {
  id: 1,
  label: "Electronics",
  icon: Laptop,
  path: ROUTES.PRODUCTS,
  category: "electronics",
},
{
  id: 2,
  label: "Jewellery",
  icon: Gem,
  path: ROUTES.PRODUCTS,
  category: "jewelery",
},
{
  id: 3,
  label: "Men",
  icon: Shirt,
  path: ROUTES.PRODUCTS,
  category: "men's clothing",
},
{
  id: 4,
  label: "Women",
  icon: ShoppingBag,
  path: ROUTES.PRODUCTS,
  category: "women's clothing",
},

  // Future Categories

  {
    id: 5,
    label: "Mobiles",
    icon: Smartphone,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 6,
    label: "Home",
    icon: House,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 7,
    label: "Beauty",
    icon: Brush,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 8,
    label: "Appliances",
    icon: Tv,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 9,
    label: "Sports",
    icon: Dumbbell,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 10,
    label: "Books",
    icon: BookOpen,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 11,
    label: "Gaming",
    icon: Gamepad2,
    path: ROUTES.PRODUCTS,
    category: null,
  },
  {
    id: 12,
    label: "Offers",
    icon: Gift,
    path: ROUTES.PRODUCTS,
    category: null,
  },
];