import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, User, Settings, Users, LogOut, BarChart } from "lucide-react";
import "./profile.css"; // You can import your CSS here for the profile page

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to Login Page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
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
        {/* Profile Content */}
        <header className="top-navbar">
          <h1>Edit Profile</h1>
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

        <section className="profile-section">
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />

            <label>Zip Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />

            <button type="submit">Save Changes</button>
          </form>
        </section>
      </main>
    </div>
  );
}
