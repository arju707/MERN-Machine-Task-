# MERN Stack Product Management App 

A full-featured **Product Management Web Application** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). The app supports user authentication, category/sub-category management, product creation with variants and images, search, filtering, pagination, wishlist functionality, and product editing.

---

## Features

-  **JWT-based Authentication**
-  **Add/Edit Products** with:
  - Title, description
  - Sub-category selection
  - Multiple variants (RAM, price, quantity)
  - Multiple image uploads with preview & removal
-   **Search & Filter** Products by:
  - Search keyword
  - Sub-categories (checkbox filters)
-    **Product Details Page** (Flipkart-style UI)
-    **Wishlist Page** (slide-over UI + persistent in MongoDB)
-    Image upload using `multer` and stored in `/uploads` directory
-    Edit products via the Add Product form
-    Responsive design using **Tailwind CSS**

---

##   Tech Stack

| Frontend           | Backend          | Database   |
|--------------------|------------------|------------|
| React + Vite       | Express.js       | MongoDB Atlas / Compass |
| Tailwind CSS       | Node.js          | Mongoose ODM |
| Axios              | Multer (file upload) |        |

---

##  Folder Structure

project-root/
│
├── backend/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── uploads/ # Uploaded images
│ └── index.js # Express app entry
│
├── frontend/
│ ├── components/ # React components
│ ├── pages/ # Routes like Home, AddProduct, Wishlist, ProductDetail
│ ├── context/ # Wishlist context provider
│ └── App.jsx # Route setup


##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app


2.  Backend Setup (/backend)
bash
Copy
Edit
cd backend
npm install

Create a .env file in /backend:

env
Copy
Edit
PORT=5000
MONGO_URL=your_mongodb_connection_string

Run backend server:

bash
Copy
Edit
npm run dev
This will start the backend at http://localhost:5000/



3. Frontend Setup (/frontend)
bash
Copy
Edit
cd frontend
npm install
Run frontend app:

bash
Copy
Edit
npm run dev
This will start the React frontend at http://localhost:5173/


 Testing Tips
 Visit http://localhost:5173/ to access the app.

 Add categories and sub-categories using the sidebar.

 Add a product with variants and images.

 Use search bar and filters on the homepage.

 Click a product to view details.

 Use ❤️ to add to wishlist and view it.

 Click "Edit Product" to update an existing product.


 Notes :-
 
Images are stored in backend/uploads and served statically.

Wishlist items are stored in MongoDB and tied to userId (currently hardcoded or mocked).

Variants are saved as an array with { ram, price, quantity }.

