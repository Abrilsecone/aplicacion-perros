import React from "react";
import "./ErrorMessage.css";

// Componente funcional ErrorMessage
export default function ErrorMessage({ message }) {
  return <label className="message">{message}</label>;
}

/*Este código define un componente funcional llamado ErrorMessage que representa un mensaje de error en la interfaz. A continuación, se explican las partes del código:

El componente ErrorMessage es exportado como el valor predeterminado (export default) para que pueda ser utilizado en otros archivos.
El componente ErrorMessage acepta una prop llamada message, que se utiliza para pasar el mensaje de error que se mostrará.
El componente ErrorMessage devuelve un elemento JSX que representa el mensaje de error.
El elemento label se utiliza para mostrar el mensaje de error dentro de un área etiquetada. Se le asigna la clase de estilo message, que se define en un archivo CSS separado (ErrorMessage.css).*/