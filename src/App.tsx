// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import EditProfilePage from './pages/EditProfilePage';
import MembersPage from './pages/MembersPage';
import MessagesPage from './pages/MessagesPage';
import AboutUs from './pages/AboutUsPage';
import ContactUs from './pages/ContactUsPage';
import ManageWhitelist from './pages/ManageWhitelist';
import ManageUsers from './pages/ManageUsers';
import SubmitTestimonialPage from './pages/SubmitTestimonialPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  console.log('API Key:', process.env.REACT_APP_API_KEY);

  return (
    <Router>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<PrivateRoute element={<UserPage />} />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/profile/:uid" element={<UserPage />} />
            <Route path="/message/:chatId" element={<MessagesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/manage-whitelist" element={<ManageWhitelist />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/submit-testimonial" element={<SubmitTestimonialPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;