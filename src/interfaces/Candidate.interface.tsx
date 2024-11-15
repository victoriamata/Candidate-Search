//Create an interface for the Candidate objects returned by the API
export interface Candidate {
  readonly name: string | null;
  readonly user: string | null;
  readonly location: string | null;            
  readonly email: string | null;              
  readonly avatar: string | null;
  readonly company: string | null;
  readonly url: string | null;
}
