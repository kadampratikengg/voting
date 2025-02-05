import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, Plus, Check, X } from "lucide-react";
import "./users.css";

export default function Users() {
  // Mock data for users
  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", password: "password123" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", password: "password456" },
    { id: 3, name: "Mark Johnson", email: "mark@example.com", role: "User", password: "password789" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Editor", password: "password101" },
    { id: 5, name: "Michael Brown", email: "michael@example.com", role: "User", password: "password102" }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", password: "" });
  const [editUser, setEditUser] = useState(null);

  // Add new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: "", email: "", role: "User", password: "" });
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role, password: user.password });
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === editUser.id ? { ...user, ...newUser } : user
      )
    );
    setNewUser({ name: "", email: "", role: "User", password: "" });
    setEditUser(null);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Assign role
  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="users-container">
      {/* Dashboard Navbar */}
      <header className="top-navbar">
        <h1>Users Management</h1>
        <nav>
          <ul>
            <li>
              <Link to="/Dashboard/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/Dashboard/users">Users</Link>
            </li>
            <li>
              <Link to="/Dashboard/settings">Settings</Link>
            </li>
            <li>
              <button className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* User Form */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>

        {editUser ? (
          <button className="save-button" onClick={handleUpdateUser}>
            Save Changes
          </button>
        ) : (
          <button className="add-button" onClick={handleAddUser}>
            <Plus size={16} /> Add User
          </button>
        )}
      </div>

      {/* User Table */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                  </select>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
