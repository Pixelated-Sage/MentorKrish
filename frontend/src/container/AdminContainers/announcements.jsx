import React, { useEffect, useState } from 'react';
import AdminRouteGuard from '../../components/AdminRouteGuard';
import {
  fetchAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../../lib/apiAdmin';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', date: '', time: '' });
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
      setForm((f) => ({ ...f, imageUrl: url }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateAnnouncement(editId, form);
      } else {
        await createAnnouncement(form);
      }
      setForm({ title: '', description: '', imageUrl: '', date: '', time: '' });
      setEditId(null);
      setRefresh((r) => r + 1);
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
      imageUrl: a.imageUrl || '',
      date: a.date || '',
      time: a.time || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this announcement?')) {
      setLoading(true);
      try {
        await deleteAnnouncement(id);
        setRefresh((r) => r + 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6">Manage Announcements</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-6 space-y-3 border p-4 rounded-lg shadow bg-w1">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={2}
            className="w-full px-3 py-2 border rounded"
            required
          />

          {/* Drag & Drop for Image */}
          <div
            className={`border-2 border-dashed rounded p-4 text-center ${dragOver ? 'bg-gray-100' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleImageDrop}
          >
            <p>Drag & drop image here, or click to choose</p>
            <input type="file" accept="image/*" onChange={handleImageSelect} className="mt-2" />
            {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-2 max-h-40 mx-auto" />}
          </div>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <button
            disabled={loading}
            className="bg-r1 text-w1 px-5 py-2 rounded font-semibold mt-2"
            type="submit"
          >
            {editId ? 'Update' : 'Create'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setForm({ title: '', description: '', imageUrl: '', date: '', time: '' }); setEditId(null); }}
              className="ml-4 text-sm text-gray-600 underline"
            >
              Cancel
            </button>
          )}
        </form>

        {loading ? <div>Loading...</div> : (
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Time</th>
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-2">{a.title}</td>
                  <td className="p-2">{a.description}</td>
                  <td className="p-2">{a.date}</td>
                  <td className="p-2">{a.time}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(a)} className="text-blue-600 underline">Edit</button>
                    <button onClick={() => handleDelete(a.id)} className="text-red-600 underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminRouteGuard>
  );
}
