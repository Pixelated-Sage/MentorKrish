import { apiFetch } from './api';

// Admin: Fetch all announcements (paginated)
export async function fetchAnnouncementsAdmin(page = 1, size = 10) {
  const res = await apiFetch(`/api/announcements?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('Failed to fetch announcements');
  return res.json();
}

// Admin: Create announcement (multipart/form-data)
export async function createAnnouncement(data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('date', data.date);
  formData.append('time', data.time);
  if (data.image) {
    formData.append('image', data.image); // must be a File or Blob
  }

  const res = await apiFetch(`/api/announcements`, {
    method: 'POST',
    body: formData
    
    // ❌ Don't set Content-Type manually — browser will set it
  });
  if (!res.ok) throw new Error('Failed to create announcement');
  return res.json();
}

// Admin: Update announcement (JSON — your backend expects AnnouncementRequest)
export async function updateAnnouncement(id, data) {
  const res = await apiFetch(`/api/announcements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update announcement');
  return res.json();
}

// Admin: Delete announcement
export async function deleteAnnouncement(id) {
  const res = await apiFetch(`/api/announcements/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete announcement');
}




// List blogs (optionally implement server-side pagination later)
export async function fetchBlogsAdmin() {
  const res = await apiFetch('/api/blogs', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function createBlog(data) {
  const res = await apiFetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
}

export async function updateBlog(id, data) {
  const res = await apiFetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
}

export async function deleteBlog(id) {
  const res = await apiFetch(`/api/blogs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete blog');
}




export async function fetchAbout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`);
  if (!res.ok) throw new Error('Failed to fetch about data');
  return res.json();
}

export async function fetchAboutLatest() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/latest`);
  if (res.status === 204) return null;
  if (!res.ok) throw new Error('Failed to fetch about data');
  return await res.json();
}

export async function createOrUpdateAbout(data) {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create/update about data: ${errorText}`);
  }
  return res.json();
}


export async function updateAbout(id, data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update about data');
  return res.json();
}

export async function deleteAbout(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete about data');
}



export async function fetchGalleryAdmin() {
  const res = await apiFetch('/api/gallery', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

// Upload a gallery item (image + meta, as FormData)
export async function uploadGalleryItem(meta, file) {
  const formData = new FormData();
  formData.append('meta', new Blob([JSON.stringify(meta)], { type: 'application/json' }));
  formData.append('file', file);
  const res = await apiFetch('/api/gallery/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload');
  return res.json();
}

// Delete gallery item
export async function deleteGalleryItem(id) {
  const res = await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
}

