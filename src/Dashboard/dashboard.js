import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Home, User, Settings, Users } from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to Login Page
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
              <Link to="/dashboard">
                <Home /> {isSidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Users /> {isSidebarOpen && "Users"}
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <User /> {isSidebarOpen && "Profile"}
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <Settings /> {isSidebarOpen && "Settings"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="top-navbar">
          <h1>Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </header>

        {/* Dashboard Sections */}
        <section className="dashboard-grid">
          <div className="dashboard-section">Section 1</div>
          <div className="dashboard-section">Section 2</div>
          <div className="dashboard-section">Section 3</div>
          <div className="dashboard-section">Section 4</div>
        </section>
      </main>
    </div>
  );
}
