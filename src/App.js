import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

import RequireAuth from './RequireAuth';
import Home from './pages/home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />}  />
      
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
