import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/addTour" 
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }  
          />
          <Route 
            path="/editTour/:id" 
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            } 
          />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
