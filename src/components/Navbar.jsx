import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logoStarWars from "../assets/img/star_wars_logo.png";
import { Favoritos } from "./Favoritos";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav
      className="navbar navbar-dark"
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/d0/93/c9/d093c96a6083d978b832811648b8766a.gif')",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black" }} >

      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logoStarWars}
            alt="Logo de Star Wars"
            width="95"
            height="65"
            className="d-inline-block align-text-top ms-3"
          />
        </Link>

         <div className="flex-grow-1 mx-4" style={{ maxWidth: '500px' }}>
          <SearchBar />
        </div>

        <div className="d-flex">
          <Favoritos />
        </div>
      </div>
    </nav>
  );
};