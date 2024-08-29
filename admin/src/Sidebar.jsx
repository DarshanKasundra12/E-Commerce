// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import './App.css'; // Assuming you have a separate CSS file for the sidebar styles

// eslint-disable-next-line react/prop-types
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
          <Link to="/">
        <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
          </Link>
          <Link to="/add-products">
        <li className='sidebar-list-item'>
            <BsFillArchiveFill className='icon' /> Add Product
        </li>
          </Link>
          <Link to="/add-category">
        <li className='sidebar-list-item'>
            <BsFillGrid3X3GapFill className='icon' /> Add Category
        </li>
          </Link>
          <Link to="/customers">
        <li className='sidebar-list-item'>
            <BsPeopleFill className='icon' /> Customers
        </li>
          </Link>
          {/* <Link to="/inventory">
        <li className='sidebar-list-item'>
            <BsListCheck className='icon' /> Inventory
        </li>
          </Link>
          <Link to="/reports">
        <li className='sidebar-list-item'>
            <BsMenuButtonWideFill className='icon' /> Reports
        </li>
          </Link>
          <Link to="/settings">
        <li className='sidebar-list-item'>
            <BsFillGearFill className='icon' /> Settings
        </li>
          </Link> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
