export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-8 py-12">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-10">

        <h1 className="text-4xl font-bold mb-8">
          Add New Product
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Product Name"
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            placeholder="Price"
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            placeholder="Stock Quantity"
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            placeholder="Vendor Name"
            className="border p-4 rounded-lg md:col-span-2"
          />

          <textarea
            placeholder="Product Description"
            rows={5}
            className="border p-4 rounded-lg md:col-span-2"
          ></textarea>

          <input
            type="file"
            className="border p-4 rounded-lg md:col-span-2"
          />

        </div>

        <button className="mt-8 w-full bg-green-700 text-white py-4 rounded-lg hover:bg-green-800">
          Upload Product
        </button>

      </div>

    </main>
  );
}