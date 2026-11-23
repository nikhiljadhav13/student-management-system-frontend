export default function StudentTable({ students, onSelect }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll number</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="5" className="empty-state">No students found</td></tr>
          ) : students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNumber || '-'}</td>
              <td>
                {student.marks?.length
                  ? student.marks.map((mark) => `${mark.subject}: ${mark.obtainedMarks}/${mark.totalMarks}`).join(', ')
                  : 'Not added'}
              </td>
              <td>
                <button className="button button-small" type="button" onClick={() => onSelect(student)}>
                  Add marks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
