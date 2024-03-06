"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: JSX.Element }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 2000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
