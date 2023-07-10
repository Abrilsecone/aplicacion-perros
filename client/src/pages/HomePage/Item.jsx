import React from "react";
import { Link } from "react-router-dom";
import './Item.css'

export default function Item({
  id,
  name,
  weightMin,
  weightMax,
  image,
  temperament,
}) {
  // text for weight
  let weightTxt = " - - ";
  if (weightMin && weightMax) {
    weightTxt = weightMin + " - " + weightMax + " Kg";
  } else {
    if (weightMin || weightMax) {
      weightTxt = (weightMin ? weightMin : weightMax) + " Kg";
    }
  }
  const placeholder = "../../../assets/placeholder_dog.png";
  return (
    <div className="card">
      <Link to={`/detail/${id}`}>
        <div className="card-header">
          <img src={image ?? placeholder} alt={name} loading="lazy" />
        </div>
        <div className="card-body">
          <h4>{name}</h4>
          <p>
            {temperament &&
              temperament
                .slice(0, 3)
                .map((t, i) => <span key={t}>{i === 2 ? t : t + ", "}</span>)}
          </p>
        </div>
        <div className="bottom">
          <span>WEIGHT: {weightTxt}</span>
        </div>
      </Link>
    </div>
  );
}


/*Este código representa un componente llamado Item en React. El componente muestra la información de un elemento de la lista de perros.

El componente recibe las siguientes propiedades: id, name, weightMin, weightMax, image y temperament.

Dentro del componente, se define la variable weightTxt para representar el texto del peso. Si se proporcionan valores para weightMin y weightMax, se muestra el rango de peso (por ejemplo, "5 - 10 Kg"). Si solo se proporciona uno de los valores, se muestra ese valor específico de peso.

El componente renderiza una tarjeta (div con la clase CSS "card") que contiene un enlace (Link) hacia el detalle del perro con el ID correspondiente.

Dentro del enlace, se muestra la imagen del perro. Si no se proporciona una imagen, se muestra una imagen de marcador de posición.

En el cuerpo de la tarjeta, se muestra el nombre del perro (name) como un encabezado (h4) y se muestra una lista de temperamentos (temperament) limitada a tres elementos. Cada temperamento se muestra como un elemento span separado por comas.

En la parte inferior de la tarjeta, se muestra el texto "WEIGHT: " seguido del valor de peso (weightTxt).

En resumen, este componente muestra la información de un perro en una tarjeta. Muestra el nombre, la imagen, los temperamentos y el peso del perro. Al hacer clic en la tarjeta, se navegará hacia la página de detalle del perro correspondiente.*/
