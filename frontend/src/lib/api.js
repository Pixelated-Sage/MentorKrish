import { blogsData } from "../data/blogsData";
import { galleryData } from "../data/galleryData";
import { coursesData } from "../data/coursesData";

// Local Data Getters
export async function fetchAnnouncements() {
  return [];
}

export async function fetchAboutLatest() {
  return {
    title: "About Mentor Krish",
    subtitle: "Empowering Students Globally for SAT & Competitive Excellence",
    description: "Mentor Krish provides tailored education, personalized 1-on-1 mentoring, and proven test-taking strategies.",
    yearsExperience: "10+",
    studentsMentored: "1500+",
    successRate: "98%"
  };
}

export async function fetchBlogs() {
  return blogsData;
}

export async function fetchBlogBySlug(slug) {
  return blogsData.find((b) => b.id === slug) || blogsData[0];
}

export async function fetchGallery(limit = null) {
  const items = galleryData.map((item) => ({
    id: item.id,
    type: item.type || "image",
    src: item.image,
    videoUrl: item.videoUrl || null,
    title: item.title,
    description: item.caption,
    category: item.category,
    size: "medium",
    tags: [item.category, item.type]
  }));
  return limit ? items.slice(0, limit) : items;
}

export async function fetchCourses() {
  return coursesData;
}

// Contact Form API - Next.js Local Serverless API
export async function sendContactMessage(payload) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send message");
    }

    return await res.json();
  } catch (err) {
    console.error("Error sending contact message:", err);
    throw err;
  }
}

// Trial Booking API - Next.js Local Serverless API
export async function sendTrialBooking(payload) {
  try {
    const res = await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to book trial session");
    }

    return await res.json();
  } catch (err) {
    console.error("Error booking trial:", err);
    throw err;
  }
}

// Stubs for legacy backend functions
export function getAuthHeaders() { return {}; }
export async function apiFetch() { return { ok: true, json: async () => ({}) }; }
export async function loginUser() { return { success: true }; }
export async function registerUser() { return { success: true }; }
export async function verifyOtp() { return "OTP Verified"; }
export async function resendOtp() { return "OTP Sent"; }
