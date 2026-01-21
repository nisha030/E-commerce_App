import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import OrderTracking from "./pages/OrderTracking"
import Review from "./pages/Review"
import Cart from "./pages/Cart"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
   <div className="px-0">
     <ToastContainer />
     <Navbar />
     <SearchBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/collection" element={<Collection />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/login" element={<Login />} />
       <Route path="/product/:id" element={<Product />} />
       <Route path="/placeOrder" element={<PlaceOrder />} />
       <Route path="/orders" element={<Orders />} />
       <Route path="/order-tracking/:id" element={<OrderTracking />} />
       <Route path="/review/:id" element={<Review />} />
       <Route path="/cart" element={<Cart />} />
       {/* <Route path="/product/:id" element={<Product />} />
       <Route path="/collection/:id" element={<Collection />} />
       <Route path="/about/:id" element={<About />} />
       <Route path="/contact/:id" element={<Contact />} /> */}
     </Routes>
     <Footer/>

    </div>
  )
}

export default App
