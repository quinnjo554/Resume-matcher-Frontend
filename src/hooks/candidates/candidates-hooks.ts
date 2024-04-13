import { QueryClient, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import Candidate from "@/models/candidates/Candidates";
import { UseMutationResult, QueryKey } from 'react-query';
import FormData from 'form-data';
import axios from "axios";
export function useCandidatesByJobId(jobId: number): UseQueryResult<Candidate[], unknown> {
  const queryClient = useQueryClient();
  return useQuery(['Candidates', jobId], async () => {
    const response = await fetch(`http://localhost:8000/candidate/all/job/id/${jobId}`);
    const data = await response.json();
    return data;
  }, {
    enabled: !!jobId,
    // Consider disabling caching if jobs are updated frequently
    cacheTime: 10000, // Optional: Disable caching
    staleTime: 1000 * 60 * 5,
  }
  );
}



export async function postCandidateScore(jobId: number, file: File): Promise<Candidate> {
  const formData = new FormData();

  // Append each file to the form data
  formData.append('file', file);

  // Make the POST request
  const response = await axios.post(`http://localhost:8000/candidate/score/job/${jobId}`, formData);
  return response.data;
}

