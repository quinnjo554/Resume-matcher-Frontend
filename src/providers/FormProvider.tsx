import React, { useState, createContext } from 'react';

// Define a type for your form state
interface FormState {
  title: string;
  description: string;
  location: string;
  priority: string;
  rubric: string;  // Saved as a stringified json object
  resumes: File[]; // Assuming resumes are File objects

}

// Create the context with the `FormState` type
export const FormContext = createContext<{
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
} | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    location: '',
    priority: '',
    rubric: '',
    resumes: [],
  });

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  );
}
