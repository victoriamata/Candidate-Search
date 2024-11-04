// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  id: number;                  // Unique identifier for the candidate
  name: string;               // Full name of the candidate
  location: string;            // Candidate location
  email: string;               // Contact email
  company: string;             // Company name
  bio: string;                 // Candidate personal bio
  status: boolean;             // Rejected or approved
}
