import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Home, Users, Settings, User, LogOut, BarChart } from "lucide-react"; // Import icons from lucide
import "./new-poll.css"; // Assuming you have styles already in place
import * as XLSX from 'xlsx';


export default function NewPoll() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhoto, setCandidatePhoto] = useState(null);
  const [candidateSignName, setCandidateSignName] = useState("");
  const [post, setPost] = useState("");
  const [region, setRegion] = useState("");
  const [voterList, setVoterList] = useState(null);
  const [candidates, setCandidates] = useState([]); // Temporary storage for candidates
  const [selectedCandidates, setSelectedCandidates] = useState([]); // Track selected candidates
  const navigate = useNavigate();

  // Handle form submission for poll creation
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to server)
    console.log({
      candidates, // All candidates saved in the list
      post,
      region,
      voterList,
    });
    // Redirect after form submission if needed
    navigate("/Dashboard/poll");
  };

  // Save candidate to the candidates list
  const handleAddCandidate = () => {
    if (candidateName && candidateSignName && candidatePhoto) {
      setCandidates([
        ...candidates,
        { candidateName, candidateSignName, candidatePhoto, isSelected: false },
      ]);
      // Reset candidate fields after saving
      setCandidateName("");
      setCandidateSignName("");
      setCandidatePhoto(null);
    } else {
      alert("Please fill all the candidate details before adding.");
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (index) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].isSelected = !updatedCandidates[index].isSelected;
    setCandidates(updatedCandidates);

    // Track selected candidates in the selectedCandidates state
    const selected = updatedCandidates.filter((candidate) => candidate.isSelected);
    setSelectedCandidates(selected);
  };

  // Handle logout
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
          <h1>New Poll</h1>
          <div className="logout-dropdown">
            <button className="logout-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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

        {/* Poll Form */}
        <section className="poll-form-container">
          <form onSubmit={handleSubmit} className="poll-form">
            <div className="form-group">
              <label>Candidate Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Candidate Photo</label>
              <input
                type="file"
                onChange={(e) => setCandidatePhoto(e.target.files[0])}
                accept="image/*"
                required
              />
            </div>

            <div className="form-group">
              <label>Candidate Sign Name</label>
              <input
                type="text"
                value={candidateSignName}
                onChange={(e) => setCandidateSignName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Post</label>
              <input
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Region</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>

            {/* New Candidate Button */}
            <button
              type="button"
              className="add-candidate-button"
              onClick={handleAddCandidate}
            >
              Add Candidate
            </button>

          </form>

          {/* List of added candidates with checkboxes */}
          {candidates.length > 0 && (
            <div className="candidate-list">
              <h3>Added Candidates:</h3>
              <ul>
                {candidates.map((candidate, index) => (
                  <li key={index}>
                    <p>{candidate.candidateName}</p>
                    <p>{candidate.candidateSignName}</p>
                    <img
                      src={URL.createObjectURL(candidate.candidatePhoto)}
                      alt={candidate.candidateName}
                      width="50"
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={candidate.isSelected}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      Select
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-group">
            <label>Upload Voter List</label>
            <input
              type="file"
              onChange={(e) => setVoterList(e.target.files[0])}
              required
            />
          </div>

          {/* Create Poll Button - Only visible if voter list is uploaded */}
          {voterList && (
            <button type="submit" className="submit-button">
              Create Poll
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
