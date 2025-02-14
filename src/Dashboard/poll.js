import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Home, Users, Settings, User, LogOut, BarChart } from "lucide-react"; // Import the BarChart icon for Poll

import "./poll.css";


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
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
              <Link to="/Dashboard/dashboard">
                <Home /> {isSidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/users">
                <Users /> {isSidebarOpen && "Users"}
              </Link>
            </li>
            {/* Add Poll Tab */}
            <li>
              <Link to="/Dashboard/poll">
                <BarChart /> {isSidebarOpen && "Poll"} {/* BarChart icon added for Poll */}
              </Link>
            </li>
            {/* Removed Profile and Settings from the sidebar */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="top-navbar">
          <h1>Poll</h1>
          <div className="logout-dropdown">
            <button 
              className="logout-button" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <LogOut size={24} /> Logout
            </button>

            {/* Dropdown Menu */}
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

        {/* Dashboard Sections */}
        <section className="dashboard-grid">
          <div className="dashboard-section">
            <h3>Current Poll</h3>
            <p>Recently no poll Execute</p>
          </div>
          <div className="dashboard-section">
            <h3>Result</h3>
            <p>No Result Available</p>
          </div>
          <div className="dashboard-section">
            <h3>History</h3>
            <p>No History Available</p>
          </div>
          <div className="dashboard-section">
            <h3>Generate New Poll</h3>
             <div className="poll-options">
               <button onClick={() => navigate("/Dashboard/new-poll")}>New Poll</button>
               <button onClick={() => navigate("/Dashboard/edit-poll")}>Edit Poll</button>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
