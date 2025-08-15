import { apiFetch } from './api';

// Admin: Fetch all announcements (paginated)
export async function fetchAnnouncementsAdmin(page = 1, size = 10) {
  const res = await apiFetch(`/api/announcements?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('Failed to fetch announcements');
  return res.json();
}

// Admin: Create announcement
export async function createAnnouncement(data) {
  const res = await apiFetch(`/api/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create announcement');
  return res.json();
}

// Admin: Update announcement
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
  if (!res.ok) throw new Error('Failed to fetch latest about data');
  return res.json();
}

export async function createOrUpdateAbout(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
