import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import AddCategory from "./pages/AddCategory";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} /> {/* route to home page */}
         <Route path="/add-category" element={<AddCategory />} />
         <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;