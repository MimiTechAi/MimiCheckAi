import './App.css'
import Pages from "@/pages";
import { Toaster } from "@/components/ui/sonner";
import CustomCursor from "@/components/ui/CustomCursor";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Pages />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;