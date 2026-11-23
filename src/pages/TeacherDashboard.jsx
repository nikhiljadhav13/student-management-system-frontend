import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import StudentTable from '../components/StudentTable';
import MarksForm from '../components/MarksForm';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState('');

  const loadStudents = useCallback(async () => {
    try {
      const result = await apiRequest('/api/teacher/students');
      setStudents(result.data);
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleSaved = (marks) => {
    setStudents((current) => current.map((student) =>
      student._id === selectedStudent._id ? { ...student, marks } : student
    ));
  };

  return (
    <section className="dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">Teacher workspace</p>
          <h1>Student records</h1>
        </div>
      </header>
      {error && <p className="form-error">{error}</p>}
      <div className="dashboard-grid">
        <div className="card table-card">
          <StudentTable students={students} onSelect={setSelectedStudent} />
        </div>
        <MarksForm student={selectedStudent} onSaved={handleSaved} />
      </div>
    </section>
  );
}
