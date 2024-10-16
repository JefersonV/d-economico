import React, { useEffect, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

function SearchResults({ dataSearch, onClose }) {
  const [ref, isClickedOutside] = useClickOutside();

/*   // Si se hizo clic fuera, cerrar los resultados de búsqueda
  useEffect(() => {
    if (isClickedOutside) {
      onClose(); // Llama a la función para cerrar los resultados
    }
  }, [isClickedOutside, onClose]); */

  return (
    <div className="search-results-container">
      <div  className="search-results-grid">
      {dataSearch?.map((item, index) => (
          <div key={index} className="search-result-item">
            <img src="" alt="" className="thumbnail" />
            <div className="result-info">
              <h4 className="result-title">{item?.nombre}{item?.apellido}</h4>
              <p className="result-description">as</p>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default SearchResults;