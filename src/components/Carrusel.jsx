import { Card } from "./Card";

export const Carrusel = ({ title, items, category, loading = false }) => {
  
  if (loading) {
    return (
      <div className="mb-5">
        <h2 className="text-warning mb-3">{title}</h2>
        <div className="d-flex gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={n} 
              className="card placeholder-glow" 
              style={{ width: "18rem", height: "400px" }}>
              <div className="placeholder col-12" style={{ height: "250px" }}></div>
              <div className="card-body">
                <h5 className="card-title placeholder col-6"></h5>
                <div className="placeholder col-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!items || items.length === 0) {
    return (
      <div className="mb-5">
        <h2 className="text-warning mb-3">{title}</h2>
        <p className="text-muted">No items found.</p>
      </div>
    );
  }
  
  return (
    <div className="mb-5">
      <h2 className="text-warning mb-3">{title}</h2>
      <div 
        className="d-flex gap-3 overflow-auto pb-3"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#FFE81F #343a40',
          scrollBehavior: 'smooth' }} >
        {items.map((item) => (
          <div key={`${category}-${item.uid}`} className="flex-shrink-0">
            <Card item={item} category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};