// =====================================================
// AdminLayout.jsx
// =====================================================
// Ye layout component saare admin pages ke liye
// sidebar navigation provide karta hai.
//
// Structure:
//   AdminLayout
//     ├── Sidebar (Desktop: fixed left panel)
//     ├── Mobile Header (mobile hamburger + title)
//     ├── Mobile Sidebar Overlay (mobile drawer)
//     └── Main Content → <Outlet /> (nested routes)
//
// Desktop Layout:
//   [Sidebar | Main Content]
//
// Mobile Layout:
//   [Header with Hamburger]
//   [Main Content (full width)]
//   [Sliding Sidebar Drawer on hamburger click]
// =====================================================

import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  Menu,
  X,
} from "lucide-react";

// -------------------------------------------------------
// Admin Navigation Links Config
// -------------------------------------------------------
// Ek jagah se saare sidebar links define karo
// Naya link add karna ho toh sirf yahan add karo
const NAV_LINKS = [
  {
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    end: true, // exact match ke liye (isActive check)
  },
  {
    to: "/admin/products",
    icon: Package,
    label: "Products",
  },
  {
    to: "/admin/orders",
    icon: ShoppingCart,
    label: "Orders",
  },
  {
    to: "/admin/users",
    icon: Users,
    label: "Users",
  },
];

// -------------------------------------------------------
// NavLink Active Class Helper
// -------------------------------------------------------
// Component ke bahar define kiya - yeh function
// render ke waqt re-create na ho, performance better ho
const getNavLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

// -------------------------------------------------------
// SidebarContent Component
// -------------------------------------------------------
// ⚠️ IMPORTANT: AdminLayout ke BAHAR define kiya hai
// React rule: Component ko parent ke andar define mat karo
// warna har render pe naya component banta hai → state reset
//
// Props:
//   onClose - function: link click pe sidebar band karo
// -------------------------------------------------------
const SidebarContent = ({ onClose }) => (
  <div className="flex h-screen flex-col p-5">

    {/* -------------------------------------------------
        Admin Logo / Title
    ------------------------------------------------- */}
    <div className="mb-8 flex items-center gap-2">
      <Store size={26} />
      <h1 className="text-xl font-bold">ShopAI Admin</h1>
    </div>

    {/* -------------------------------------------------
        Admin Navigation Links
        NAV_LINKS array se dynamic links render karo
    ------------------------------------------------- */}
    <nav className="space-y-2">
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={getNavLinkClass}
            // Mobile pe link click ke baad sidebar band karo
            onClick={onClose}
          >
            <Icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </nav>

    {/* -------------------------------------------------
        Bottom: Back to Store Link
    ------------------------------------------------- */}
    <div className="mt-auto border-t pt-5">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        onClick={onClose}
      >
        <Store size={20} />
        <span>Back to Store</span>
      </Link>
    </div>
  </div>
);

// -------------------------------------------------------
// AdminLayout Component
// -------------------------------------------------------
const AdminLayout = () => {
  // Mobile sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar band karne ka handler
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =====================================================
          Mobile Header Bar
          =====================================================
          Mobile pe sticky header with hamburger button.
          Desktop pe hide (`md:hidden`).
      ===================================================== */}
      <header className="
        sticky top-0 z-40
        flex items-center justify-between
        border-b bg-white px-4 py-3
        md:hidden
      ">
        {/* Hamburger Button - opens mobile sidebar */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg text-gray-700
            transition hover:bg-gray-100
          "
          aria-label="Open admin sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <span className="text-base font-bold text-gray-900">
          ShopAI Admin
        </span>

        {/* Back to Store shortcut */}
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Store
        </Link>
      </header>

      <div className="flex min-h-screen">

        {/* =====================================================
            Desktop Sidebar
            =====================================================
            Desktop pe left fixed sidebar.
            Mobile pe hide (`hidden md:block`).
        ===================================================== */}
        <aside className="hidden w-64 shrink-0 border-r bg-white md:block">
          <div className="sticky top-0">
            {/* onClose = undefined on desktop (no need to close) */}
            <SidebarContent onClose={() => {}} />
          </div>
        </aside>

        {/* =====================================================
            Mobile Sidebar Overlay + Drawer
            =====================================================
            Sirf mobile pe visible hai (md:hidden).
            Hamburger click pe slide-in hota hai.
        ===================================================== */}

        {/* Dark Overlay - click se sidebar band hoga */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sliding Drawer */}
        <aside
          className={`
            fixed left-0 top-0 z-50
            h-full w-64
            border-r bg-white
            shadow-2xl
            transition-transform duration-300 ease-in-out
            md:hidden
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Close (X) Button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="
              absolute right-3 top-3
              flex h-8 w-8 items-center justify-center
              rounded-full text-gray-500
              hover:bg-gray-100
            "
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Sidebar content with close handler */}
          <SidebarContent onClose={closeSidebar} />
        </aside>

        {/* =====================================================
            Main Admin Content Area
            =====================================================
            Nested admin routes yahan <Outlet /> ke through
            render hongi.
            Desktop: sidebar ke baad flex-1 space
            Mobile: full width
        ===================================================== */}
        <main className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
