export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-8 py-12">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Platform Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Configure marketplace preferences and business rules.
          </p>
        </div>

        <div className="space-y-8">

          {/* General */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-6">
              General Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Platform Name"
                className="border p-4 rounded-lg"
                defaultValue="Kopahi"
              />

              <input
                type="email"
                placeholder="Support Email"
                className="border p-4 rounded-lg"
                defaultValue="info@kopahi.com"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="border p-4 rounded-lg"
              />

              <input
                type="text"
                placeholder="Default Currency"
                className="border p-4 rounded-lg"
                defaultValue="INR"
              />
            </div>
          </div>

          {/* Business */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-6">
              Business Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Commission %"
                className="border p-4 rounded-lg"
                defaultValue="10"
              />

              <input
                type="text"
                placeholder="GST %"
                className="border p-4 rounded-lg"
                defaultValue="18"
              />

              <input
                type="text"
                placeholder="Shipping Charge"
                className="border p-4 rounded-lg"
                defaultValue="99"
              />

              <input
                type="text"
                placeholder="Free Shipping Above"
                className="border p-4 rounded-lg"
                defaultValue="999"
              />
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-6">
              Security Settings
            </h2>

            <div className="space-y-4">
              <label className="flex gap-3 items-center">
                <input type="checkbox" defaultChecked />
                Enable Two Factor Authentication
              </label>

              <label className="flex gap-3 items-center">
                <input type="checkbox" defaultChecked />
                Email Alerts for Admin Login
              </label>

              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                Auto Approve Vendors
              </label>
            </div>
          </div>

          {/* Save */}
          <button className="w-full bg-green-700 text-white py-4 rounded-lg hover:bg-green-800">
            Save Settings
          </button>

        </div>

      </div>

    </main>
  );
}