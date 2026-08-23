import { NavLink, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Store,
} from "lucide-react";

// =====================================================
// Admin Layout
// =====================================================
// Saare admin pages isi layout ke andar render honge.
//
// Structure:
// AdminLayout
//    ├── Sidebar
//    └── Main Content -> <Outlet />
// =====================================================

const AdminLayout = () => {
    // -------------------------------------------------
    // Sidebar link classes
    // -------------------------------------------------
    // NavLink automatically `isActive` provide karta hai.
    // Isse active admin page ko highlight kar sakte hain.

    const getNavLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex min-h-screen">

                {/* =====================================
                    Admin Sidebar
                ===================================== */}

                <aside className="hidden w-64 shrink-0 border-r bg-white md:block">

                    {/* Sticky sidebar */}
                    <div className="sticky top-0 flex h-screen flex-col p-5">

                        {/* Admin Logo / Title */}
                        <div className="mb-8 flex items-center gap-2">
                            <Store size={26} />

                            <h1 className="text-xl font-bold">
                                ShopAI Admin
                            </h1>
                        </div>

                        {/* =============================
                            Admin Navigation
                        ============================= */}

                        <nav className="space-y-2">

                            {/* Dashboard */}
                            <NavLink
                                to="/admin"
                                end
                                className={getNavLinkClass}
                            >
                                <LayoutDashboard size={20} />

                                <span>
                                    Dashboard
                                </span>
                            </NavLink>

                            {/* Products */}
                            <NavLink
                                to="/admin/products"
                                className={getNavLinkClass}
                            >
                                <Package size={20} />

                                <span>
                                    Products
                                </span>
                            </NavLink>

                            {/* Orders */}
                            <NavLink
                                to="/admin/orders"
                                className={getNavLinkClass}
                            >
                                <ShoppingCart size={20} />

                                <span>
                                    Orders
                                </span>
                            </NavLink>

                        </nav>

                        {/* =================================
                            Bottom Section
                        ================================= */}

                        <div className="mt-auto border-t pt-5">

                            <NavLink
                                to="/"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                <Store size={20} />

                                <span>
                                    Back to Store
                                </span>
                            </NavLink>

                        </div>

                    </div>
                </aside>

                {/* =====================================
                    Main Admin Content
                ===================================== */}

                <main className="min-w-0 flex-1">

                    {/* 
                        Nested admin routes yahan render hongi.

                        /admin
                            -> Dashboard

                        /admin/products
                            -> Products

                        /admin/orders
                            -> Orders
                    */}
                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default AdminLayout;