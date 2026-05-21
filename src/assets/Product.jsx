import React, { useState } from "react";

function Product({ id, name, price, image, category, rating, deleteProduct, updateProduct, addToCart }) {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  

  
  return (
<div className='text-white w-full p-4 bg-zinc-800 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300'>      <h2 className="text-xl font-bold mb-2 line-clamp-2">{name}</h2>

      <p className="text-gray-400 text-sm mb-2 capitalize">
        {category}
      </p>
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-contain bg-white rounded-xl p-4 mb-4"
      />
      <h3 className="text-2xl font-bold text-green-400">
  ₹{price}
</h3>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-400">Rating:</span>
        <span className="text-white">{rating.rate} ({rating.count})</span>
      </div>

      <div className="flex gap-2 mb-2">
        <button
          className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Toggle
        </button>

        {/* EDIT BUTTON (FIXED) */}
        <button
          className="bg-green-500 px-3 py-1 rounded hover:bg-green-700 transition"
          onClick={() => updateProduct(id, price + 100)}
        >
          Edit Price
        </button>

        {/* DELETE BUTTON */}
        <button
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
          onClick={() => deleteProduct(id)}
        >
          Delete
        </button>
      </div>

      {/* Counter */}
      <div className="flex gap-2">
        <button
          className="bg-purple-400 px-3 py-1 rounded hover:bg-purple-600 transition"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Count: {count}
        </button>

        <button
          className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-700 transition"
          onClick={() => updateProduct(id, price - 100)}
        >
          Decrease Price
        </button>

        <button
  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
  onClick={() =>
    addToCart({
      id,
      name,
      price,
      image
    })
  }
>
  Add to Cart
</button>

      </div>
    </div>
  );
}

export default Product;
