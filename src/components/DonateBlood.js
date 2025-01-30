import { useState } from "react";
import axios from "axios";

const DonateBlood = () => {
  const [form, setForm] = useState({ name: "", bloodType: "", contact: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (!token) {
      setError("You must be logged in to donate blood.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post("http://localhost:5000/api/donor/donate", form, config);
      alert("Donation recorded successfully!");
      setForm({ name: "", bloodType: "", contact: "", location: "" }); // Clear form after success
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Donate Blood</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Blood Type" value={form.bloodType} onChange={(e) => setForm({ ...form, bloodType: e.target.value })} required />
        <input type="text" placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} required />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
          {loading ? "Submitting..." : "Donate"}
        </button>
      </form>
    </div>
  );
};

export default DonateBlood;
