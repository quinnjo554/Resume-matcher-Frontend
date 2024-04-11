"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { GlobalContextProvider } from "./UserContext";
import { JobAwardProvider } from "./JobAwardProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <ChakraProvider>
      <JobAwardProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </JobAwardProvider>
    </ChakraProvider>
  );
}
