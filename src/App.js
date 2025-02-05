
// import React from 'react';
// import Login from './components/ui/Login'; // Import the Login component

// function App() {
//   return (
//     <div className="App">
//       <Login /> {/* Use the Login component here */}
//     </div>
//   );
// }

// export default App;
// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/ui/Login';
import CreateAccount from './components/ui/CreateAccount';
import ForgotPassword from './components/ui/ForgotPassword';
import Dashboard from "./Dashboard/dashboard";
import Profile from './Dashboard/profile';
import Users from './Dashboard/users';
// import terms-and-conditions from './components/ui/terms-and-condition';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Dashboard/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard/profile" element={<Profile />} />
        <Route path="/Dashboard/users" element={<Users />} />
        {/* <Route path="/terms-and-conditions" element={<terms-and-conditions />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
