import React, { useEffect, useMemo, useState } from 'react';
import AdminRouteGuard from './AdminRouteGuard';
import {
  fetchBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../../lib/apiAdmin';

export default function AdminBlogs() {
  const emptyForm = { title: '', slug: '', author: '', content: '', published: false };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');

  // local UX: search and simple client-side pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setLoading(true);
    fetchBlogsAdmin()
      .then(setBlogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter(
      (b) =>
        (b.title || '').toLowerCase().includes(q) ||
        (b.slug || '').toLowerCase().includes(q) ||
        (b.author || '').toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined, // optional; backend generates if missing
        author: form.author || '',
        content: form.content,
        published: !!form.published,
      };
      if (editingId) {
        await updateBlog(editingId, payload);
      } else {
        await createBlog(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      setRefresh((r) => r + 1);
      setPage(1);
    } catch (err) {
      setError(err.message);
    }
  };

  const onEdit = (b) => {
    setEditingId(b.id);
    setForm({
      title: b.title || '',
      slug: b.slug || '',
      author: b.author || '',
      content: b.content || '',
      published: !!b.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    setError('');
    try {
      await deleteBlog(id);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const onCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        {/* Create / Edit form */}
        <form onSubmit={onSubmit} className="bg-white border rounded-lg shadow p-4 mb-8 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Blog title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug (optional)</label>
              <input
                name="slug"
                value={form.slug}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                placeholder="auto-generated if empty"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Author name"
              />
            </div>
            <div className="flex items-center gap-2 mt-6 md:mt-7">
              <input
                id="published"
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={onChange}
              />
              <label htmlFor="published" className="text-sm">Published</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 min-h-[160px]"
              placeholder="Write blog content..."
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              className="bg-r1 text-white px-4 py-2 rounded font-semibold"
              type="submit"
            >
              {editingId ? 'Update Blog' : 'Create Blog'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded px-3 py-2 w-full md:w-64"
            placeholder="Search title/slug/author"
          />
          <div className="text-sm text-gray-600">
            {filtered.length} results • Page {page} of {totalPages}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full text-left bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b">Title</th>
                  <th className="p-3 border-b">Slug</th>
                  <th className="p-3 border-b">Author</th>
                  <th className="p-3 border-b">Published</th>
                  <th className="p-3 border-b">Published At</th>
                  <th className="p-3 border-b w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="p-3">{b.title}</td>
                    <td className="p-3">{b.slug}</td>
                    <td className="p-3">{b.author || '-'}</td>
                    <td className="p-3">{b.published ? 'Yes' : 'No'}</td>
                    <td className="p-3">{b.publishedAt || '-'}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button onClick={() => onEdit(b)} className="text-blue-600 underline">Edit</button>
                        <button onClick={() => onDelete(b.id)} className="text-red-600 underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">
                      No blogs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2 justify-end mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="text-sm">Page {page} / {totalPages}</span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
