export default function CartPage() {
  const items = [
    { name: "Assam Tea", price: 499, qty: 1 },
    { name: "Black Rice", price: 699, qty: 1 },
    { name: "Organic Honey", price: 799, qty: 1 },
  ];

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="min-h-screen bg-gray-100 px-8 py-12">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">

          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="space-y-5">
            {items.map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                </div>

                <p className="font-bold text-green-700">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow p-8 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹99</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{total + 99}</span>
            </div>
          </div>

          <button className="mt-8 w-full bg-green-700 text-white py-4 rounded-lg hover:bg-green-800">
            Proceed to Checkout
          </button>

        </div>

      </div>

    </main>
  );
}