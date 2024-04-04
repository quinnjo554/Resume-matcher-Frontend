import { QueryClient, UseQueryResult, useQuery, useQueryClient } from "react-query";
import Candidate from "@/models/candidates/Candidates";

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

