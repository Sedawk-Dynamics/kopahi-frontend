export default function JoinPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="bg-green-50 py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Join as Vendor or Farmer
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Grow your business by selling across India through Kopahi’s
          trusted agriculture marketplace.
        </p>
      </section>

      {/* Form */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow p-10">

          <h2 className="text-4xl font-bold mb-8 text-center">
            Registration Form
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Business / Farm Name"
              className="border p-4 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-4 rounded-lg"
            />

            <select className="border p-4 rounded-lg">
              <option>Select Type</option>
              <option>Vendor</option>
              <option>Farmer</option>
              <option>Wholesaler</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              className="border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Products You Sell"
              className="border p-4 rounded-lg md:col-span-2"
            />

            <textarea
              rows={5}
              placeholder="Tell us about your business"
              className="border p-4 rounded-lg md:col-span-2"
            ></textarea>

          </div>

          <button className="mt-8 w-full bg-green-700 text-white py-4 rounded-lg hover:bg-green-800">
            Submit Registration
          </button>

        </div>
      </section>

    </main>
  );
}