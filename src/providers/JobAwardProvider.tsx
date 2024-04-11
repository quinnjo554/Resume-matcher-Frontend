
import React, { useState, createContext } from 'react';

// Define a type for your form state
interface FormState {
  isNewJob: boolean;
}

// Create the context with the `FormState` type
export const JobAwardContext = createContext<{
  isNewJobPosted: boolean;
  setIsNewJobPosted: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

export function JobAwardProvider({ children }: { children: React.ReactNode }) {
  const [isNewJobPosted, setIsNewJobPosted] = useState<boolean>(false);

  return (
    <JobAwardContext.Provider value={{ isNewJobPosted, setIsNewJobPosted }}>
      {children}
    </JobAwardContext.Provider>
  );
}
