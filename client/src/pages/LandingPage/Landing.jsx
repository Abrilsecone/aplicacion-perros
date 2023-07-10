//este componente representa la página de inicio de la aplicación y proporciona un botón para iniciar la navegación hacia la página de razas, así como enlaces a perfiles de redes sociales del desarrollador


import React from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { Github, Linkedin } from "../../img/SvgIcons";

export default function Landing() {      // iliza useHistory de react-router-dom para acceder al historial de navegación y redirigir al usuario a la página de razas cuando se hace clic en el botón "START".
  const history = useHistory();       
  const handleClick = () => {          //función handleClick, utiliza el historial para redirigir al usuario a la ruta "/breeds".
    history.push("/breeds");
  };
  return (
    <div className="LandingContainer">
      <div className="Intro">
        <h1>CanineConnect</h1>
        <div>
          <div className="LaunchButton" onClick={handleClick}>   
            <span>START</span>
          </div>
          <div className="SocialLink">     
            <a
              href="https://www.linkedin.com/in/abril-secone-a93755263/"  //Los íconos de LinkedIn y GitHub  muestran como elementos SVG en los enlaces.
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/Abrilsecone"
              title="GitHub"
              target="_blank"      //Los enlaces se abren en una nueva pestaña utilizando el atributo target="_blank".
              rel="noreferrer"
            >
              <Github />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}












/*Este código representa un componente de React llamado Landing que muestra la página de inicio de la aplicación.

El componente utiliza useHistory de react-router-dom para acceder al historial de navegación y redirigir al usuario a la página de razas cuando se hace clic en el botón "START".

Dentro del componente, hay un contenedor principal con la clase CSS "LandingContainer". Dentro de este contenedor, se encuentra un elemento de encabezado <h1> que muestra el título "CanineConnect".

Luego, hay un contenedor secundario que contiene un botón de lanzamiento con la clase CSS "LaunchButton". Cuando se hace clic en este botón, se activa la función handleClick, que utiliza el historial para redirigir al usuario a la ruta "/breeds".

Finalmente, hay un contenedor llamado "SocialLink" que contiene enlaces a los perfiles de LinkedIn y GitHub del desarrollador. Los enlaces se abren en una nueva pestaña utilizando el atributo target="_blank". Los íconos de LinkedIn y GitHub se importan desde el archivo de imágenes y se muestran como elementos SVG en los enlaces.

En resumen, este componente representa la página de inicio de la aplicación y proporciona un botón para iniciar la navegación hacia la página de razas, así como enlaces a perfiles de redes sociales del desarrollador.*/