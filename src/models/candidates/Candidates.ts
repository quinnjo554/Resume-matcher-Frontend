interface Candidate {
  id: number;
  name: string;
  resume: File;
  resume_score: number;
  resume_score_description: string;
  contact: string;
  job: number; //id
}

// rubric needs to have a job id
// 
export default Candidate;
