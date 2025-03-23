'use client';
import { useState } from 'react';

export default function Questionnaire() {
  // State to store form input values
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [prevCondition, setPrevCondition] = useState(false);

  // State to store the response from the backend
  const [response, setResponse] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the FastAPI backend
      const res = await fetch('http://127.0.0.1:8000/form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          age: parseInt(age), // Convert to integer
          prev_condition: prevCondition,
        }),
      });

      // Check if the request was successful
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await res.json();
      setResponse(data); // Store the response in state
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>User Input Form</h1>

      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="prevCondition">Previous Condition:</label>
          <input
            type="checkbox"
            id="prevCondition"
            checked={prevCondition}
            onChange={(e) => setPrevCondition(e.target.checked)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display the response from the backend */}
      {response && (
        <div>
          <h2>Response from Backend:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
