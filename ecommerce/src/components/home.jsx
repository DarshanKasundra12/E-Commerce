
// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './home.css'; // Assuming you have a Home.css file for styling

// function Home() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const categoriesRef = useRef(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/categories');
//       if (!response.ok) {
//         console.error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
//         return;
//       }
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         console.error('Received non-JSON response');
//         return;
//       }
//       const categoriesData = await response.json();
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const scroll = (direction) => {
//     if (categoriesRef.current) {
//       const scrollAmount = 200; // Adjust this value based on how much you want to scroll
//       categoriesRef.current.scrollBy({ 
//         left: direction === 'left' ? -scrollAmount : scrollAmount, 
//         behavior: 'smooth' 
//       });
//     }
//   };

//   return (
//     <div>
//       <h1>Categories</h1>
//       <div id="categories" ref={categoriesRef}>
//       <button id="scroll-left" className="scroll-button" onClick={() => scroll('left')}>{"<"}</button>
//         {categories.map((category) => (
//           <div
//             key={category.name}
//             className="category-card"
//             onClick={() => navigate(`/products/${category.name}`)}
//           >
//             <img src={category.imageUrl} alt={category.name} />
//             <h2>{category.name}</h2>
//           </div>
//         ))}
//       <button id="scroll-right" className="scroll-button" onClick={() => scroll('right')}>{">"}</button>
//       </div>
//     </div>
//   );
// }

// export default Home;


// src/components/home.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './home.css'; // Assuming you have a Home.css file for styling

// function Home({ setShowUncontrolled }) {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/categories');
//       if (!response.ok) {
//         console.error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
//         return;
//       }
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         console.error('Received non-JSON response');
//         return;
//       }
//       const categoriesData = await response.json();
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleCategoryClick = (categoryName) => {
//     setShowUncontrolled(false); // Hide UncontrolledExample
//     navigate(`/products/${categoryName}`);
//   };

//   return (
//     <div>
//       <h1>Categories</h1>
//       <div id="categories">
//         {categories.map((category) => (
//           <div
//             key={category.name}
//             className="category-card"
//             onClick={() => handleCategoryClick(category.name)}
//           >
//             <img src={category.imageUrl} alt={category.name} />
//             <h2>{category.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


// src/components/home.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Assuming you have a Home.css file for styling

function Home({ setShowUncontrolled }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');
      if (!response.ok) {
        console.error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
        return;
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Received non-JSON response');
        return;
      }
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setShowUncontrolled(false); // Hide UncontrolledExample
    navigate(`/products/${categoryName}`);
  };

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200; // Adjust this value based on how much you want to scroll
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <div id="categories-container">
        <div id="categories" ref={categoriesRef}>
          <button id="scroll-left" className="scroll-button" onClick={() => scroll('left')}>
            {"<"}
          </button>
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.imageUrl} alt={category.name} />
              <br />
              <h2>{category.name}</h2>
            </div>
          ))}
          <button id="scroll-right" className="scroll-button" onClick={() => scroll('right')}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;



