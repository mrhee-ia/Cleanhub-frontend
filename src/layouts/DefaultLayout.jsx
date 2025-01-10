import { useEffect, useState} from "react";
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx"
import axiosClient from "../axios-client.js";
import profilePic3 from '../assets/images/profilePic3.avif'
import { FaUser, FaHome, FaFileAlt, FaClipboardCheck, FaBell, FaPowerOff, FaBookmark,FaTimes, FaBars } from 'react-icons/fa'

function DefaultLayout() {

  const {currentUser, setUser, token, setToken} = useStateContext()
  const [menuOpen, setMenuOpen] = useState(false);

  if (!token) {
    return <Navigate to='/join-now' />
  }

  useEffect(() => {
    if (currentUser.role == 'admin') {
      return <Navigate to='/admin-panel' />
    }
  }, [])

  const onLogout = (event) => {
    event.preventDefault()
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
        <button className={`toggle-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`h-navigation-links ${menuOpen ? "block" : "hidden"} md:block`}>
          <ul>
            <Link to="/hub/profile" className="h-nav-link"><li><FaUser />Profile</li></Link>
            <Link to="/hub/feed" className="h-nav-link"><li><FaHome />Feed</li></Link>
            <Link to="/hub/saved-jobs" className="h-nav-link"><li><FaBookmark />Saved Jobs</li></Link>
            <Link to="/hub/job-applications" className="h-nav-link"><li><FaFileAlt />Job Applications</li></Link>
            <Link to="/hub/job-posts" className="h-nav-link"><li><FaClipboardCheck />Job Posts</li></Link>
            <Link to="/hub/notifications" className="h-nav-link"><li><FaBell />Notifications</li></Link>
            <Link to="/" onClick={onLogout} className="h-nav-link"><li><FaPowerOff />Log Out</li></Link>
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