// container/Blog.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBlogs, fetchBlogBySlug } from "../lib/api"; // API functions

// --- MOTION CONFIG ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7 }
  })
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
      className="bg-w1 rounded-2xl border border-w2 shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col"
      onClick={() => onOpen(post.slug)} // use slug to fetch full blog
    >
      <img
        src={post.image}
        alt={post.title}
        className="rounded-t-2xl w-full h-56 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap mb-2 gap-2">
          {post.tags.map((tag, i) => (
            <span key={i} className="bg-g2/20 text-g2 text-xs rounded-full px-3 py-0.5">{tag}</span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-g1 mb-2">{post.title}</h2>
        <p className="text-g2 text-base mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center text-xs text-g2 mt-auto">
          {post.author} &middot; {new Date(post.date).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}

// --- BLOG MODAL COMPONENT ---
function BlogModal({ post, onClose, onReply }) {
  const [openReplies, setOpenReplies] = useState(false);
  const [reply, setReply] = useState({ name: "", comment: "" });
  const [error, setError] = useState(null);

  const handleReply = (e) => {
    e.preventDefault();
    if (reply.name.trim().length < 2 || reply.comment.trim().length < 5) {
      setError("Please fill your name and at least a 5 word reply.");
      return;
    }
    setError(null);
    onReply(post.id, { ...reply, date: new Date().toISOString().slice(0, 10) });
    setReply({ name: "", comment: "" });
    setOpenReplies(true);
  };

  return (
    <div className="fixed inset-0 z-[180] flex justify-center items-center bg-black/60 px-2 py-9">
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.35 } }}
        exit={{ scale: 0.99, opacity: 0, y: 40, transition: { duration: 0.25 } }}
        className="relative bg-w1 rounded-3xl max-w-2xl w-full shadow-2xl border border-w2"
      >
        <button
          className="absolute right-4 top-4 text-g2 hover:text-g1 text-xl"
          onClick={onClose}
          aria-label="Close post"
        >
          &times;
        </button>
        <img src={post.image} alt={post.title} className="rounded-t-3xl w-full h-60 object-cover" />
        <div className="p-8">
          <div className="flex flex-wrap mb-2 gap-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="bg-g2/20 text-g2 text-xs rounded-full px-3 py-0.5">{tag}</span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-g1 mb-1">{post.title}</h2>
          <div className="mb-3 text-xs text-g2">
            {post.author} &middot; {new Date(post.date).toLocaleDateString()}
          </div>
          <p className="text-g2 text-base mb-6 whitespace-pre-line">{post.content}</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => setOpenReplies(!openReplies)} className="text-g1 font-medium text-sm underline mb-2 self-start">
              {openReplies ? "Hide Replies" : `Show Replies (${post.replies.length})`}
            </button>
            <AnimatePresence>
              {openReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-4"
                >
                  {post.replies.length === 0 ? (
                    <span className="text-g2 text-xs">No replies yet.</span>
                  ) : (
                    <div className="space-y-2">
                      {post.replies.map((r, i) => (
                        <div key={i} className="rounded-lg border px-4 py-2 border-w2 mb-1 bg-w2">
                          <div className="text-g1 font-bold text-xs">
                            {r.name}{" "}
                            <span className="font-normal text-g2 text-[10px]">
                              ({r.date})
                            </span>
                          </div>
                          <div className="text-g2 text-sm">{r.comment}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleReply} className="mt-3 flex flex-col gap-2">
              <input
                className="px-3 py-2 rounded-lg border border-w2 text-g1 placeholder-g2 bg-w1"
                type="text"
                placeholder="Your Name"
                value={reply.name}
                onChange={(e) => setReply((r) => ({ ...r, name: e.target.value }))}
                required
              />
              <textarea
                className="px-3 py-2 rounded-lg border border-w2 text-g1 placeholder-g2 bg-w1 min-h-[56px]"
                placeholder="Leave a reply..."
                value={reply.comment}
                minLength={5}
                onChange={(e) => setReply((r) => ({ ...r, comment: e.target.value }))}
                required
              />
              {error && <span className="text-r1 text-xs">{error}</span>}
              <button
                className="self-end mt-2 px-6 py-2 rounded-full font-semibold bg-r1 text-w1 hover:bg-r2 transition text-sm"
                type="submit"
              >
                Post Reply
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// MAIN BLOG PAGE
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
        tags: b.tags || [], // backend may not have this yet
        excerpt: b.content ? b.content.slice(0, 120) + "..." : "",
        content: b.content || "",
        image: b.imageUrl || "/assets/img/blog-placeholder.jpg",
        replies: [] // placeholder until backend comments exist
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
        replies: [] // future backend integration for comments
      });
    }
  };

  const handleReply = (postId, reply) => {
    setPostsState((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, replies: [...p.replies, reply] } : p))
    );
    if (modal && modal.id === postId) {
      setModal((prev) => ({ ...prev, replies: [...prev.replies, reply] }));
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
            Posts, articles, and updates to help you on your education journey. Join the conversation by leaving a reply!
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-w1 py-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-2">
          {loading ? (
            <div className="text-center py-10">Loading blogs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            onReply={handleReply}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
