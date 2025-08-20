import React, { useEffect, useRef, useState } from "react";
import {
  fetchGalleryAdmin,
  uploadGalleryItem,
  deleteGalleryItem,
} from "../../lib/apiAdmin";

export default function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    tag: "",
    layoutType: "",
  });
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = React.useRef();

  useEffect(() => {
    setLoading(true);
    fetchGalleryAdmin()
      .then(setGallery)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files;
    if (f) setFile(f);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select or drop a file.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await uploadGalleryItem(form, file);
      setForm({ title: "", subtitle: "", description: "", tag: "", layoutType: "" });
      setFile(null);
      fileInput.current.value = "";
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;
    setLoading(true);
    try {
      await deleteGalleryItem(id);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold mb-8">Gallery Management</h1>

      {error && (
        <div className="mb-6 rounded bg-red-100 text-red-700 p-4 border border-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="mb-10 space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="tag"
            value={form.tag}
            onChange={handleChange}
            placeholder="Tag"
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            name="layoutType"
            value={form.layoutType}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled>
              Select layout size
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="wide">Wide</option>
            <option value="tall">Tall</option>
          </select>
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />

        {/* Drag and Drop area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInput.current.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            dragOver ? "bg-gray-100 border-red-400" : "border-gray-300"
          }`}
        >
          {file ? (
            <>
              <p className="mb-2">Selected File: {file.name}</p>
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mx-auto h-40 rounded"
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="mx-auto h-40 rounded"
                />
              )}
            </>
          ) : (
            <>
              <p className="text-gray-600">Drag & drop an image or video here</p>
              <p className="text-gray-600">or click to select file</p>
            </>
          )}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            ref={fileInput}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Media</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subtitle</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tag</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Layout</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gallery.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No gallery items found.
                </td>
              </tr>
            ) : (
              gallery.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.imageUrl.endsWith(".mp4") ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                        controls
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                        alt={item.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.subtitle}</td>
                  <td className="px-4 py-3">{item.tag}</td>
                  <td className="px-4 py-3">{item.layoutType}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
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
    </div>
  );
}
