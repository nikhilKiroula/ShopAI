import { Star } from "lucide-react";

const ProductRating = ({
  rating,
  ratingCount,
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <div
        className="
          flex
          items-center
          gap-1
        "
      >
        <Star
          className="
            h-4
            w-4
            fill-yellow-400
            text-yellow-400
          "
        />

        <span
          className="
            text-sm
            font-semibold
            text-gray-800
          "
        >
          {rating}
        </span>
      </div>

      <span
        className="
          text-xs
          text-gray-500
        "
      >
        ({ratingCount})
      </span>
    </div>
  );
};

export default ProductRating;