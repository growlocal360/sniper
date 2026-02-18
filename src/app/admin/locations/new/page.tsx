"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewLocationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isHeadquarters, setIsHeadquarters] = useState(false);
  const [published, setPublished] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !address.trim() || !city.trim() || !state.trim() || !zip.trim())
      return;

    setSaving(true);
    const body = {
      name,
      address,
      city,
      state,
      zip,
      phone: phone || null,
      email: email || null,
      is_headquarters: isHeadquarters,
      published,
    };

    const res = await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/locations");
    }
    setSaving(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/locations"
          className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">
            Add Location
          </h1>
          <p className="text-tactical-400 mt-1">
            Create a new office or facility location
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="bg-tactical-900 border border-tactical-700 rounded-xl p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Location name"
              className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address"
              className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Zip
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip code"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(337) 555-0100"
              className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="location@sniperelite.com"
              className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* Is Headquarters */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is-headquarters"
              checked={isHeadquarters}
              onChange={(e) => setIsHeadquarters(e.target.checked)}
              className="h-4 w-4 rounded border-tactical-700 bg-tactical-800 text-sniper-brand focus:ring-sniper-brand/50"
            />
            <label
              htmlFor="is-headquarters"
              className="text-sm font-medium text-tactical-300"
            >
              Is Headquarters
            </label>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-tactical-300">
              Published
            </label>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                published ? "bg-sniper-brand" : "bg-tactical-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={
              saving ||
              !name.trim() ||
              !address.trim() ||
              !city.trim() ||
              !state.trim() ||
              !zip.trim()
            }
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:bg-tactical-700 disabled:text-tactical-500 text-white font-medium rounded-lg transition-colors"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {saving ? "Saving..." : "Save Location"}
          </button>
        </div>
      </div>
    </div>
  );
}
