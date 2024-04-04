
import { UseQueryResult, useQuery, useQueryClient } from "react-query";
import Job from "@/models/job/job";

export function useJobByUserId(userId: number): UseQueryResult<Job[], unknown> {
  const queryClient = useQueryClient();

  return useQuery(
    ['Job', userId],
    async () => {
      const response = await fetch(`http://localhost:8000/job/all/user/id/${userId}`);
      const data = await response.json();
      return data;
    },
    {
      enabled: !!userId,

      // Consider disabling caching if jobs are updated frequently
      cacheTime: 10000, // Optional: Disable caching
      staleTime: 1000 * 60 * 5,
    }
  );
}

