import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SearchBar = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const allResults = [];
    
    const peopleResults = store.people
      .filter(item => item.name.toLowerCase().includes(searchLower))
      .map(item => ({ ...item, category: 'people' }));
    
    const vehicleResults = store.vehicles
      .filter(item => item.name.toLowerCase().includes(searchLower))
      .map(item => ({ ...item, category: 'vehicles' }));
    
    const planetResults = store.planets
      .filter(item => item.name.toLowerCase().includes(searchLower))
      .map(item => ({ ...item, category: 'planets' }));
    
    allResults.push(...peopleResults, ...vehicleResults, ...planetResults);
    
    setResults(allResults.slice(0, 10));
    setShowDropdown(allResults.length > 0);
  }, [searchTerm, store.people, store.vehicles, store.planets]);
  
  const handleSelect = (item) => {
    navigate(`/${item.category}/${item.uid}`);
    setSearchTerm("");
    setShowDropdown(false);
  };
  
  const getCategoryIcon = (category) => {
    const icons = {
      people: '👤',
      vehicles: '🚀',
      planets: '🪐'
    };
    return icons[category] || '⭐';
  };
  
  const getCategoryLabel = (category) => {
    const labels = {
      people: 'Character',
      vehicles: 'Vehicle',
      planets: 'Planet'
    };
    return labels[category] || category;
  };
  
  return (
    <div className="position-relative" ref={searchRef}>
       <style>{`
        .search-bar-input::placeholder { color: #e69215ff; }
      `}</style>
      <div className="input-group">
        <span className="input-group-text bg-dark border-warning">
          <span style={{ color: '#FFE81F' }}>🔍</span>
        </span>
        <input
          type="text"
          className="form-control border-warning search-bar-input"
          placeholder="Search characters, vehicles, planets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowDropdown(true)}
          style={{
            backgroundColor: '#1a1a1a',
            color: '#FFE81F',
            border: '1px solid #FFE81F'
          }}
        />
        {searchTerm && (
          <button
            className="btn btn-outline-warning"
            onClick={() => {
              setSearchTerm("");
              setShowDropdown(false);
            }} >
            ✕
          </button>
        )}
      </div>
      
      {showDropdown && results.length > 0 && (
        <div
          className="position-absolute w-100 bg-dark border border-warning rounded mt-1 shadow-lg"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          <ul className="list-group list-group-flush">
            {results.map((item) => (
              <li
                key={`${item.category}-${item.uid}`}
                className="list-group-item list-group-item-action bg-dark text-light border-0"
                onClick={() => handleSelect(item)}
                style={{
                  cursor: 'pointer',
                  borderBottom: '1px solid #333'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#212529'} >
                <div className="d-flex align-items-center">
                  <span className="me-2" style={{ fontSize: '1.5rem' }}>
                    {getCategoryIcon(item.category)}
                  </span>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-warning">{item.name}</div>
                    <small className="text-muted">{getCategoryLabel(item.category)}</small>
                  </div>
                  <span className="text-warning">→</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showDropdown && searchTerm && results.length === 0 && (
        <div
          className="position-absolute w-100 bg-dark border border-warning rounded mt-1 shadow-lg p-3 text-center"
          style={{ zIndex: 1000 }}
        >
          <span style={{ fontSize: '2rem' }}>🔍</span>
          <p className="text-muted mb-0 mt-2">No results found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};