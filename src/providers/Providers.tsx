"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { GlobalContextProvider } from "./UserContext";
import { JobAwardProvider } from "./JobAwardProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <ChakraProvider>
        <JobAwardProvider>
          {children}
        </JobAwardProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
