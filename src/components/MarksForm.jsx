import { useState } from 'react';
import { apiRequest } from '../services/api';

export default function MarksForm({ student, onSaved }) {
  const [subject, setSubject] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!student) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      const result = await apiRequest(`/api/teacher/students/${student._id}/marks`, {
        method: 'PATCH',
        body: JSON.stringify({ subject, obtainedMarks: Number(obtainedMarks) })
      });
      setSubject('');
      setObtainedMarks('');
      onSaved(result.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card marks-card">
      <h2>Add marks</h2>
      <p className="muted">Updating marks for {student.name}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Subject
          <input value={subject} onChange={(event) => setSubject(event.target.value)} required />
        </label>
        <label>
          Marks out of 100
          <input type="number" min="0" max="100" value={obtainedMarks} onChange={(event) => setObtainedMarks(event.target.value)} required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="button" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save marks'}
        </button>
      </form>
    </section>
  );
}
