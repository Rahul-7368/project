import { useState } from "react";
import axios from "axios";

const ResignationForm = () => {
  const [lwd, setLwd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit a resignation.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/resignation/resign",
        { lwd },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(" Resignation submitted successfully!");
      setLwd(""); 
    } catch (error) {
      console.error(
        " Error submitting resignation:",
        error.response?.data || error.message
      );
      alert("Failed to submit resignation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit Resignation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={lwd}
          onChange={(e) => setLwd(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResignationForm;
