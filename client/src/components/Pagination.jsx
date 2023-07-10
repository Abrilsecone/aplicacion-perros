import React from "react";
import { LeftArrow, RightArrow, DoubleLeftArrow, DoubleRightArrow } from "../img/SvgIcons";

import './pagination.css'

export default function Pagination({
  handleChange,   //handleChange: una función de controlador que se ejecutará cuando se cambie de página.
  totalItems,   //totalItems: el número total de elementos para paginar.
  currentPage,   //currentPage: la página actual.
  countPerPage,  //countPerPage: la cantidad de elementos que se muestran por página.
}) {
  const pagesCount = Math.ceil(totalItems / countPerPage); 

  if (pagesCount === 1) return null;

  let firstNumber = 1;
  let lastNumber = 1;
  const adicionalNumbers = 2;   //La constante adicionalNumbers se establece en 2
  let countOfNumbers = adicionalNumbers * 2 + 1;

  if (countOfNumbers >= pagesCount) {
    countOfNumbers = pagesCount;    //Si countOfNumbers es mayor o igual que pagesCount, se actualiza countOfNumbers para que sea igual a pagesCount. Esto evita que se muestren más números de página de los disponibles.

  } else {
    firstNumber = Math.max(currentPage - adicionalNumbers, 1);
    lastNumber = Math.min(currentPage + adicionalNumbers, pagesCount);

    if (lastNumber === pagesCount) {
      firstNumber += lastNumber - firstNumber - adicionalNumbers * 2;
    }
  }

  const pageNumbers = new Array(countOfNumbers)
    .fill()
    .map((_, i) => i + firstNumber);

  return (
    <ul className="pagination-container">
      <li
        onClick={() => handleChange(1)}
        className={currentPage === 1 ? "disabled" : ""}
        title="First Page"
      >
        <DoubleLeftArrow />
      </li>
      <li
        onClick={() => handleChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
        title="Previous"
      >
        <LeftArrow />
      </li>

      {pageNumbers.map((number) => {
        return (
          <li
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => handleChange(number)}
          >
            {number}
          </li>
        );
      })}

      <li
        onClick={() => handleChange(currentPage + 1)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title="Next"
      >
        <RightArrow />
      </li>
      <li
        onClick={() => handleChange(pagesCount)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title="Last Page"
      >
        <DoubleRightArrow />
      </li>
    </ul>
  );
}




/*

En caso contrario, se actualizan las variables firstNumber y lastNumber para determinar el rango de números de página que se mostrarán. Si lastNumber es igual a pagesCount, se ajusta firstNumber para garantizar que se muestren countOfNumbers números de página.

Se crea un array de longitud countOfNumbers utilizando new Array(countOfNumbers). Luego se llama a fill() para llenar el array con valores vacíos. Finalmente, se utiliza map() para iterar sobre el array y generar los números de página. Los números se calculan agregando el índice actual (i) a firstNumber.

Se renderiza una lista (<ul>) con la clase CSS "pagination-container".

Se renderizan los elementos de la paginación. Hay cinco elementos <li>:

El primer elemento es el botón para ir a la primera página. Tiene un evento onClick que llama a handleChange(1) cuando se hace clic. La clase "disabled" se agrega si currentPage es igual a 1, lo que indica que la primera página está actualmente seleccionada.
El segundo elemento es el botón para ir a la página anterior. Tiene un evento onClick que llama a handleChange(currentPage - 1) cuando se hace clic. También se agrega la clase "disabled" si currentPage es igual a 1.
Los siguientes elementos corresponden a los números de página generados en el paso 11. Cada elemento tiene un evento onClick que llama a handleChange(number) cuando se hace clic. Se agrega la clase "selected" si currentPage es igual a number, lo que indica que el número de página actual está seleccionado.
El cuarto elemento es el botón para ir a la página siguiente. Tiene un evento onClick que llama a handleChange(currentPage + 1) cuando se hace clic. También se agrega la clase "disabled" si currentPage es igual a pagesCount.
El último elemento es el botón para ir a la última página. Tiene un evento onClick que llama a handleChange(pagesCount) cuando se hace clic. Se agrega la clase "disabled" si currentPage es igual a pagesCount.
En resumen, este componente de paginación genera una serie de botones y números de página que permiten al usuario navegar a través de diferentes páginas de contenido. La función handleChange se utiliza para manejar los eventos de cambio de página. Los estilos se definen en el archivo CSS correspondiente para dar formato y apariencia al componente.*/