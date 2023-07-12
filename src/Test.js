import React, { useState } from 'react';
const Test = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const createUser = () => {
    const newUser = {
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
    };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '' });
  };
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Test;
