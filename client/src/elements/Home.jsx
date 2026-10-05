import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [students, setStudents] = useState([]);

    const getStudents = () => {
        axios.get('http://localhost:5001/users')
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this student?'
        );

        if (!confirmDelete) {
            return;
        }

        axios.delete(`http://localhost:5001/delete_user/${id}`)
            .then((res) => {
                alert('Student deleted successfully!');
                getStudents();
            })
            .catch((err) => {
                console.log(err);
                alert('Error deleting student');
            });
    };

    return (
        <div className="container mt-5">

            <h1>Student Management System</h1>

            <Link
                to="/create"
                className="btn btn-success mb-3"
            >
                Add Student
            </Link>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map((student) => (
                        <tr key={student.id}>

                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>

                            <td>

                                <Link
                                    to={`/edit/${student.id}`}
                                    className="btn btn-primary me-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDelete(student.id)
                                    }
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

export default Home;