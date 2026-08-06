import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Blog",
      "Contact",
    ],
  },
  {
    title: "Customer",
    links: [
      "Help Center",
      "Shipping",
      "Returns",
      "FAQs",
    ],
  },
  {
    title: "Categories",
    links: [
      "Electronics",
      "Fashion",
      "Beauty",
      "Gaming",
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
              <li key={link}>
                <button
                  className="
                    cursor-pointer
                    text-gray-400
                    transition-colors
                    hover:text-[#0B57D0]
                  "
                >
                  {link}
                </button>
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
          <div className="flex gap-3">
            <Mail size={18} />
            support@shopai.com
          </div>

          <div className="flex gap-3">
            <Phone size={18} />
            +91 93896 23994
          </div>

          <div className="flex gap-3">
            <MapPin size={18} />
            New Delhi, India
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;