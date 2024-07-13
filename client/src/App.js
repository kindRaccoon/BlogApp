import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';
import Blogs from "./pages/Blogs";
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from './pages/CreateBlog';
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        <Route path="/userblogs" element={<UserBlogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
