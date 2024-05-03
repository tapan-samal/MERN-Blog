import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import CommentIcon from '@mui/icons-material/Comment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SegmentIcon from '@mui/icons-material/Segment';
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="container">
      <div className="side-nav">
        <div className="profile">
          <img src={require("../../assets/tapan11.jpeg")} alt="Profile" />
          <h2>Commerce Coder</h2>
        </div>
        <div className="links">
          <Link to="" className="link" style={{backgroundColor:'#1B4F72'}}><DashboardIcon/><span>Dashboard</span></Link>
          <Link to="blog" className="link"><SegmentIcon/><span>Blog List</span></Link>
          <Link to="add-blog" className="link"><AddBoxIcon/><span>Add Blog</span></Link>
          <Link to="category" className="link"><CategoryIcon/><span>Category List</span></Link>
          <Link to="add-category" className="link"><PlaylistAddIcon/><span>Add Category</span></Link>
          <Link to="comment" className="link"><CommentIcon/><span>Comment</span></Link>
          <Link to="/" className="link" onClick={handleLogout}><LogoutIcon/><span>Logout</span></Link>
        </div>
      </div>

      <div className="main-content"><Outlet/></div>
    </div>
  );
};

export default Dashboard;
