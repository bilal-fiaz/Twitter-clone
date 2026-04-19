import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // This tells React Query: "If I don't give you a function, use this one"
      queryFn: async ({ queryKey }) => {
        if (queryKey[0] === "authUser") {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to fetch");
          return data;
        }
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
  <App />
    </QueryClientProvider>
    
    </BrowserRouter>
  
  </StrictMode>,
)
