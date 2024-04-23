
import React from 'react';

interface JobParams {
  jobid: string
}

export const JobsContext = React.createContext<JobParams>({ jobid: "" })

