import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("someUsername");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await searchGithubUser(username);
        setCandidates(response);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [username]);

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Use setUsername to update the username
        placeholder="Enter username"
      />
      {loading ? (
        <p>Loading...</p> ):(
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>{candidate.name}</li>
        ))}
      </ul>
        )}
    </div>
  );
};

export default CandidateSearch;

