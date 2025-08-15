//Home announcement API function

export async function fetchAnnouncements() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`);
    if (!res.ok) {
      throw new Error(`Failed to fetch announcements: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}


// Home About API function
export async function fetchAboutLatest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/latest`);
    if (res.status === 204) {
      return null; // No about data yet
    }
    if (!res.ok) throw new Error(`Failed to fetch about: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching about section:", err);
    return null;
  }
}



//Blog API functions

export function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Centralized API fetch with auth and 401 handling
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...getAuthHeaders(),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return res;
}

export async function fetchBlogs() {
  try {
    const res = await apiFetch('/api/blogs', { method: 'GET' });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/slug/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return null;
  }
}



// gallary Api
import sample from "../../public/assets/img/dsat.jpg"; // Sample image for fallback

export async function fetchGallery(limit = null) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
    if (!res.ok) throw new Error(`Failed to fetch gallery: ${res.status}`);
    const data = await res.json();

    const mapped = data.map(item => ({
      id: item.id,
      type: 'image', // Always image, since imageEndpoint is not present
      src: item.imageUrl  
        ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}` 
        : sample, // Fallback to sample image if no URL
      title: item.title,
      description: item.description,
      category: item.tag || "uncategorized",
      size: item.layoutType || "medium",
      tags: item.tag ? item.tag.split(",").map(t => t.trim()) : []
    }));

    return limit ? mapped.slice(0, limit) : mapped;
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return [];
  }
}



// Contact Form API
export async function sendContactMessage(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
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


export async function sendTrialBooking(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to book trial");
    }

    return await res.json();
  } catch (err) {
    console.error("Error booking trial:", err);
    throw err;
  }
}



// REGISTER API
export async function registerUser(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to register user");
    }
    return await res.json();
  } catch (err) {
    console.error("Register API error:", err);
    throw err;
  }
}

// LOGIN API (for when you build the login page)
export async function loginUser(payload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    return await res.json();
  } catch (err) {
    console.error("Login API error:", err);
    throw err;
  }
}





