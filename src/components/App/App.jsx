import './App.css';
import ResetForm from '../../Pages/ResetForm/ResetForm';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import NotFoundPage from '../../Pages/NotFoundPage';

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/reset-password" element={<ResetForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
