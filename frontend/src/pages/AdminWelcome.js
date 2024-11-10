import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminWelcome = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data); // Set users to the fetched data
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Log out function
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when component loads
    }, []);

    return (
        <div>
            <h1>Welcome Admin!</h1>
            <p>Here you can manage all admin-related tasks.</p>
            <button onClick={handleLogout}>Log Out</button>

            <h2>Manage Users</h2>
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default AdminWelcome;


