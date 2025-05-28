import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Stuthi');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch('http://localhost:3000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
        />

        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Blog body">
        </textarea>

        <label>Blog author:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Blog author">
        </input>

        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default Create;