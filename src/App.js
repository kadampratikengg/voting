import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/ui/Login';
import CreateAccount from './components/ui/CreateAccount';
import ForgotPassword from './components/ui/ForgotPassword';
import Dashboard from "./Dashboard/dashboard";
import Profile from './Dashboard/profile';
import Users from './Dashboard/users';
import Poll from './Dashboard/poll'; // Updated import to use uppercase 'Poll'
import NewPoll from './Dashboard/new-poll'; // Import the NewPoll component
import EditPoll from './Dashboard/edit-poll'; // Import the EditPoll component
// import terms-and-conditions from './components/ui/terms-and-condition';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/Dashboard/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard/profile" element={<Profile />} />
        <Route path="/Dashboard/users" element={<Users />} />
        <Route path="/Dashboard/poll" element={<Poll />} />
        
        {/* Add routes for New Poll and Edit Poll */}
        <Route path="/Dashboard/new-poll" element={<NewPoll />} /> {/* Route for creating a new poll */}
        <Route path="/Dashboard/edit-poll" element={<EditPoll />} /> {/* Route for editing an existing poll */}
        
        {/* <Route path="/terms-and-conditions" element={<terms-and-conditions />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
