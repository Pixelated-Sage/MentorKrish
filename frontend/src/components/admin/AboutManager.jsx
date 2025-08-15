import React, { useEffect, useState } from 'react';
import AdminRouteGuard from './AdminRouteGuard';
import { fetchAboutLatest, createOrUpdateAbout, deleteAbout } from '../../lib/apiAdmin';

export default function AdminAbout() {
  const [form, setForm] = useState({
    content: '',
    founderName: '',
    founderQuote: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAboutLatest();
      if (data) {
        setForm({
          content: data.content || '',
          founderName: data.founderName || '',
          founderQuote: data.founderQuote || '',
        });
        setId(data.id);
      } else {
        setForm({ content: '', founderName: '', founderQuote: '' });
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
    setError('');
    setLoading(true);
    try {
      await createOrUpdateAbout(form); // Always POST
      alert('About section saved!');
      await loadData(); // Refresh after save
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete About section?')) return;
    setError('');
    setLoading(true);
    try {
      await deleteAbout(id);
      alert('Deleted successfully');
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Manage About Section</h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border p-6 bg-white rounded-lg shadow"
          >
            <div>
              <label className="block mb-1 font-medium">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={6}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Founder Name</label>
              <input
                name="founderName"
                value={form.founderName}
                onChange={handleChange}
                type="text"
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Founder Quote</label>
              <input
                name="founderQuote"
                value={form.founderQuote}
                onChange={handleChange}
                type="text"
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              {id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded"
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
