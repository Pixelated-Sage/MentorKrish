import React, { useEffect, useState } from "react";
import AdminRouteGuard from "./AdminRouteGuard";
import {
  fetchAboutLatest,
  createOrUpdateAbout,
  deleteAbout,
} from "../../lib/apiAdmin";

export default function AdminAbout() {
  const [form, setForm] = useState({
    content: "",
    founderName: "",
    founderQuote: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAboutLatest();
      if (data) {
        setForm({
          content: data.content || "",
          founderName: data.founderName || "",
          founderQuote: data.founderQuote || "",
        });
        setId(data.id);
      } else {
        setForm({ content: "", founderName: "", founderQuote: "" });
        setId(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createOrUpdateAbout(form);
      alert("About section saved!");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete the About section?")) return;
    setError("");
    setLoading(true);
    try {
      await deleteAbout(id);
      alert("Deleted successfully");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Manage About Section</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-700">Content</label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={6}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                placeholder="Write about your institution, mission, etc."
              />
            </div>

            <div>
              <label htmlFor="founderName" className="block text-sm font-medium mb-2 text-gray-700">Founder Name</label>
              <input
                type="text"
                id="founderName"
                name="founderName"
                value={form.founderName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter founder’s full name"
              />
            </div>

            <div>
              <label htmlFor="founderQuote" className="block text-sm font-medium mb-2 text-gray-700">Founder Quote</label>
              <input
                type="text"
                id="founderQuote"
                name="founderQuote"
                value={form.founderQuote}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Inspirational quote from the founder"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-700 transition"
              >
                Save
              </button>
              {id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-300 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </AdminRouteGuard>
  );
}
