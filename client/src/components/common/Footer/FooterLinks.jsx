import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", path: "/products" },
      { label: "Categories", path: "/categories" },
      { label: "Wishlist", path: "/wishlist" },
      { label: "Cart", path: "/cart" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", path: "/profile" },
      { label: "Orders", path: "/orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
];

const FooterLinks = () => {
  return (
    <div
      className="
        grid
        gap-10
        py-10
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-5 text-lg font-semibold text-white">
            {section.title}
          </h3>

          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="
                    text-gray-400
                    transition-colors
                    hover:text-[#0B57D0]
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Contact */}

      <div>
        <h3 className="mb-5 text-lg font-semibold text-white">
          Contact
        </h3>

        <div className="space-y-4 text-gray-400">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>support@shopai.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+91 93896 23994</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;