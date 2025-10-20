import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { loadPeople, loadVehicles, loadPlanets } from "../store";
import { Carrusel } from "../components/Carrusel";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState({
    people: false,
    vehicles: false,
    planets: false
  });
  
  useEffect(() => {
    const loadAllData = async () => {
      if (store.people.length === 0) {
        setLoading(prev => ({ ...prev, people: true }));
        await loadPeople(dispatch, store.people);
        setLoading(prev => ({ ...prev, people: false }));
      }
      if (store.vehicles.length === 0) {
        setLoading(prev => ({ ...prev, vehicles: true }));
        await loadVehicles(dispatch, store.vehicles);
        setLoading(prev => ({ ...prev, vehicles: false }));
      }
      if (store.planets.length === 0) {
        setLoading(prev => ({ ...prev, planets: true }));
        await loadPlanets(dispatch, store.planets);
        setLoading(prev => ({ ...prev, planets: false }));
      }
    };
    
    loadAllData();
  }, []);
  
  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 className="display-4 text-warning fw-bold mb-3">
          Star Wars Database
        </h1>
        <p className="lead text-muted">
          Explore the galaxy far, far away...
        </p>
      </div>
      
      <Carrusel 
        title="Characters" 
        items={store.people} 
        category="people"
        loading={loading.people}
      />
      
      <Carrusel 
        title="Vehicles" 
        items={store.vehicles} 
        category="vehicles"
        loading={loading.vehicles}
      />
      
      <Carrusel 
        title="Planets" 
        items={store.planets} 
        category="planets"
        loading={loading.planets}
      />
    </div>
  );
};