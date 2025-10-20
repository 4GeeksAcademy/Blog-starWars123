import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getImageUrl, getDiceBearUrl, isFavorite } from "../store";

export const DetailView = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDiceBear, setUseDiceBear] = useState(false);
  
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://www.swapi.tech/api/${category}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [category, id]);
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!details) {
    return (
      <div className="container mt-5">
        <p>No details found</p>
      </div>
    );
  }
  
  const properties = details.properties;
  const name = properties.name;
  const isInFavorites = isFavorite(store.favorites, id, category);
  
  const handleFavorite = () => {
    if (isInFavorites) {
      dispatch({
        type: 'REMOVE_FAVORITE',
        payload: { uid: id, category }
      });
    } else {
      dispatch({
        type: 'ADD_FAVORITE',
        payload: { uid: id, name, category }
      });
    }
  };
  
  const handleImageError = () => {
    setUseDiceBear(true);
  };
  
  const imageUrl = useDiceBear
    ? getDiceBearUrl(category, name, id)
    : getImageUrl(category, id);
  
  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className="row">
        <div className="col-md-4">
          <img 
            src={imageUrl}
            alt={name}
            className="img-fluid rounded shadow"
            onError={handleImageError}
            style={{ 
              width: '100%', 
              maxHeight: '600px', 
              objectFit: 'cover',
              backgroundColor: '#1a1a1a'
            }}
          />
        </div>
        
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="display-4 text-warning">{name}</h1>
            <button 
              className={`btn ${isInFavorites ? 'btn-warning' : 'btn-outline-warning'} btn-lg`}
              onClick={handleFavorite}
            >
              {isInFavorites ? '❤️ Remove' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <div className="card shadow">
            <div className="card-header bg-dark text-warning">
              <h3>Details</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {Object.entries(properties).map(([key, value]) => {
                  if (key === 'url' || key === 'created' || key === 'edited' || key === 'name') {
                    return null;
                  }
                  
                  const formattedKey = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  return (
                    <div key={key} className="col-md-6 mb-3">
                      <strong className="text-muted">{formattedKey}:</strong>
                      <p className="mb-0">{value || 'N/A'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {details.description && (
            <div className="card shadow mt-4">
              <div className="card-body">
                <h4>Description</h4>
                <p>{details.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};