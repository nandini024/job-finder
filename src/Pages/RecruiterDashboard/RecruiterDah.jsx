import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
 import "./RecruiterDashboard.css"

export default function RecruiterDah() {
  return (
    <div className="recruiterdash">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
