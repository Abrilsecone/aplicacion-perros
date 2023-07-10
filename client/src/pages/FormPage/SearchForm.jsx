import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Search.css'

// reducers
import { fetchAllTemperaments } from "../../redux/temperamentSlice";
import { getByTemperament, searchByName } from "../../redux/dogSlice";

function Search() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments.list);
  const selected = useSelector((state) => state.dogs.selectedTemperament);
  // search input
  const [input, setInput] = useState("");
  const handleInput = ({ target }) => {
    setInput(target.value);
  };
   const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchByName(input));
    setInput("");
  };

  // select temperaments
  const options = temperaments.length
    ? temperaments.map((t) => {
        return { label: t.name, value: t.name };
      })
    : [];
  const selectHandleOnChange = ({ target }) => {
    dispatch(getByTemperament(target.value));
  };

  useEffect(() => {
    dispatch(fetchAllTemperaments());
  }, [dispatch]);

  return (
    <div className="search-bar">
      <form>
        <input
          type="text"
          className="search_input"
          placeholder="Search by name..."
          onChange={handleInput}
          value={input}
        />
        <button className='search_button' type='submit' onClick={handleSearch}>
					<svg className='search_icon' aria-hidden='true' viewBox='0 0 24 24'>
						<path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
					</svg>
				</button>
      </form>
      <div className="search_select">
        <label>
          <select onChange={selectHandleOnChange} value={selected}>
            <option key="0" value="0">
              Select Temperament...
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default Search;


/*Importa las dependencias necesarias de React y Redux, así como los estilos adicionales.
Importa las acciones de Redux necesarias para obtener la lista de temperamentos, buscar perros por nombre y filtrar perros por temperamento.
Configura el estado inicial del componente utilizando el hook useState. Esto incluye el estado para el valor de entrada de búsqueda.
Obtiene la lista de temperamentos desde el estado global utilizando el hook useSelector.
Obtiene el valor del temperamento seleccionado desde el estado global utilizando el hook useSelector.
Define una función de manejo de eventos para actualizar el estado del valor de entrada de búsqueda cuando cambia.
Define una función de manejo de eventos para realizar la búsqueda cuando se envía el formulario. La función despacha la acción searchByName con el valor de búsqueda actualizado y luego reinicia el valor de entrada a una cadena vacía.
Define una función de manejo de eventos para filtrar perros por temperamento cuando se selecciona un temperamento en el menú desplegable. La función despacha la acción getByTemperament con el valor de temperamento seleccionado.
Utiliza el hook useEffect para obtener la lista de temperamentos al cargar el componente utilizando la acción fetchAllTemperaments.
Renderiza la interfaz de usuario del componente, que consiste en un formulario de búsqueda con un campo de entrada y un botón de búsqueda, así como un menú desplegable para seleccionar un temperamento.
Cuando se realiza una búsqueda, el componente despacha la acción correspondiente para realizar la búsqueda y mostrar los resultados.
Cuando se selecciona un temperamento, el componente despacha la acción correspondiente para filtrar los perros por ese temperamento y mostrar los resultados.
En resumen, este código implementa un componente de búsqueda que interactúa con el estado global de Redux para buscar y filtrar perros por nombre y temperamento en una aplicación web.*/