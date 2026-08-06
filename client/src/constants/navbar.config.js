import ROUTES from "./routes";

import {
  Smartphone,
  Laptop,
  Shirt,
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
    label: "Mobiles",
    icon: Smartphone,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 2,
    label: "Electronics",
    icon: Laptop,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 3,
    label: "Fashion",
    icon: Shirt,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 4,
    label: "Home",
    icon: House,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 5,
    label: "Beauty",
    icon: Brush,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 6,
    label: "Appliances",
    icon: Tv,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 7,
    label: "Sports",
    icon: Dumbbell,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 8,
    label: "Books",
    icon: BookOpen,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 9,
    label: "Gaming",
    icon: Gamepad2,
    path: ROUTES.PRODUCTS,
  },
  {
    id: 10,
    label: "Offers",
    icon: Gift,
    path: ROUTES.PRODUCTS,
  },
];