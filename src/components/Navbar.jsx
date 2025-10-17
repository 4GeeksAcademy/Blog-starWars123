import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
		
        <Link to="/" className="navbar-brand">
           <img src="https://www.citypng.com/photo/26103/yellow-neon-logo-star-wars-hd-png" alt="Logo de star wars" width="30" height="24" class="d-inline-block align-text-top"/>
        </Link>

        <div className="d-flex">
          <button className="btn btn-outline-warning">
            Favorites ({store.favorites.length})
          </button>
        </div>
      </div>
    </nav>
  );
};