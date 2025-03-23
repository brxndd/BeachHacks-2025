'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Questionnaire() {
  const router = useRouter();

  // State to store form input values
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('');
  const [error, setError] = useState('');

  // State to store the response from the backend
  const [response, setResponse] = useState(null);
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const [isLoading, setIsLoading] = useState(false); // State to control loading state

  // Preset conditions for the checklist
  const conditions = [
    'High Blood Pressure',
    'Diabetes',
    'Depression',
    'Atrial fibrillation',
    'Other heart arrhythmias',
    'Leukemia',
    'Lymphoma',
    'Myeloma',
    'None of the above',
    'Other',
  ];

  // Preset options for race
  const races = [
    'American Indian/Alaska Native',
    'Asian',
    'Black or African American',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Hispanic or Latino',
    'Middle Eastern',
    'Prefer Not to Say',
  ];

  // Preset options for sex
  const sexes = [
    'Male',
    'Female',
    'Other',
    'Prefer Not to Say',
  ];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Validate age input
      const ageInt = parseInt(age, 10);
      if (ageInt < 18 || ageInt > 100) {
        setError('Age must be between 18 and 100.');
        return;
      }

      // Set loading state to true while submitting
      setIsLoading(true);

      // Create the form data object
      const formData = {
        name: name,
        age: ageInt,
        conditions: selectedConditions,
        race: race,
        sex: sex,
      };

      // Send a POST request to the FastAPI backend
      const res = await fetch('http://127.0.0.1:8000/generate-tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: formData.age,
          sex: formData.sex,
          race: formData.race,
          conditions: formData.conditions,
        }),
      });

      // Check if the request was successful
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await res.json();
      setResponse(data); // Store the response in state
      setError(''); // Clear any previous errors

      // Extract tasks from the response and update state
      setTasks(data.tasks || []); // If no tasks, set an empty array

      // Set loading state to false after response is received
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form. Please try again.');
      setIsLoading(false); // Set loading state to false on error
    }
  };

  // Function to handle checkbox changes
  const handleConditionChange = (condition) => {
    if (selectedConditions.includes(condition)) {
      // If the condition is already selected, remove it
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    } else {
      // If the condition is not selected, add it
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  // Function to remove a task from the list
  const handleRemoveTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  // Function to reset the questionnaire
  const handleRedoQuestionnaire = () => {
    setName('');
    setAge('');
    setSelectedConditions([]);
    setRace('');
    setSex('');
    setError('');
    setResponse(null);
    setTasks([]);
    setIsLoading(false);
  };

  return (
    <div className="mt-28 mb-32 p-6 max-w-7xl mx-auto">
      <h1 className="text-[#CA0808] text-3xl font-bold mb-6">
        Let's get to know you better!
      </h1>

      {/* Show loading spinner during form submission */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="w-24 h-24 border-8 border-t-8 border-[#CA0808] border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        // Form for user input
        !tasks.length && !response && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6">
              {/* Age Field */}
              <div className="text-xl flex flex-col">
                <label className="text-[#CA0808] font-semibold mb-2" htmlFor="age">
                  What's your age?
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a2929]"
                  placeholder="Answer here"
                  min="18"
                  max="100"
                />
                <p className="text-sm text-gray-500 mt-1">Value can range from 18 to 100</p>
              </div>

              {/* Race Dropdown */}
              <div className="text-xl flex flex-col">
                <label className="text-[#CA0808] font-semibold mb-2" htmlFor="race">
                  Race
                </label>
                <select
                  id="race"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a2929]"
                  required
                >
                  <option value="" disabled>Select your race</option>
                  {races.map((raceOption, index) => (
                    <option key={index} value={raceOption}>
                      {raceOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sex Dropdown */}
              <div className="text-xl flex flex-col">
                <label className="text-[#CA0808] font-semibold mb-2" htmlFor="sex">
                  Sex
                </label>
                <select
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a2929]"
                  required
                >
                  <option value="" disabled>Select your sex</option>
                  {sexes.map((sexOption, index) => (
                    <option key={index} value={sexOption}>
                      {sexOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Checklist as Long Buttons */}
              <div className="text-xl flex flex-col">
                <label className="text-[#CA0808] font-semibold mb-2">
                  Select your conditions:
                </label>
                {conditions.map((condition, index) => (
                  <button
                    key={index}
                    type="button" // Prevent form submission
                    onClick={() => handleConditionChange(condition)}
                    className={`flex items-center justify-between p-4 mb-2 rounded-lg text-left transition-colors duration-200 ${
                      selectedConditions.includes(condition)
                        ? 'bg-red-600 text-white' // Selected state
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Default state
                    }`}
                  >
                    <span>{condition}</span>
                    {selectedConditions.includes(condition) && (
                      <span className="ml-2">✓</span> // Checkmark for selected condition
                    )}
                  </button>
                ))}
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="text-xl bg-[#CA0808] text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300 w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        )
      )}

      {/* Display Tasks after loading */}
      {tasks.length > 0 && !isLoading && (
        <div>
          <h2 className="font-semibold mt-6">Recommended Tasks:</h2>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="p-4 mt-2 bg-gray-100 border rounded-lg cursor-pointer"
              onClick={() => handleRemoveTask(task)}
            >
              {task}
            </div>
          ))}
          <button
            onClick={handleRedoQuestionnaire}
            className="mt-6 text-white bg-[#CA0808] px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300"
          >
            Redo Questionnaire
          </button>
        </div>
      )}

      {/* If no tasks are available */}
      {tasks.length === 0 && !response && !isLoading && (
        <div className="mt-6 text-gray-500">No tasks available yet.</div>
      )}
    </div>
  );
}
