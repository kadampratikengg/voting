import { useState } from "react";
// import "./Profile.css";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />

        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />

        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />

        <label>Zip Code</label>
        <input type="text" name="zip" value={formData.zip} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
