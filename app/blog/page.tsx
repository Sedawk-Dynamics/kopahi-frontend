"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageShell from "../components/PageShell";
import Footer from "../components/Footer";
import { posts, categories } from "./posts";
import BlogImage from "./BlogImage";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let data =
      activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
    const q = search.trim().toLowerCase();
    if (q) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return data;
  }, [activeCategory, search]);

  const showFeature = activeCategory === "All" && !search.trim();
  const [feature, ...rest] = filtered;

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">
      <PageShell>
        <section className="bg-gradient-to-br from-green-50 via-white to-green-50/40 py-16 md:py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute top-10 -left-16 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 -right-16 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.35em] text-green-700 font-semibold text-sm mb-3">
              The Kopahi Journal
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Stories from the field</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-lg leading-relaxed">
              Recipes, farmer features, harvest notes and the occasional rant about why packaging matters.
            </p>

            {/* SEARCH */}
            <div className="mt-10 max-w-xl mx-auto relative">
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories, tags, recipes..."
                className="w-full pl-14 pr-5 py-4 rounded-2xl text-gray-900 placeholder:text-gray-500 bg-white shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
              />
            </div>
          </div>
        </section>

        {/* CATEGORY CHIPS */}
        <section className="bg-white py-6 border-b border-gray-100 sticky top-[136px] z-30">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 justify-center">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition border ${
                  activeCategory === cat
                    ? "bg-green-700 text-white border-green-700 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 flex-1">
          <div className="max-w-7xl mx-auto">

            {filtered.length === 0 && (
              <div className="bg-white rounded-3xl border border-gray-100 py-20 px-6 text-center shadow-sm max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories match your search</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Try a different keyword or clear the filters.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition"
                >
                  Reset filters
                </button>
              </div>
            )}

            {showFeature && filtered.length > 0 && (
              <Link
                href={`/blog/${feature.slug}`}
                className="group grid md:grid-cols-2 gap-8 items-center mb-16"
              >
                <div className="relative h-72 md:h-[460px] rounded-3xl overflow-hidden shadow-xl">
                  <BlogImage
                    src={feature.img}
                    alt={feature.title}
                    category={feature.category}
                    fallbackText={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                    Featured · {feature.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-5">{feature.excerpt}</p>
                  <p className="text-sm text-gray-500">
                    {feature.date} · {feature.readTime} min read · {feature.author.name}
                  </p>
                </div>
              </Link>
            )}

            {filtered.length > 0 && (
              <>
                {!showFeature && (
                  <p className="text-sm text-gray-600 mb-6">
                    Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                    {filtered.length === 1 ? "story" : "stories"}
                    {activeCategory !== "All" && (
                      <> in <span className="font-semibold text-green-700">{activeCategory}</span></>
                    )}
                    {search.trim() && (
                      <> for &ldquo;<span className="font-semibold text-gray-900">{search}</span>&rdquo;</>
                    )}
                  </p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {(showFeature ? rest : filtered).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:border-green-200 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <BlogImage
                          src={p.img}
                          alt={p.title}
                          category={p.category}
                          fallbackText={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block self-start px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-3">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-lg tracking-tight mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{p.excerpt}</p>
                        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                          <span>{p.author.name}</span>
                          <span>{p.readTime} min · {p.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Get new stories in your inbox</h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                One email a month. Recipes, harvest notes, and the occasional 10% off coupon.
              </p>
              <Link
                href="/#newsletter"
                className="inline-block bg-white text-green-800 hover:bg-green-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </main>
  );
}
