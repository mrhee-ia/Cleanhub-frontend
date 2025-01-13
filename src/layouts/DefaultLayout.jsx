import { useEffect, useState} from "react";
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx"
import axiosClient from "../axios-client.js";
import profilePic3 from '../assets/images/profilePic3.avif'
import { FaUser, FaHome, FaFileAlt, FaClipboardCheck, FaBell, FaPowerOff, FaBookmark,FaTimes, FaBars } from 'react-icons/fa'

function DefaultLayout() {

  const {currentUser, setUser, token, setToken} = useStateContext()

  if (!token) {
    return <Navigate to='/join-now' />
  }

  if (currentUser.role === 'admin') {
    return <Navigate to="/admin-panel" />;
  }

  // const onLogout = (event) => {
  //   event.preventDefault()
  //   axiosClient.post('/logout')
  //     .then(() => {
  //       setUser({})
  //       setToken(null)
  //     })
  // }

  const onLogout = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  return (
    <div className="homepage-container bg-gradient-green">
      <aside className="h-sidebar">
        <div className="h-website-name">
          <Link to='/'><h1>CleanHub</h1></Link>
        </div>
        <div className="h-profile-section">
          <img className="h-profile-picture" src={profilePic3} alt="Profile Picture"/>
          <div>
            <h3>{currentUser.full_name}</h3>
            <p><i>@{currentUser.user_name}</i></p>
          </div>
        </div>
        <nav className="h-navigation-links">
          <ul>
            <Link to="/hub/profile" className="h-nav-link"><li><FaUser /><span>Profile</span></li></Link>
            <Link to="/hub/feed" className="h-nav-link"><li><FaHome /><span>Feed</span></li></Link>
            <Link to="/hub/saved-jobs" className="h-nav-link"><li><FaBookmark /><span>Saved Jobs</span></li></Link>
            <Link to="/hub/job-applications" className="h-nav-link"><li><FaFileAlt /><span>Job Applications</span></li></Link>
            <Link to="/hub/job-posts" className="h-nav-link"><li><FaClipboardCheck /><span>Job Posts</span></li></Link>
            <Link to="/hub/notifications" className="h-nav-link"><li><FaBell /><span>Notifications</span></li></Link>
            <Link to="/" onClick={onLogout} className="h-nav-link"><li><FaPowerOff /><span>Log Out</span></li></Link>
          </ul>
        </nav>
      </aside>
      <main className="h-main-container">
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout