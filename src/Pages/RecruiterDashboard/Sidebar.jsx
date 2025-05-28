import React from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Recruiter Panel</h2>
      <nav className="sidebar-nav">
        <Link to="post_job" className="sidebar-link">
<div>    <button> Post Job</button></div>
        </Link>
        <Link to="my_postings" className="sidebar-link">
         <button> 📄 My Postings</button>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
