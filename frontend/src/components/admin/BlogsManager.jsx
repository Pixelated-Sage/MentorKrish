import React, { useEffect, useState, useMemo } from "react";
import AdminRouteGuard from "./AdminRouteGuard";
import {
  fetchBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../lib/apiAdmin";

const emptyForm = {
  title: "",
  slug: "",
  author: "",
  content: "",
  published: false,
  image: null,
  imagePreview: null,
};

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchBlogsAdmin()
      .then(setBlogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm((f) => ({
        ...f,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingId) {
        await updateBlog(editingId, form);
      } else {
        await createBlog(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      author: blog.author || "",
      content: blog.content || "",
      published: blog.published || false,
      image: null,
      imagePreview: blog.imageUrl || null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setLoading(true);
    setError("");
    try {
      await deleteBlog(id);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = useMemo(() => blogs, [blogs]); // Implement search/filter as needed

  return (
    <AdminRouteGuard>
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <form onSubmit={onSubmit} className="mb-8 space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={onChange}
              required
              className="input"
            />
            <input
              name="slug"
              type="text"
              placeholder="Slug (auto-generated if left blank)"
              value={form.slug}
              onChange={onChange}
              className="input"
            />
            <input
              name="author"
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={onChange}
              className="input"
            />
            <div className="flex items-center space-x-2">
              <input
                id="published"
                name="published"
                type="checkbox"
                checked={form.published}
                onChange={onChange}
                className="checkbox"
              />
              <label htmlFor="published" className="select-none">Published</label>
            </div>
          </div>

          <textarea
            name="content"
            placeholder="Content"
            rows={6}
            value={form.content}
            onChange={onChange}
            required
            className="textarea"
          />

          <div className="flex flex-col items-center border-2 border-dashed rounded-lg p-4 cursor-pointer"
               onClick={() => document.getElementById('blog-image').click()}>
            <input
              id="blog-image"
              name="image"
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
            {form.imagePreview ? (
              <img src={form.imagePreview} alt="Preview" className="max-w-full max-h-48 rounded" />
            ) : (
              <p className="text-gray-500">Click or drag image here to upload</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!form.title || !form.content || loading}
              className="btn-primary"
            >
              {editingId ? "Update Blog" : "Create Blog"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="overflow-auto mt-8">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Slug</th>
                <th className="border border-gray-300 px-4 py-2">Author</th>
                <th className="border border-gray-300 px-4 py-2">Published</th>
                <th className="border border-gray-300 px-4 py-2">Published At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-100 cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.slug}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.author || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.published ? "Yes" : "No"}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.publishedAt ? new Date(blog.publishedAt).toLocaleString() : "-"}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-3">
                    <button onClick={() => onEdit(blog)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => onDelete(blog.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {filteredBlogs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">No blogs available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
