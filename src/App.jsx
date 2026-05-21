import React, { useEffect, useState } from "react";
import Product from "./assets/Product";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  // PRODUCTS STATE
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FORM STATE
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // SEARCH STATE
  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState("");

  // CART STATE
  const [showCart, setShowCart] = useState(false);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });
  // API CALL
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD PRODUCT
  const addProduct = () => {
    if (name.trim() === "" || price === "") {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
  id: Date.now(),
  title: name,
  price: Number(price),
  image: "https://i.imgur.com/QkIa5tT.png",
  category: "Custom Product",
  rating: {
    rate: 5
  }
};

    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product Added");

    setName("");
    setPrice("");
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    toast.error("Product Deleted");
  };
  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      toast.success("product addded to cart")

      // IF PRODUCT EXISTS
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item,
        );
      }

      // NEW PRODUCT
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Product removed from cart")
  };
  // UPDATE PRODUCT
  const updateProduct = (id, newPrice) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item,
      ),
    );
  };

  // SEARCH FILTER
  const filteredProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortType === "low") {
        return a.price - b.price;
      }

      if (sortType === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-4xl">Loading...</h1>
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-gray-800 min-h-screen p-10">

        <Toaster /> 
      {/* TITLE */}
      <h1 className="text-white text-4xl font-bold mb-6 text-center">
        Product Store
      </h1>
     
     <button
  onClick={() => setShowCart(!showCart)}
  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg mb-6"
>
  Cart ({cart.length})
</button>
      {/* CART COUNT */}
       


      {/* CART ITEMS */}
     {/* OVERLAY */}
{showCart && (

  <div
    className="fixed inset-0 bg-black/50 z-40"
    onClick={() => setShowCart(false)}
  ></div>

)}

{/* SIDEBAR */}
<div
  className={`fixed top-0 right-0 h-full w-[350px] bg-zinc-900 shadow-2xl p-5 z-50 transition-all duration-300
  ${showCart ? "translate-x-0" : "translate-x-full"}`}
>

  {/* CLOSE BUTTON */}
  <button
    onClick={() => setShowCart(false)}
    className="text-white text-2xl mb-6"
  >
    ✕
  </button>

  {/* TITLE */}
  <h2 className="text-white text-3xl font-bold mb-4">
    Your Cart
  </h2>

  {/* CART ITEMS */}
  <div className="space-y-4 overflow-y-auto h-[75%]">

    {cart.map(item => (

      <div
        key={item.id}
        className="bg-zinc-800 p-3 rounded-xl text-white"
      >

        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-contain bg-white rounded-lg mb-2"
        />

        <h3 className="font-bold">
          {item.name}
        </h3>

        <p>₹{item.price}</p>

        <p>
          Quantity: {item.quantity || 1}
        </p>

        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg mt-2"
        >
          Remove
        </button>

      </div>

    ))}

  </div>

  {/* TOTAL */}
  <h2 className="text-white text-2xl mt-4">
    Total: ₹{totalPrice}
  </h2>

</div>
      {/* FORM */}
      <div className="mb-6 flex justify-center items-center gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-800 text-white border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-zinc-800 text-white border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl mb-6 bg-zinc-800 text-white border border-zinc-700"
      />

      {filteredProducts.length === 0 && (
        <h1 className="text-white text-center text-2xl">No Products Found</h1>
      )}

      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="p-3 rounded-xl mb-6 bg-zinc-800 text-white border border-zinc-700"
      >
        <option value="">Sort By</option>

        <option value="low">Price: Low to High</option>

        <option value="high">Price: High to Low</option>
      </select>

      <h2 className="text-white text-2xl mb-4">Cart Items: {cart.length}</h2>
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            image={product.image}
            category={product.category}
            rating={product.rating}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
