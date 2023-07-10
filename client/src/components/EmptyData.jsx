import React from "react";
import "./emptyData.css";

// Componente funcional EmptyData
export default function EmptyData() {
  return (
    <div className="empty">
      {/* Título para indicar que no hay razas que cumplan con el criterio */}
      <h3>No hay razas que cumplan con este criterio...</h3>

      {/* Título para sugerir la creación de una raza propia */}
      <h2>¡Crea la tuya propia!</h2>

      {/* Imagen de una animación o gráfico para representar la búsqueda */}
      <img alt="Buscando..." src="/assets/emptydata.gif" />
    </div>
  );
}



/*Este código define un componente funcional llamado EmptyData que representa un mensaje cuando no hay datos disponibles que cumplan con un cierto criterio. A continuación, se explican las partes del código:

El componente EmptyData es exportado como el valor predeterminado (export default) para que pueda ser utilizado en otros archivos.
El componente EmptyData devuelve una estructura de elementos JSX que representa la apariencia del mensaje cuando no hay datos.
El div principal tiene la clase de estilo empty, que se define en un archivo CSS separado (emptyData.css).
El primer h3 muestra el mensaje "No hay razas que cumplan con este criterio..." para indicar que no hay datos disponibles que cumplan con el criterio especificado.
El segundo h2 muestra el mensaje "¡Crea la tuya propia!" para sugerir al usuario que puede crear su propia raza de perro.
La etiqueta img muestra una imagen con la propiedad src establecida en "/assets/emptydata.gif". Esta imagen representa una animación o gráfico relacionado con la búsqueda.
Recuerda que para que este componente se muestre correctamente, es necesario tener definidos los estilos en el archivo CSS asociado (emptyData.css) y asegurarse de que la imagen "/assets/emptydata.gif" esté disponible en la ruta correcta.*/