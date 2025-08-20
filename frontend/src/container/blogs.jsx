import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBlogs, fetchBlogBySlug } from "../lib/api";

// --- MOTION CONFIG ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7 }
  }),
};

// --- BLOG CARD COMPONENT ---
function BlogPostCard({ post, onOpen }) {
  return (
    <motion.div
      custom={post.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="bg-w1 rounded-2xl border border-w2 shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col overflow-hidden group"
      onClick={() => onOpen(post.slug)}
    >
      <img
        src={post.image}
        alt={post.title}
        className="rounded-t-2xl w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition"
      />
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap mb-2 gap-1">
          {post.tags.map((tag, i) => (
            <span key={i} className="bg-g2/20 text-g2 text-[11px] sm:text-xs rounded-full px-2 py-0.5">{tag}</span>
          ))}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-g1 mb-2 line-clamp-2">{post.title}</h2>
        <p className="text-g2 text-sm sm:text-base mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center text-xs text-g2 mt-auto">
          {post.author} &middot; {new Date(post.date).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}

// --- BLOG MODAL COMPONENT ---
function BlogModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/50 px-2 py-6 sm:py-12">
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
        exit={{ scale: 0.99, opacity: 0, y: 40, transition: { duration: 0.2 } }}
        className="relative bg-w1 rounded-3xl w-full max-w-sm sm:max-w-lg md:max-w-2xl shadow-2xl border border-w2 flex flex-col max-h-[92vh]"
      >
        <button
          className="absolute right-5 top-5 text-g2 hover:text-g1 text-2xl z-10"
          onClick={onClose}
          aria-label="Close post"
        >
          &times;
        </button>
        <img
          src={post.image}
          alt={post.title}
          className="rounded-t-3xl w-full h-40 sm:h-52 object-cover"
        />
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <div className="flex flex-wrap mb-2 gap-1">
            {post.tags.map((tag, i) => (
              <span key={i} className="bg-g2/20 text-g2 text-[11px] sm:text-xs rounded-full px-2 py-0.5">{tag}</span>
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-g1 mb-2">{post.title}</h2>
          <div className="mb-1 text-xs text-g2">
            {post.author} &middot; {new Date(post.date).toLocaleDateString()}
          </div>
          <div className="w-12 h-1 bg-r1 rounded-full mb-3" />
          <p className="text-g2 text-base whitespace-pre-line leading-relaxed">{post.content}</p>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN BLOG PAGE ---
export default function Blog() {
  const [modal, setModal] = useState(null);
  const [postsState, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs on mount
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const allPosts = await fetchBlogs();
      const mapped = allPosts.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        date: b.publishedAt || b.createdAt,
        author: b.author || "Mentor Krish Team",
        tags: b.tags || [],
        excerpt: b.content ? b.content.slice(0, 120) + "..." : "",
        content: b.content || "",
        image: b.imageUrl || "/assets/img/blog-placeholder.jpg",
      }));
      setPostsState(mapped);
      setLoading(false);
    };
    loadBlogs();
  }, []);

  // Open modal and fetch full blog by slug
  const handleOpenModal = async (slug) => {
    const blogDetail = await fetchBlogBySlug(slug);
    if (blogDetail) {
      setModal({
        id: blogDetail.id,
        slug: blogDetail.slug,
        title: blogDetail.title,
        date: blogDetail.publishedAt || blogDetail.createdAt,
        author: blogDetail.author || "Mentor Krish Team",
        tags: blogDetail.tags || [],
        excerpt: blogDetail.content ? blogDetail.content.slice(0, 120) + "..." : "",
        content: blogDetail.content || "",
        image: blogDetail.imageUrl || "/assets/img/blog-placeholder.jpg",
      });
    }
  };

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex flex-col items-center justify-center bg-w2 pt-20 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(200,200,200,0.14) 1px, transparent 2px),
              linear-gradient(to bottom, rgba(200,200,200,0.14) 1px, transparent 2px)
            `,
            backgroundSize: "34px 34px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-g1 tracking-tight">
            Blog & Insights
          </h1>
          <p className="text-g2 text-base sm:text-lg max-w-xl leading-snug">
            Posts, articles, and updates to help you on your education journey.
          </p>
        </div>
      </section>
      {/* Blog Grid */}
      <section className="bg-w1 py-10 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-2">
          {loading ? (
            <div className="text-center py-10">Loading blogs...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {postsState.map((post, i) => (
                <BlogPostCard post={post} key={post.id} onOpen={handleOpenModal} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Modal for Blog Post */}
      <AnimatePresence>
        {modal && (
          <BlogModal
            post={modal}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
