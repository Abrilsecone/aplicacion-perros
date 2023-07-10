import React from "react";
import { Sort } from "../../img/SvgIcons";
import { getBySource, getByOrden } from "../../redux/dogSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const { source, order, searchName } = useSelector((state) => state.dogs);

  const handleOrder = ({ currentTarget }) => {
    const newOrder = {};
    newOrder[currentTarget.name] = currentTarget.value;
    dispatch(getByOrden(newOrder));
  };

  const handleSourceFilter = (source) => {
    dispatch(getBySource(source));
  };

  return (
    <div className="container">
      <div>
        <h1>
          DOGS
          {searchName ? <span> [ {searchName} ]</span> : ""}
        </h1>
      </div>

      <div>
        <label>Select source:</label>

        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="ALL"
            checked={source === "ALL"}
            onChange={() => handleSourceFilter("ALL")}
            onClick={() => handleSourceFilter("ALL")}
          />
          All
          <i></i>
        </label>
        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="API"
            checked={source === "API"}
            onChange={() => handleSourceFilter("API")}
          />
          API
          <i></i>
        </label>
        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="DB"
            checked={source === "DB"}
            onChange={() => handleSourceFilter("DB")}
          />
          Yours
          <i></i>
        </label>
      </div>

      <div>
        <button
          title="Alphabetic order"
          name="ALPHABETIC"
          className={order.ALPHABETIC ? "active" : ""}
          value={order["ALPHABETIC"] === "ASC" ? "DESC" : "ASC"}
          onClick={handleOrder}
        >
          <Sort order={order["ALPHABETIC"]} />
          <span>Alphabetic</span>
        </button>

        <button
          title="Order by weight"
          name="WEIGHT"
          className={order.WEIGHT ? "active" : ""}
          value={order["WEIGHT"] === "ASC" ? "DESC" : "ASC"}
          onClick={handleOrder}
        >
          <Sort order={order["WEIGHT"]} />
          <span>Weight</span>
        </button>
      </div>
    </div>
  );
}


/*Este código representa un componente llamado Header en React. El componente muestra el encabezado de la página que contiene un título, opciones de filtro de origen y botones de ordenamiento.

El componente utiliza las siguientes importaciones: Sort (icono de ordenamiento), getBySource y getByOrden (acciones de Redux), useDispatch y useSelector (hooks de Redux).

Dentro del componente, se obtienen los valores de source, order y searchName del estado global utilizando el hook useSelector de Redux.

El componente define una función handleOrder para manejar los eventos de clic en los botones de ordenamiento. Esta función dispatcha la acción getByOrden con el nuevo orden seleccionado.

También se define la función handleSourceFilter para manejar el evento de cambio de filtro de origen. Esta función dispatcha la acción getBySource con el nuevo origen seleccionado.

En la renderización del componente, se muestra el título "DOGS" y, si hay un valor de búsqueda (searchName), se muestra entre corchetes.

A continuación, se muestran las opciones de filtro de origen. Se utilizan etiquetas de radio para permitir al usuario seleccionar una opción. Cada opción tiene un evento onChange que llama a la función handleSourceFilter con el valor correspondiente.

Luego, se muestran los botones de ordenamiento. Cada botón tiene un evento onClick que llama a la función handleOrder con el nombre y el valor del orden seleccionado. El botón también muestra un icono de ordenamiento (Sort) y un texto descriptivo.

En resumen, este componente Header muestra el encabezado de la página con un título, opciones de filtro de origen y botones de ordenamiento. Al seleccionar una opción de origen o hacer clic en un botón de ordenamiento, se disparan acciones de Redux para actualizar el estado correspondiente.*/