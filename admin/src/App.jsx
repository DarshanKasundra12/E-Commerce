import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import AddProduct from './addproduct';
import Dashboard from './dashboard';
import AddCategory from './addcategories';
import Customer from './CustomerSection';
import ManageProducts from './ManageProduct';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/manage-products" element={<ManageProducts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
