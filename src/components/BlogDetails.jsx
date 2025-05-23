import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./../hooks/useFetch";
import API_URL from "../config";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(`${API_URL}/blogs/${id}`);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    fetch(`${API_URL}/blogs/${blog.id}`, {
      method: 'DELETE'
    }).then(() => {
      console.log('Blog deleted');
      navigate('/');
    }) 
  };

  const handleEditClick = () => {
    navigate(`/edit/${blog.id}`);
  };

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>

          <button className="btn btn-delete" onClick={handleDeleteClick}>Delete</button>
          <button className="btn btn-edit" onClick={handleEditClick}>Edit</button>
        </article>
      )}
    </div>
  )
}
 
export default BlogDetails;