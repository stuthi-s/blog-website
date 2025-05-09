import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="blog-title">
        <h1>My Blog</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ color: 'white', backgroundColor: '#7c5dfa', borderRadius: '8px' }}>New Blog</Link>
      </div>
    </nav>
  )
}

export default Navbar;