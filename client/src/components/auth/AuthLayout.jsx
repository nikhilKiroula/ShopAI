import { Link } from "react-router-dom";

import ROUTES from "@/constants/routes";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-gray-100
        to-gray-200
        p-4
      "
    >
      <div
        className="
          grid
          w-full
          max-w-4xl
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl

          lg:grid-cols-2
        "
      >
        {/* Left Side */}

        <div
          className="
            hidden
            flex-col
            justify-center
            bg-gradient-to-br
            from-[#0B57D0]
            to-blue-700
            p-8
            text-white

            lg:flex
          "
        >
          <Link
            to={ROUTES.HOME}
            className="text-3xl font-bold"
          >
            ShopAI
          </Link>

          <h2
            className="
              mt-8
              text-3xl
              font-bold
              leading-tight
            "
          >
            Smart Shopping
            <br />
            Starts Here.
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-blue-100
            "
          >
            Shop premium products with secure payments,
            fast delivery and an effortless shopping
            experience.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Premium Products",
              "Fast Delivery",
              "Secure Payments",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-white/10
                  px-4
                  py-2.5
                  backdrop-blur-sm
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    font-bold
                    text-[#0B57D0]
                  "
                >
                  ✓
                </div>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}

        <div
          className="
            flex
            items-center
            justify-center
            px-6
            py-8

            sm:px-8

            lg:px-10
          "
        >
          <div className="w-full max-w-[360px]">
            <Link
              to={ROUTES.HOME}
              className="
                mb-6
                block
                text-center
                text-3xl
                font-bold
                text-[#0B57D0]

                lg:hidden
              "
            >
              ShopAI
            </Link>

            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
              "
            >
              {title}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>

            <div className="mt-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;