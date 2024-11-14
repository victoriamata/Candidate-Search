//Create an interface for the Candidate objects returned by the API
export interface Candidate {
  name: string | null;
  user: string | null;
  location: string | null;            
  email: string | null;              
  avatar: string | null;
  company: string | null;
  url: string | null;
}
