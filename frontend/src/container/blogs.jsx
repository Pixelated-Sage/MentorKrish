import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBlogs } from "../lib/api";
import Head from "next/head";
import { Search, Clock, Calendar, User, BookOpen, X, ArrowRight } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalPost, setModalPost] = useState(null);

  useEffect(() => {
    async function loadBlogs() {
      const data = await fetchBlogs();
      setPosts(data);
    }
    loadBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>SAT Prep Articles & Insights | Mentor Krish</title>
        <meta
          name="description"
          content="Academic insights on Digital SAT preparation, college admissions strategy, and psychometric counseling from Mentor Krish."
        />
        <link rel="canonical" href="https://mentorkrish.in/blogs" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
                <BookOpen size={14} className="text-red-600" /> Academic Knowledge Base
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                Insights & <span className="text-red-600">Test Prep</span> Articles
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Analysis on Digital SAT math strategies, adaptive testing formats, and competitive university admissions.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-red-700 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-red-700 shadow-sm"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm font-semibold">No articles match your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => setModalPost(post)}
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime || "5 min read"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-slate-600">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-red-700 group-hover:translate-x-1 transition-transform uppercase text-[11px] tracking-wider">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Modal Reader */}
        <AnimatePresence>
          {modalPost && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-200"
              >
                <button
                  onClick={() => setModalPost(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition"
                >
                  <X size={16} />
                </button>

                <div className="relative h-60 w-full bg-slate-100">
                  <img
                    src={modalPost.image}
                    alt={modalPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {modalPost.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <User size={13} className="text-red-700" /> {modalPost.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {modalPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {modalPost.readTime || "5 min read"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                    {modalPost.title}
                  </h2>

                  <div className="text-slate-700 text-xs md:text-sm whitespace-pre-line leading-relaxed space-y-3 font-normal">
                    {modalPost.content}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <a
                      href="/trial"
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-sm transition"
                    >
                      Book Free Trial Session
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
