import { Link } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getImageUrl, getDiceBearUrl, isFavorite } from "../store";

export const Card = ({ item, category }) => {
  const { store, dispatch } = useGlobalReducer();
  const [useDiceBear, setUseDiceBear] = useState(false);
  
  const isInFavorites = isFavorite(store.favorites, item.uid, category);
  
  const handleFavorite = () => {
    if (isInFavorites) {
      dispatch({
        type: 'REMOVE_FAVORITE',
        payload: { uid: item.uid, category: category }
      });
    } else {
      dispatch({
        type: 'ADD_FAVORITE',
        payload: {
          uid: item.uid,
          name: item.name,
          category: category
        }
      });
    }
  };
  
  const handleImageError = () => {
    setUseDiceBear(true);
  };
  
  const imageUrl = useDiceBear 
    ? getDiceBearUrl(category, item.name, item.uid)
    : getImageUrl(category, item.uid);
  
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img 
        src={imageUrl}
        className="card-img-top" 
        alt={item.name}
        style={{ 
          height: "250px", 
          objectFit: "cover",
          backgroundColor: '#1a1a1a'
        }}
        onError={handleImageError}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between">
          <Link to={`/${category}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button 
            className={`btn ${isInFavorites ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={handleFavorite}>
            {isInFavorites ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};