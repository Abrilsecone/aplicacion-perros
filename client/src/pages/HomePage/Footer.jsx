import React from "react";
import "./Footer.css";
import { Linkedin, Github } from "../../img/SvgIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>Developed by Abril Secone.</span>
        <a
          href="https://www.linkedin.com/in/abril-secone-a93755263/"
          title="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </a>
        <a
          href="https://github.com/Abrilsecone"
          title="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}


/*Este código representa un componente llamado Footer en React. El componente muestra el pie de página de la página web, que incluye información sobre el desarrollador y enlaces a perfiles de LinkedIn y GitHub.

El componente utiliza las siguientes importaciones: Linkedin y Github (iconos de redes sociales), que se encuentran en el directorio "../../img/SvgIcons".

En la renderización del componente, se muestra un contenedor con tres elementos: un texto que indica que el desarrollo fue realizado por Abril Secone, un enlace al perfil de LinkedIn y otro enlace al perfil de GitHub. Los enlaces se abren en una nueva pestaña del navegador mediante el uso de los atributos target="_blank" y rel="noreferrer".

En resumen, este componente Footer muestra el pie de página de la página web con información sobre el desarrollador y enlaces a perfiles de redes sociales.*/