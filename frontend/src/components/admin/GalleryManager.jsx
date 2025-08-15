import React, { useEffect, useRef, useState } from 'react';
import { fetchGalleryAdmin, uploadGalleryItem, deleteGalleryItem } from '../../lib/apiAdmin';

export default function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    tag: '',
    layoutType: '',
  });
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef();

  // Fetch gallery
  useEffect(() => {
    setLoading(true);
    fetchGalleryAdmin()
      .then(setGallery)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return setError('Please select or drop a file.');
    setLoading(true);
    setError('');
    try {
      await uploadGalleryItem(form, file);
      setForm({ title: '', subtitle: '', description: '', tag: '', layoutType: '' });
      setFile(null);
      fileInput.current.value = '';
      setRefresh(r => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine row span for masonry layout
  const getSizeClass = (size) => {
    return `
      ${size === 'small' ? 'row-span-2' :
        size === 'medium' ? 'row-span-3' :
        size === 'large' ? 'row-span-4' :
        size === 'wide' ? 'row-span-3' :
        size === 'tall' ? 'row-span-4' : 'row-span-3'}
      sm:${
        size === 'small' ? 'row-span-2' :
        size === 'medium' ? 'row-span-3' :
        size === 'large' ? 'row-span-4' :
        size === 'wide' ? 'row-span-3' :
        size === 'tall' ? 'row-span-4' : 'row-span-3'
      }
      xs:row-span-2
    `;
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this gallery item?')) return;
    setLoading(true);
    try {
      await deleteGalleryItem(id);
      setRefresh(r => r + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallery Management</h1>
      {error && <div className="mb-3 text-red-600">{error}</div>}

      <form onSubmit={handleUpload} className="mb-8 p-4 border rounded bg-white space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-3 py-2" required />
          <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" className="border rounded px-3 py-2" />
          <input name="tag" value={form.tag} onChange={handleChange} placeholder="Tag" className="border rounded px-3 py-2" />
          <select
            name="layoutType"
            value={form.layoutType}
            onChange={handleChange}
            required
            className="border rounded p-2"
          >
            <option value="" disabled>Select layout size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="wide">Wide</option>
            <option value="tall">Tall</option>
          </select>
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded w-full px-3 py-2" />

        {/* Drag & Drop File */}
        <div
          className={`border-2 border-dashed rounded p-4 text-center ${dragOver ? 'bg-gray-100' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInput.current.click()}
          style={{ cursor: 'pointer' }}
        >
          {file ? (
            <div>
              <p>Selected: {file.name}</p>
              {file.type.startsWith('image/') && <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 max-h-40 mx-auto" />}
              {file.type.startsWith('video/') && <video src={URL.createObjectURL(file)} controls className="mt-2 max-h-40 mx-auto" />}
            </div>
          ) : (
            <div>
              <p>Drag & drop image/video here, or click to choose</p>
              <input type="file" accept="image/*,video/*" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          )}
        </div>

        <button disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">
          {loading ? "Uploading..." : "Upload to Gallery"}
        </button>
      </form>

      {/* Gallery Table */}
      <div className="border rounded bg-white shadow">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b">Media</th>
              <th className="px-3 py-2 border-b">Title</th>
              <th className="px-3 py-2 border-b">Subtitle</th>
              <th className="px-3 py-2 border-b">Tag</th>
              <th className="px-3 py-2 border-b">Layout</th>
              <th className="px-3 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.map(g => (
              <tr key={g.id} className="border-b">
                <td className="px-3 py-2">
                  {g.imageUrl.endsWith('.mp4') ? (
                    <video src={`${process.env.NEXT_PUBLIC_API_URL}${g.imageUrl}`} controls className="h-16 w-16 object-cover rounded" />
                  ) : (
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}${g.imageUrl}`} alt={g.title} className="h-16 w-16 object-cover rounded" />
                  )}
                </td>
                <td className="px-3 py-2">{g.title}</td>
                <td className="px-3 py-2">{g.subtitle}</td>
                <td className="px-3 py-2">{g.tag}</td>
                <td className="px-3 py-2">{g.layoutType}</td>
                <td className="px-3 py-2">
                  <button onClick={() => handleDelete(g.id)} className="text-red-600 underline">Delete</button>
                </td>
              </tr>
            ))}
            {gallery.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No gallery items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
