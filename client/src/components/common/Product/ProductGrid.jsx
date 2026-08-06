import { ProductCard } from "./";

const ProductGrid = ({ products }) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4

        md:grid-cols-3

        lg:grid-cols-4

        xl:grid-cols-5
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;