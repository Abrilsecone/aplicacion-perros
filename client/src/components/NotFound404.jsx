import React from "react";
import "./NotFound404.css";
import { Link } from 'react-router-dom';

export default function NotFound404() {
  return (
    <div className="empty">
      <h2>¡Ups! Algo salió mal</h2>
      <h3><Link to='/breeds'>Volver a inicio</Link></h3>
      <img alt='Buscando...' src='/assets/notfound.gif' />
    </div>
  );
}


/*Este código define un componente funcional llamado NotFound404 que representa una página de error 404 cuando una ruta no se encuentra. A continuación, se explican las partes del código:

El componente NotFound404 devuelve un elemento JSX que representa un contenedor <div> con la clase CSS "empty". Esta clase se define en el archivo de estilo "NotFound404.css" y se utiliza para aplicar estilos específicos a este componente.
Dentro del contenedor <div>, se encuentran los siguientes elementos:
Un encabezado <h2> que muestra el mensaje "¡Ups! Algo salió mal". Este mensaje indica que algo ha salido mal y la página solicitada no se encuentra.
Un encabezado <h3> que contiene un enlace <Link> de react-router-dom. El enlace redirige al usuario de vuelta a la página de inicio, especificada por la ruta "/breeds".
Un elemento <img> que muestra una imagen de búsqueda con el atributo alt establecido en "Buscando...". Esta imagen puede servir como una representación visual del estado de "no encontrado".
Este componente se utiliza para mostrar una página de error cuando una ruta no se encuentra. El enlace proporcionado permite al usuario volver a la página de inicio. Asegúrate de tener definida la ruta correspondiente en tu archivo de enrutamiento.*/