import { Toaster } from 'react-hot-toast';
import Login from '../src/pages/Login/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User/User'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>


      <Toaster />
    </div>
  );
}

export default App;
