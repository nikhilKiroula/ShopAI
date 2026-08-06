import { useEffect, useState } from "react";

import Hero from "./Hero/Hero";

import { ProductGrid } from "@/components/common/Product";
import SectionHeader from "@/components/common/SectionHeader";

import { getProducts } from "@/services/product.service";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />

      {/* Flash Sale */}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="⚡ Flash Sale"
          subtitle="Limited time offers on top products"
        />

        <ProductGrid products={products.slice(0, 5)} />
      </section>

      {/* Featured Products */}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Featured Products"
          subtitle="Discover our most popular products"
        />

        <ProductGrid products={products} />
      </section>
    </>
  );
};

export default Home;
