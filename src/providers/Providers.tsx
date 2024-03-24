"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { GlobalContextProvider } from "./UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <GlobalContextProvider>
      <ChakraProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ChakraProvider>
    </GlobalContextProvider>
  );
}
