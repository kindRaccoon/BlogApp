import { useState, useEffect } from "react"
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const { data } = await axios.get("/api/blog/all");
                if (data) {
                    setBlogs(data?.blogs)
                }

            } catch (err) {
                console.log(err)
            }
        }
        getAllBlogs()
    }, [])

    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog?.user?.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You Havent Created a blog</h1>
            )}
        </div>
    );
}


export default Blogs