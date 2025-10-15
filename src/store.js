const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return null;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export const initialStore = () => {
  return {
    people: loadFromLocalStorage('swapi_people') || [],
    vehicles: loadFromLocalStorage('swapi_vehicles') || [],
    planets: loadFromLocalStorage('swapi_planets') || [],
    favorites: loadFromLocalStorage('swapi_favorites') || []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    case 'SET_PEOPLE':
      saveToLocalStorage('swapi_people', action.payload);
      return {
        ...store,
        people: action.payload
      };
    
    case 'SET_VEHICLES':
      saveToLocalStorage('swapi_vehicles', action.payload);
      return {
        ...store,
        vehicles: action.payload
      };
    
    case 'SET_PLANETS':
      saveToLocalStorage('swapi_planets', action.payload);
      return {
        ...store,
        planets: action.payload
      };

    case 'ADD_FAVORITE': {
      const newFavorites = [...store.favorites, action.payload];
      saveToLocalStorage('swapi_favorites', newFavorites);
      return {
        ...store,
        favorites: newFavorites
      };
    }
    
    case 'REMOVE_FAVORITE': {
      const newFavorites = store.favorites.filter(
        fav => !(fav.uid === action.payload.uid && fav.category === action.payload.category)
      );
      saveToLocalStorage('swapi_favorites', newFavorites);
      return {
        ...store,
        favorites: newFavorites
      };
    }
    
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}


const fetchFromAPI = async (endpoint) => {
  const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};

export const loadPeople = async (dispatch, currentPeople) => {
  if (currentPeople.length > 0) {
    console.log('People already loaded from cache');
    return;
  }
  
  try {
    const data = await fetchFromAPI('people');
    dispatch({ type: 'SET_PEOPLE', payload: data.results });
  } catch (error) {
    console.error('Error loading people:', error);
  }
};

export const loadVehicles = async (dispatch, currentVehicles) => {
  if (currentVehicles.length > 0) {
    console.log('Vehicles already loaded from cache');
    return;
  }
  
  try {
    const data = await fetchFromAPI('vehicles');
    dispatch({ type: 'SET_VEHICLES', payload: data.results });
  } catch (error) {
    console.error('Error loading vehicles:', error);
  }
};

export const loadPlanets = async (dispatch, currentPlanets) => {
  if (currentPlanets.length > 0) {
    console.log('Planets already loaded from cache');
    return;
  }
  
  try {
    const data = await fetchFromAPI('planets');
    dispatch({ type: 'SET_PLANETS', payload: data.results });
  } catch (error) {
    console.error('Error loading planets:', error);
  }
};


export const getImageUrl = (category, id) => {
  const categoryMap = {
    people: 'characters',
    vehicles: 'vehicles',
    planets: 'planets'
  };
  
  const imageCategory = categoryMap[category] || category;
  return `https://starwars-visualguide.com/assets/img/${imageCategory}/${id}.jpg`;
};


export const isFavorite = (favorites, uid, category) => {
  return favorites.some(fav => fav.uid === uid && fav.category === category);
};

