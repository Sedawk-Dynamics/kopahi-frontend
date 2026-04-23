export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">

      <section className="bg-green-50 py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">About Kopahi</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Kopahi is a premium agri-commerce platform focused on authentic,
          GI tagged and natural products from North East India.
        </p>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
          className="rounded-2xl shadow-lg h-[420px] object-cover w-full"
        />

        <div>
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-8">
            To connect farmers, vendors and customers through a trusted
            marketplace while promoting regional products globally.
          </p>

          <h2 className="text-4xl font-bold mt-10 mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-8">
            To become India’s leading agriculture-first multi vendor platform.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why We Started
        </h2>

        <div className="max-w-4xl mx-auto text-center text-gray-600 leading-8">
          Many authentic North East products never reach wider markets.
          Kopahi was created to solve this by using technology, branding
          and direct farmer access.
        </div>
      </section>

      <footer className="bg-black text-white text-center py-8">
        © 2026 Kopahi
      </footer>

    </main>
  );
}