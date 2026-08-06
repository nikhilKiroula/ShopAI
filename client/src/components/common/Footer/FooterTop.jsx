import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import ROUTES from "@/constants/routes";

const socialLinks = [
  {
    id: 1,
    icon: FaGithub,
    href: "https://github.com/",
  },
  {
    id: 2,
    icon: FaLinkedin,
    href: "https://linkedin.com/",
  },
  {
    id: 3,
    icon: FaInstagram,
    href: "https://instagram.com/",
  },
  {
    id: 4,
    icon: FaXTwitter,
    href: "https://twitter.com/",
  },
];

const FooterTop = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-8
        border-b
        border-gray-800
        pb-10

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Brand */}

      <div className="max-w-md">
        <Link
          to={ROUTES.HOME}
          className="text-3xl font-bold text-white"
        >
          Shop<span className="text-[#0B57D0]">AI</span>
        </Link>

        <p className="mt-4 leading-7 text-gray-400">
          One destination for all your shopping needs.
          Discover quality products with a modern,
          fast and secure shopping experience.
        </p>
      </div>

      {/* Social */}

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Follow Us
        </h3>

        <div className="flex gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-900
                  text-gray-300
                  transition-all
                  duration-200
                  hover:bg-[#0B57D0]
                  hover:text-white
                  hover:-translate-y-1
                "
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FooterTop;