import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import Footer from "../../components/Footer";
import PostBody from "../PostBody";
import BlogImage from "../BlogImage";
import { posts, getPostBySlug, getRelated } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.img],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.img],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelated(slug);
  const initials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">
      <PageShell>
        <article className="flex-1">
          {/* HERO */}
          <header className="relative bg-gradient-to-br from-green-50 via-white to-green-50/40 pt-12 pb-10 md:pt-16 md:pb-14 px-6">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-green-700 font-semibold hover:underline mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all stories
              </Link>

              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                {post.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                {post.title}
              </h1>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 flex-wrap text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-500 text-white flex items-center justify-center font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-gray-500 text-xs">{post.author.role}</p>
                  </div>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-gray-600">{post.date}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-600 inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </header>

          {/* COVER IMAGE */}
          <div className="px-6 -mt-2">
            <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <BlogImage
                src={post.img}
                alt={post.title}
                category={post.category}
                fallbackText={post.title}
                className="w-full h-[280px] md:h-[480px] object-cover"
              />
            </div>
          </div>

          {/* BODY */}
          <section className="py-16 md:py-20 px-6">
            <PostBody blocks={post.body} category={post.category} />

            {/* TAGS */}
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* AUTHOR CARD */}
            <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-green-50 via-white to-green-50/40 border border-green-100 rounded-3xl p-6 md:p-8 flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-700 to-green-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-bold text-lg tracking-tight">{post.author.name}</p>
                <p className="text-sm text-green-700 font-semibold mb-2">{post.author.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Part of the team that sources, tests, and curates every product on Kopahi.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-16 md:py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-white text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
                    Keep reading
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">More from the journal</h2>
                </div>
                <Link
                  href="/blog"
                  className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-2 group"
                >
                  All stories
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:border-green-200 hover:-translate-y-1 transition-all duration-500"
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
                    <div className="p-6">
                      <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-3">
                        {p.category}
                      </span>
                      <h3 className="font-bold tracking-tight mb-2 group-hover:text-green-700 transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{p.excerpt}</p>
                      <p className="text-xs text-gray-500">{p.date} · {p.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </PageShell>
      <Footer />
    </main>
  );
}
