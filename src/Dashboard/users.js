import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash, Edit, Plus, LogOut, Menu, Home, Users, User, Settings, BarChart } from "lucide-react";
import "./users.css";

export default function UsersPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", password: "password123" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", password: "password456" },
    { id: 3, name: "Mark Johnson", email: "mark@example.com", role: "User", password: "password789" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Editor", password: "password101" },
    { id: 5, name: "Michael Brown", email: "michael@example.com", role: "User", password: "password102" }
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", password: "" });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: "", email: "", role: "User", password: "" });
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role, password: user.password });
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) => (user.id === editUser.id ? { ...user, ...newUser } : user))
    );
    setNewUser({ name: "", email: "", role: "User", password: "" });
    setEditUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/Dashboard/dashboard">
                <Home /> {isSidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/users">
                <Users /> {isSidebarOpen && "Users"}
              </Link>
              <li>
              <Link to="/Dashboard/poll">
                <BarChart /> {isSidebarOpen && "Poll"} {/* BarChart icon added for Poll */}
              </Link>
            </li>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="top-navbar">
          <h1>Users Management</h1>
          <div className="logout-dropdown">
            <button className="logout-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <LogOut size={24} /> Logout
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/Dashboard/profile">
                      <User /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/Dashboard/settings">
                      <Settings /> Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <LogOut /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
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
                    <button className="edit-button" onClick={() => handleEditUser(user)}>
                      <Edit size={16} />
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
