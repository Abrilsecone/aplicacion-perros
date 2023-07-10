import React from 'react';

// Componente funcional FilterOptions
const FilterOptions = ({ onFilterByTemperament, onFilterByOrigin, onSort }) => {
  // Función para manejar el filtrado por temperamento
  const handleFilterByTemperament = (temperament) => {
    onFilterByTemperament(temperament);
  };

  // Función para manejar el filtrado por origen
  const handleFilterByOrigin = (origin) => {
    onFilterByOrigin(origin);
  };

  // Función para manejar la ordenación
  const handleSort = (sortType) => {
    onSort(sortType);
  };

  // Renderización del componente
  return (
    <div>
      <button onClick={() => handleFilterByTemperament('temperament1')}>Filter by Temperament 1</button>
      <button onClick={() => handleFilterByTemperament('temperament2')}>Filter by Temperament 2</button>
      <button onClick={() => handleFilterByOrigin('api')}>Filter by API Origin</button>
      <button onClick={() => handleFilterByOrigin('database')}>Filter by Database Origin</button>
      <button onClick={() => handleSort('alphabetical')}>Sort Alphabetically</button>
      <button onClick={() => handleSort('weight')}>Sort by Weight</button>
    </div>
  );
};

// Exportación del componente FilterOptions
export default FilterOptions;



/*El componente FilterOptions recibe tres props: onFilterByTemperament, onFilterByOrigin y onSort. Estas props son funciones que se utilizarán para manejar los eventos de filtrado y ordenación.
El componente define tres funciones: handleFilterByTemperament, handleFilterByOrigin y handleSort. Estas funciones se utilizan para llamar a las funciones de manejo de eventos correspondientes pasando los valores adecuados.
El componente FilterOptions devuelve un elemento JSX que representa un conjunto de botones. Cada botón tiene un evento onClick que llama a la función de manejo correspondiente con el valor apropiado.
Cada botón tiene un texto descriptivo para indicar su función, por ejemplo, "Filter by Temperament 1" o "Sort Alphabetically".
Este componente se utiliza para proporcionar opciones de filtrado y ordenación en la interfaz, y se espera que las funciones onFilterByTemperament, onFilterByOrigin y onSort estén definidas y sean pasadas como props desde un componente padre.*/