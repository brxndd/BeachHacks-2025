'use client';

import React, { useState } from 'react';

export default function Questionnaire() {
  // State variables to store user input
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [race, setRace] = useState("");
 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send data to FastAPI backend
      const response = await fetch("http://localhost:8000/store-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: age,
          sex: sex,
          race: race,
       }),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Heart Health Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {/* Age */}
        <label htmlFor="age">Age:</label><br />
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value, 10))}
          required
        /><br />

        {/* Sex */}
        <label htmlFor="sex">Sex:</label><br />
        <select
          id="sex"
          name="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><br />

        {/* Race */}
        <label htmlFor="race">Race:</label><br />
        <input
          type="text"
          id="race"
          name="race"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          required
        /><br />

        {/* Family History */}
        <label htmlFor="familyHistory">Family History of Heart Disease:</label><br />
        <input
          type="checkbox"
          id="familyHistory"
          name="familyHistory"
          checked={familyHistory}
          onChange={(e) => setFamilyHistory(e.target.checked)}
        /><br />

        {/* Smoking History */}
        <label htmlFor="smokingHistory">Smoking History:</label><br />
        <input
          type="checkbox"
          id="smokingHistory"
          name="smokingHistory"
          checked={smokingHistory}
          onChange={(e) => setSmokingHistory(e.target.checked)}
        /><br />

        {/* Diabetes Status */}
        <label htmlFor="diabetesStatus">Diabetes Status:</label><br />
        <input
          type="checkbox"
          id="diabetesStatus"
          name="diabetesStatus"
          checked={diabetesStatus}
          onChange={(e) => setDiabetesStatus(e.target.checked)}
        /><br />

        {/* Cholesterol Levels (Optional) */}
        <label htmlFor="cholesterolLevels">Cholesterol Levels (optional):</label><br />
        <input
          type="text"
          id="cholesterolLevels"
          name="cholesterolLevels"
          value={cholesterolLevels}
          onChange={(e) => setCholesterolLevels(e.target.value)}
        /><br />

        {/* Current Heart Condition */}
        <label htmlFor="currentHeartCondition">Current Heart Condition:</label><br />
        <input
          type="text"
          id="currentHeartCondition"
          name="currentHeartCondition"
          value={currentHeartCondition}
          onChange={(e) => setCurrentHeartCondition(e.target.value)}
          required
        /><br />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
