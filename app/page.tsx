import Link from "next/link";

export default function Home() {
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
  ];

  return (
    <main className="bg-white text-gray-900">

      {/* Navbar */}
<nav className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

    {/* Logo */}
    <Link href="/" className="text-3xl font-bold text-green-700">
      Kopahi
    </Link>

    {/* Main Links */}
    <div className="hidden md:flex gap-7 font-medium text-sm items-center">

      <Link href="/">Home</Link>

      <Link href="/products">Products</Link>

      <Link href="/about">About</Link>

      <Link href="/contact">Contact</Link>

      <Link href="/b2b">B2B</Link>

      <Link href="/join">Join</Link>

      <Link href="/dashboard">Dashboard</Link>

      <Link href="/vendor">Vendor</Link>

      <Link href="/orders">Orders</Link>

      <Link href="/settings">Settings</Link>

    </div>

    {/* Login */}
    <Link
      href="/login"
      className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
    >
      Login
    </Link>

  </div>
</nav>

      {/* Hero */}
      <section className="bg-green-50 px-8 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          <div>
            <p className="text-green-700 font-semibold mb-4">
              Trusted Agri Marketplace
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Authentic Products From North East India
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              Premium GI Tagged agricultural, organic and traditional products
              sourced directly from verified farmers and vendors.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
              >
                Shop Now
              </Link>

              <Link
                href="/join"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-white"
              >
                Become Vendor
              </Link>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Farmer"
            className="rounded-3xl shadow-xl h-[460px] w-full object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-700 text-white py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-8 px-8">
          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p>Farmers</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">120+</h2>
            <p>Products</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">30+</h2>
            <p>Cities</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">1000+</h2>
            <p>Customers</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4"
            >
              <img
                src={item.img}
                className="h-48 w-full object-cover rounded-xl"
              />

              <h3 className="mt-4 font-semibold text-lg">{item.name}</h3>

              <p className="text-green-700 font-bold mt-2">
                {item.price}
              </p>

              <Link
                href="/product"
                className="mt-4 block text-center w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Kopahi?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold text-xl mb-3">
              Direct from Farmers
            </h3>
            <p className="text-gray-600">
              Transparent sourcing network.
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold text-xl mb-3">
              GI Tagged Quality
            </h3>
            <p className="text-gray-600">
              Authentic premium products.
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold text-xl mb-3">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Reliable pan India shipping.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Customers Say
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Excellent quality products.",
            "Loved the authenticity.",
            "Fast delivery and premium packaging.",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow"
            >
              <p className="text-gray-700">"{item}"</p>
              <h4 className="mt-4 font-semibold">
                Verified Buyer
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-20 text-center px-8">
        <h2 className="text-4xl font-bold mb-4">
          Join as Farmer or Vendor
        </h2>

        <p className="mb-8">
          Sell across India with Kopahi Marketplace.
        </p>

        <Link
          href="/join"
          className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-green-500">
              Kopahi
            </h2>
            <p className="mt-3 text-gray-400">
              Premium Agri Marketplace of North East India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <p><Link href="/">Home</Link></p>
            <p><Link href="/products">Products</Link></p>
            <p><Link href="/about">About</Link></p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Business</h3>
            <p><Link href="/b2b">Bulk Orders</Link></p>
            <p><Link href="/join">Become Vendor</Link></p>
            <p><Link href="/contact">Support</Link></p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <p>info@kopahi.com</p>
            <p>+91 XXXXX XXXXX</p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-10">
          © 2026 Kopahi. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}