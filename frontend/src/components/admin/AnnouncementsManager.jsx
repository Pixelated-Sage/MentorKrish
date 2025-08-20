import React, { useEffect, useState } from 'react';
import AdminRouteGuard from './AdminRouteGuard';
import {
  fetchAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../../lib/apiAdmin';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAnnouncementsAdmin()
      .then(setAnnouncements)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(f => ({ ...f, image: file, imageUrl: url }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(f => ({ ...f, image: file, imageUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateAnnouncement(editId, {
          ...form,
          imageUrl: form.imageUrl // keep preview for update
        });
      } else {
        await createAnnouncement(form);
      }
      setForm({ title: '', description: '', image: null, imageUrl: '', date: '', time: '' });
      setEditId(null);
      setRefresh(r => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (a) => {
    setEditId(a.id);
    setForm({
      title: a.title || '',
      description: a.description || '',
      image: null,
      imageUrl: a.imageUrl || '',
      date: a.date || '',
      time: a.time || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    setLoading(true);
    try {
      await deleteAnnouncement(id);
      setRefresh(r => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Announcements</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg p-6 shadow-md space-y-5 border border-gray-200">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={2}
            required
            className="w-full rounded-md border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />

          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
              dragOver ? 'bg-gray-100 border-gray-400' : 'border-gray-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleImageDrop}
            onClick={() => document.getElementById('imageInput').click()}
          >
            <p className="text-gray-600 select-none">Drag & drop image here, or click to choose</p>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="mt-4 max-h-40 mx-auto rounded-md object-contain"
              />
            )}
          </div>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md disabled:opacity-50"
            >
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm({ title: '', description: '', image: null, imageUrl: '', date: '', time: '' });
                  setEditId(null);
                }}
                className="text-gray-600 underline rounded-md px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className="text-center py-6 text-gray-600">Loading announcements...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {announcements.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No announcements found.
                    </td>
                  </tr>
                ) : (
                  announcements.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">{a.title}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{a.description}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{a.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{a.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap flex gap-4">
                        <button
                          onClick={() => handleEdit(a)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-red-600 hover:underline font-medium"
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
        )}
      </div>
    </AdminRouteGuard>
  );
}
