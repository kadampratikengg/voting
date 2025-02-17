import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, Users, Settings, User, LogOut, BarChart } from 'lucide-react'; // Import the BarChart icon for Poll
import './dashboard.css'; // Ensure the CSS file is the same or update accordingly

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false); // New state to track if the file is uploaded
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setFile(file);
      readExcelFile(file);
    } else {
      setErrorMessage('Please upload a valid Excel file (.xlsx)');
      setData([]);
      setFileUploaded(false); // Reset the state if an invalid file is uploaded
    }
  };

  // Read and parse the Excel file
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]]; // Get the first sheet
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Check if the first row matches expected columns
      const requiredColumns = ['Roll Number', 'Name', 'Photo'];
      const fileColumns = jsonData[0];

      const isValid = requiredColumns.every(
        (col) => fileColumns.includes(col)
      );

      if (isValid) {
        setErrorMessage('');
        setData(jsonData);
        setFileUploaded(true); // Set state to true after successful file upload
      } else {
        setErrorMessage('Invalid columns! Please ensure the file contains "Roll Number", "Name", and "Photo".');
        setData([]);
        setFileUploaded(false); // Reset state for invalid file
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to Login Page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
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
                <BarChart /> {isSidebarOpen && "Poll"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="top-navbar">
          <h1>Upload Excel File</h1>
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

        {/* File Upload Section */}
        <section className="upload-section">
          <h2>Upload Excel File</h2>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {data.length > 0 && (
            <>
              <table border="1">
                <thead>
                  <tr>
                    {data[0].map((col, idx) => (
                      <th key={idx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Conditionally Render the Download Link */}
          {!fileUploaded && (
            <div>
              <a 
                href="/All Details.xlsx" 
                download 
                style={{ display: 'block', marginTop: '20px' }}
              >
                Click Here to Download "Upload File Formate"
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ExcelUpload;
