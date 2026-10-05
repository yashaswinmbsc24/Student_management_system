import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5001/user/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setValues({
                        name: res.data[0].name,
                        email: res.data[0].email,
                        age: res.data[0].age,
                        gender: res.data[0].gender
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5001/update_user/${id}`, values)
            .then((res) => {
                alert('Student updated successfully!');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                alert('Error updating student');
            });
    };

    return (
        <div className="container mt-5">

            <h2>Edit Student</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group my-3">
                    <label>Name</label>

                    <input
                        type="text"
                        className="form-control"
                        value={values.name}
                        required
                        onChange={(e) =>
                            setValues({
                                ...values,
                                name: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group my-3">
                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={values.email}
                        required
                        onChange={(e) =>
                            setValues({
                                ...values,
                                email: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group my-3">
                    <label>Age</label>

                    <input
                        type="number"
                        className="form-control"
                        value={values.age}
                        required
                        onChange={(e) =>
                            setValues({
                                ...values,
                                age: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group my-3">
                    <label>Gender</label>

                    <input
                        type="text"
                        className="form-control"
                        value={values.gender}
                        required
                        onChange={(e) =>
                            setValues({
                                ...values,
                                gender: e.target.value
                            })
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary me-2"
                >
                    Update Student
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default Edit;