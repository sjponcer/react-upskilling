import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BoardsPage from './pages/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
