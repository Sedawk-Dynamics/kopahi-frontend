export default function ProductsPage() {
  const products = [
    {
      name: "Assam Tea",
      price: "₹499",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      name: "Black Rice",
      price: "₹699",
      img: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a",
    },
    {
      name: "Organic Honey",
      price: "₹599",
      img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    },
    {
      name: "Turmeric",
      price: "₹299",
      img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
    },
    {
      name: "Spices Mix",
      price: "₹399",
      img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    },
    {
      name: "Herbal Tea",
      price: "₹349",
      img: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05",
    },
    {
      name: "Organic Ginger",
      price: "₹249",
      img: "https://images.unsplash.com/photo-1579113800032-c38bd7635818",
    },
    {
      name: "Wild Honey Premium",
      price: "₹799",
      img: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-green-50 py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-5">Our Products</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover premium authentic products sourced directly from trusted farmers.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-8 py-8 flex flex-wrap gap-4 justify-center">
        <button className="px-5 py-2 bg-green-700 text-white rounded-full">
          All
        </button>
        <button className="px-5 py-2 bg-white rounded-full border">
          Tea
        </button>
        <button className="px-5 py-2 bg-white rounded-full border">
          Rice
        </button>
        <button className="px-5 py-2 bg-white rounded-full border">
          Honey
        </button>
        <button className="px-5 py-2 bg-white rounded-full border">
          Spices
        </button>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4"
            >
              <img
                src={item.img}
                className="h-48 w-full object-cover rounded-xl"
              />

              <h2 className="mt-4 font-semibold text-lg">{item.name}</h2>

              <p className="text-green-700 font-bold mt-2">{item.price}</p>

              <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8">
        © 2026 Kopahi
      </footer>

    </main>
  );
}