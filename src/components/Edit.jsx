import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config";

const Edit = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${API_URL}/blogs/${id}`)
      .then((res) => res.json()) 
      .then((data) => {
        setTitle(data.title);   
        setBody(data.body);     
        setAuthor(data.author); 
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const updatedBlog = { title, body, author }; 

    fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog), 
    })
      .then(() => {
        navigate(`/blogs/${id}`); 
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  return (
    <div className="edit">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label>Blog Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Edit;