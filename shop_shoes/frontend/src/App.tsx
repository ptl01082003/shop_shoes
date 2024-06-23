import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import CheckOutPage from './pages/CheckOutPage';
import ConfirmmationPage from './pages/ConfirmmationPage';
import ContactPage from './pages/ContactPage';
import ElementsPage from './pages/ElementsPage';
import LoginPage from './pages/LoginPage';
import SingleBlog from './pages/SingleBlog';
import SingleProduct from './pages/SingleProduct';
import TrackingPage from './pages/TrackingPage';
function App() {
  return (
		<>
			<Routes>
				<Route path="/trang-chu" element={<HomePage/>} />
				<Route path="/gio-hang" element={<CartPage/>} />
				<Route path="/blog" element={<BlogPage/>} />
        <Route path="/san-pham" element={<CategoryPage/>} />
        <Route path="/thanh-toan" element={<CheckOutPage/>} />
        <Route path="/xac-nhan-tt" element={<ConfirmmationPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/element" element={<ElementsPage/>} />
        <Route path="/login" element={<LoginPage/>} />  
        <Route path="/detail-blog" element={<SingleBlog/>} />
        <Route path="/detail-product" element={<SingleProduct/>} />
        <Route path="/tracking" element={<TrackingPage/>} />
				<Route path="/login" element={<div >login</div>} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
			
		</>
	);
}

export default App;
