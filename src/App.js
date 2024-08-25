import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://api-backend-j2tz.onrender.com/bfhl', parsedJson);
      setResponse(res.data);
      setError('');
    } catch (error) {
      setError('Invalid JSON or request failed');
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (filter.includes('Numbers')) filteredResponse.numbers = response.numbers;
    if (filter.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
    if (filter.includes('Highest lowercase alphabet')) 
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

    return (
      <div className="response-container">
        <h3>Filtered Response</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE9063</h1>
      <textarea 
        rows="4" 
        cols="50" 
        value={jsonInput} 
        onChange={e => setJsonInput(e.target.value)} 
        placeholder='Enter JSON'
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select multiple={true} value={filter} onChange={e => setFilter([...e.target.selectedOptions].map(o => o.value))}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
