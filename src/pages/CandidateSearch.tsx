import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidates = await searchGithub();
      setCandidateList(candidates);
      if (candidates.length > 0) {
        await loadCandidateDetails(candidates[0].user); 
      }
    };
    fetchCandidates();
  }, []);

 const loadCandidateDetails = async (username: string) => {
  const detailedCandidate = await searchGithubUser(username);
  setCurrentCandidate(detailedCandidate); 
};

const saveCandidateAndLoadNext = async () => {
  if (currentCandidate && currentCandidate.user) {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    
    savedCandidates.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    loadNextCandidate();
  }
};

const loadNextCandidate = async () => {
  const nextIndex = candidateIndex + 1;
  if (nextIndex < candidateList.length) {
    setCandidateIndex(nextIndex);

    const nextCandidateLogin = candidateList[nextIndex].user;
    if (nextCandidateLogin) {
      await loadCandidateDetails(nextCandidateLogin); 
    } else {
      console.warn("Candidate login is null or undefined");
    }
  } else {
    setCurrentCandidate(null);
  }
};
  return (
    <div>
      <button onClick={saveCandidateAndLoadNext}>+</button>
      <button onClick={loadNextCandidate}>-</button>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          
          <img src={currentCandidate.avatar || 'No avatar to display'}/>
          <h2>{currentCandidate.name || 'No Name provided'}</h2> 
          <p>Username: {currentCandidate.user}</p>
          <p>Location: {currentCandidate.location || 'No location provided'}</p> 
          <p>Email: {currentCandidate.email || 'No email provided'}</p> 
          <p>Company: {currentCandidate.company || 'No company provided'}</p> 
          <a href={currentCandidate.url || ''} target="_blank" rel="noopener noreferrer">
            GitHub URL
          </a>
        </div>
      ) : (
        <p>No more candidates available for review</p>
      )}
    </div>
  );
};

export default CandidateSearch;

