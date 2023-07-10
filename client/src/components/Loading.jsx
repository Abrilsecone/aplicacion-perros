import React from 'react'

export default function Loading() {
  return (
      <div style={{ textAlign:'center', width:'100%' }}>
          <img alt='loading...' src='../../../assets/loading-bone.gif' />
      </div>
  )
}


/*Este código define un componente funcional llamado Loading que representa una animación de carga en la interfaz. A continuación, se explican las partes del código:

El componente Loading devuelve un elemento JSX que representa un contenedor <div> centrado horizontalmente en el centro de su contenedor padre. Esto se logra mediante la propiedad textAlign establecida en 'center'.
Dentro del contenedor <div>, se encuentra un elemento <img> que muestra la animación de carga. El atributo alt especifica el texto alternativo para la imagen, que se mostrará si la imagen no se carga correctamente.
El atributo src del elemento <img> apunta a '../../../assets/loading-bone.gif', que es la ruta de la imagen de carga. Ten en cuenta que la ruta puede variar dependiendo de la estructura de tu proyecto y la ubicación de la imagen de carga.
Este componente se utiliza para mostrar una animación de carga mientras se espera la carga de datos o la realización de una acción asincrónica en la interfaz. Puedes ajustar el estilo del contenedor <div> según tus necesidades.*/