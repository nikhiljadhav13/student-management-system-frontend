import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/api/students/my-marks')
      .then((result) => setStudent(result.data))
      .catch((requestError) => setError(requestError.message));
  }, []);

  const marks = student?.marks || [];

  return (
    <section className="dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h1>Hello, {user?.name}</h1>
        </div>
      </header>
      {error && <p className="form-error">{error}</p>}
      <div className="student-summary">
        <div className="card profile-card">
          <p className="eyebrow">Profile</p>
          <h2>{student?.name || user?.name}</h2>
          <p>{student?.email || user?.email}</p>
          <p className="muted">Roll number: {student?.rollNumber || user?.rollNumber || '-'}</p>
        </div>
        <div className="card marks-overview">
          <p className="eyebrow">Academic record</p>
          {marks.length === 0 ? (
            <p className="empty-state">Marks have not been added yet</p>
          ) : (
            <div className="marks-grid">
              {marks.map((mark, index) => (
                <div className="mark-card" key={`${mark.subject}-${index}`}>
                  <span>{mark.subject}</span>
                  <strong>{mark.obtainedMarks}<small>/{mark.totalMarks}</small></strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
