import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BoardsPage from './pages/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
