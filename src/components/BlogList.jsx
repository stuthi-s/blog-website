import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      // Update the blogs state by filtering out the deleted blog
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
          <div className="blog-actions">
            <Link to={`/edit/${blog.id}`} className="btn btn-edit">Edit</Link>
            <button 
              className="btn btn-delete"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;