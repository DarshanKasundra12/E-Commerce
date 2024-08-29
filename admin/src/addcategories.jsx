// import React, { useState } from 'react';
// import './addcategory.css';

// const AddCategory = () => {
//   const [name, setName] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const category = { name, imageUrl };

//     try {
//       const response = await fetch('http://localhost:3001/api/categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(category)
//       });

//       if (response.ok) {
//         alert('Category added successfully!');
//         setName('');
//         setImageUrl('');
//       } else {
//         alert('Failed to add category. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="addcategory-container">
//       <div className="addcategory-form">
//         <h1>Add Category</h1>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="name">Category Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
          
//           <label htmlFor="imageUrl">Image URL</label>
//           <input
//             type="url"
//             id="imageUrl"
//             name="imageUrl"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             required
//           />
          
//           <button type="submit">Add Category</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState } from 'react';
import './addcategory.css';

const AddCategory = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = { name, imageUrl };

    try {
      const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });

      if (response.ok) {
        alert('Category added successfully!');
        setName('');
        setImageUrl('');
        if (onCategoryAdded) {
          onCategoryAdded(category);  // Notify parent component
        }
      } else {
        alert('Failed to add category. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="addcategory-container">
      <div className="addcategory-form">
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
