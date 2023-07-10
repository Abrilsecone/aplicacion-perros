import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchValue} onChange={handleChange} placeholder="Search by name" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;



/*Se importa la función useState desde React. useState se utiliza para definir y manejar el estado de un componente funcional.

La función SearchBar es el componente principal exportado. Recibe la prop onSearch, que es una función que se ejecutará cuando se realice una búsqueda.

Se utiliza useState para definir el estado searchValue y su función setSearchValue. searchValue representa el valor actual de la barra de búsqueda.

La función handleChange se utiliza como un controlador de eventos para el evento onChange del elemento de entrada (input). Cuando se llama a handleChange, se actualiza el estado searchValue con el valor ingresado en la barra de búsqueda.

La función handleSubmit se utiliza como un controlador de eventos para el evento onSubmit del formulario (form). Cuando se envía el formulario, se previene el comportamiento predeterminado del evento (la recarga de la página) utilizando event.preventDefault(). Luego se llama a onSearch con el valor actual de searchValue como argumento.

Se renderiza un formulario (<form>) que contiene un campo de entrada (<input>) y un botón de búsqueda (<button>).

El campo de entrada tiene los siguientes atributos:

type="text": indica que el campo de entrada es de tipo texto.
value={searchValue}: establece el valor del campo de entrada como el estado searchValue.
onChange={handleChange}: llama a la función handleChange cuando el valor del campo de entrada cambia.
placeholder="Search by name": muestra un texto de marcador de posición en el campo de entrada.
El botón de búsqueda tiene el atributo type="submit", lo que indica que es un botón de envío del formulario. Cuando se hace clic en este botón, se activará el evento onSubmit del formulario y se llamará a la función handleSubmit.

En resumen, este componente de barra de búsqueda permite al usuario ingresar un término de búsqueda y enviarlo mediante un botón. El valor ingresado se guarda en el estado searchValue, y cuando se envía el formulario, se llama a la función onSearch con el término de búsqueda como argumento.*/