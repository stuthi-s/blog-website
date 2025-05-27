import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:8000/blogs/' + id)
      .then((res) => res.json()) 
      .then((data) => {
        setTitle(data.title);   
        setBody(data.body);     
        setAuthor(data.author); 
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const updatedBlog = { body }; 

    fetch('http://localhost:8000/blogs/' + id, {
      method: 'PUT', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog), 
    })
      .then(() => {
        navigate(`/blog/${id}`); 
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
          value={title} 
          disabled/>

        <label>Blog Body:</label>
        <textarea
          required
          value={body} 
          onChange={(e) => setBody(e.target.value)}>
        </textarea>

        <label>Blog Author:</label>
        <input
          type="text"
          value={author}
          disabled />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Edit;
