import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import DisplayPage from "./Pages/DisplayPage";

function App() {
  const client = new QueryClient();

  return (
    <MantineProvider>
      <ModalsProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
            <Route path="/" element={< DisplayPage />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
    
  );
}

export default App;
