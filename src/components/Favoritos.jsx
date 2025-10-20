import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favoritos = () => {
    const { store, dispatch } = useGlobalReducer();

    const handleRemove = (uid, category) => {
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: { uid, category }
        });
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-warning dropdown-toggle"
                type="button"
                id="favoritesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Favorites ({store.favorites.length})
            </button>

            <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="favoritesDropdown"
                style={{
                    minWidth: '320px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    border: '2px solid #FFE81F'
                }}
            >
                {store.favorites.length === 0 ? (
                    <li className="dropdown-item text-muted text-center py-3">
                        <span style={{ fontSize: '2rem' }}>⭐</span>
                        <p className="mb-0 mt-2">No favorites yet</p>
                        <small>Click ❤️ to add items</small>
                    </li>
                ) : (
                    store.favorites.map((fav) => (
                        <li
                            key={`${fav.category}-${fav.uid}`}
                            className="dropdown-item d-flex justify-content-between align-items-center py-2"
                            style={{ borderBottom: '1px solid #eee' }}
                        >
                            <Link
                                to={`/${fav.category}/${fav.uid}`}
                                className="text-decoration-none text-dark flex-grow-1"
                                style={{ fontWeight: '500' }}
                            >
                                <span className="badge bg-secondary me-2">
                                    {fav.category === 'people' ? '👤' : fav.category === 'vehicles' ? '🚀' : '🪐'}
                                </span>
                                {fav.name}
                            </Link>
                            <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove(fav.uid, fav.category);
                                }}
                                style={{ fontSize: '0.9rem' }}
                            >
                                🗑️
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};