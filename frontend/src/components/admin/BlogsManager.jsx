import React, { useEffect, useMemo, useState } from "react";
import AdminRouteGuard from "../../components/admin/AdminRouteGuard";
import {
  fetchBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../lib/apiAdmin";

export default function AdminBlogs() {
  const courses = ['SAT', 'PSAT', 'ACT', 'IELTS', 'TOEFL'];
  const emptyForm = { title: "", slug: "", author: "", content: "", published: false };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
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
        (b.title || "").toLowerCase().includes(q) ||
        (b.slug || "").toLowerCase().includes(q) ||
        (b.author || "").toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined,
        author: form.author || "",
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
      setPage(1);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const onEdit = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      author: blog.author || "",
      content: blog.content || "",
      published: !!blog.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    setError("");
    try {
      await deleteBlog(id);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const onCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Blogs</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Blog Form */}
        <form
          onSubmit={onSubmit}
          className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={onChange}
                required
                className={`w-full rounded-md p-2 border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  form.title === "" ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Blog title"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={onChange}
                className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="auto generated if blank"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Author</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={onChange}
                className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Author name"
              />
            </div>

            <div className="flex items-center space-x-2 mt-6 md:mt-0">
              <input
                id="published"
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={onChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="font-semibold text-gray-700">
                Published
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Content <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={onChange}
              required
              rows={6}
              className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Write blog content here..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!form.title || !form.content}
              className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {editingId ? "Update Blog" : "Create Blog"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border rounded-md font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Search and Pagination Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search blogs by title, slug, or author"
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="text-gray-600 text-sm">
            {filtered.length} results &bull; Page {page} of {totalPages}
          </div>
        </div>

        {/* Blogs Table */}
        <div className="overflow-x-auto rounded-md shadow-sm">
          <table className="min-w-full bg-white divide-y divide-gray-200 rounded-md table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Published</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Published Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                paginated.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{b.title}</td>
                    <td className="px-4 py-3">{b.slug}</td>
                    <td className="px-4 py-3">{b.author || "-"}</td>
                    <td className="px-4 py-3">{b.published ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{b.publishedAt || "-"}</td>
                    <td className="px-4 py-3 space-x-4">
                      <button
                        onClick={() => onEdit(b)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(b.id)}
                        className="text-red-600 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
