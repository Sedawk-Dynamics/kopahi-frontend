export default function ContactPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* Hero */}
      <section className="bg-green-50 py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you. Reach out for bulk orders,
          partnerships, vendor registration or customer support.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Left */}
        <div>
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>

          <div className="space-y-6 text-lg">
            <p><strong>Email:</strong> info@kopahi.com</p>
            <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
            <p><strong>Address:</strong> Assam, India</p>
            <p><strong>Business Hours:</strong> Mon - Sat, 9 AM - 6 PM</p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
            className="mt-10 rounded-2xl shadow-lg h-72 w-full object-cover"
          />
        </div>

        {/* Right */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow">

          <h3 className="text-3xl font-bold mb-6">Send Message</h3>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border p-4 rounded-lg"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border p-4 rounded-lg"
            ></textarea>

            <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
              Submit Inquiry
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8">
        © 2026 Kopahi
      </footer>

    </main>
  );
}