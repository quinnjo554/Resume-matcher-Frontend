
import { UseQueryResult, useQuery, useQueryClient } from "react-query";
import Job from "@/models/job/job";
import { useContext } from 'react';
import { FormContext } from "@/providers/FormProvider";
import JobRequest from "@/models/job/JobRequest";
import { JobAwardContext } from "@/providers/JobAwardProvider";


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

export async function DeleteJobById(id: number) {
  const response = await fetch(`http://localhost:8000/job/delete/id/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data
}

export async function PostJob(job: JobRequest) {
  console.log(JSON.stringify(job));
  const response = await fetch(`http://localhost:8000/job/add/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });
  const data = await response.json();

  console.log({ data });
  return data;
}
// This just checks if the FormContext is undefined
export function useJobForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

export function useJobAward() {
  const context = useContext(JobAwardContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a JobAwardProviderProvider');
  }
  return context;
}


