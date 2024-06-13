import React, { useEffect, useState } from 'react';
import Case from '../components/Case';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/profile', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
    .then(res => {
      setProfile(res.data.data);
    })
    .catch(err => {
      console.log(err);
      if(err.response.status === 401){
        navigate('/login?message=' + encodeURIComponent('Anda belum login'));
      }
    })
  }, [navigate]);

  const handleLogout = (event) => {
    event.preventDefault();
    axios.get('http://localhost:8000/logout', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
    .then(res => {
      localStorage.removeItem('access_token');
      navigate('/login');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Case>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
          <div className="flex flex-col items-center pb-10 pt-10">
            <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-gray-500" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.username}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span>
            <div className="flex mt-4 md:mt-6">
              <Link to="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <small className="text-white">Dashboard</small>
              </Link>
              <a href="#" onClick={handleLogout} className="inline-flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </Case>
  );
}
