import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const blog = { title, body, author };

    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error("Error creating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      {error && <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="Blog author"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Blog...' : 'Add Blog'}
        </button>
      </form>
    </div>
  )
}

export default Create;