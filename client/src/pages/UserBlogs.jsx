import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const UserBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`/api/blog/userblog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])
    console.log(blogs)
    return (
        <div>
            {blogs && blogs.map((blog) =>
                <BlogCard
                    key={blog._id}
                    id={blog._id}
                    isUser={localStorage.getItem('userId') === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    time={blog.createdAt}
                />)}
        </div>
    )
}

export default UserBlogs