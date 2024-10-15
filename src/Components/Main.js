import React, { useState, useEffect } from "react";

function Main() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toDo, setToDo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addStudent = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if (students.some((student) => student.email === email)) {
      setError("Email must be unique!");
      return;
    }
    if (!name || !email || !toDo) {
      setError("Name, email, and to-do are required!");
      return;
    }

    const newStudent = { name, email, toDo };
    setStudents([...students, newStudent]);
    setName("");
    setEmail("");
    setToDo("");
    setError("");
  };

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const editStudent = (index) => {
    const student = students[index];
    setName(student.name);
    setEmail(student.email);
    setToDo(student.toDo);
    setEditIndex(index);
  };

  const updateStudent = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if (
      students.some((student, i) => student.email === email && i !== editIndex)
    ) {
      setError("Email must be unique!");
      return;
    }

    const updatedStudents = students.map((student, index) =>
      index === editIndex ? { name, email, toDo } : student
    );
    setStudents(updatedStudents);
    setName("");
    setEmail("");
    setToDo("");
    setEditIndex(null);
    setError("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Student To-Do List</h1>

      <div className="row">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="To-Do"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          {editIndex === null ? (
            <button className="btn btn-primary " onClick={addStudent}>
              Add Student
            </button>
          ) : (
            <button className="btn btn-success" onClick={updateStudent}>
              Update Student
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <h3 className="mt-4">Student List</h3>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>To-Do</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.toDo}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => editStudent(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteStudent(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
