//este componente representa la barra de navegación de la aplicación. Muestra el logotipo, un formulario de búsqueda (si la prop search es verdadera), un enlace para crear una nueva raza de perro y un enlace para volver a la página de inicio.

import React from "react";
import SearchForm from "../FormPage/SearchForm";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo";
import "./NavBar.css";
import { clearDogs } from "../../redux/dogSlice";
import { clearTemperaments } from "../../redux/temperamentSlice";
import { useDispatch } from "react-redux";

function NavBar({ search }) {          //El componente utiliza Link de react-router-dom para crear enlaces de navegación a diferentes rutas de la aplicación.
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearTemperaments());
    dispatch(clearDogs());
  };

  return (
    <div className="navigation">
      <Logo />

      {search && (
        <>
          <SearchForm />
          <Link to="/newBreed" className="nav-link">   
            Create your Breed
          </Link>
        </>
      )}

      <Link to="/" className="nav-link" onClick={handleLogOut}>
        Landing Page
      </Link>
    </div>
  );
}

export default NavBar;


/*



Si la prop search es verdadera, se renderiza el componente SearchForm y un enlace <Link> que lleva al usuario a la ruta "/newBreed" con la etiqueta "Create your Breed".

Siempre se muestra un enlace <Link> que lleva al usuario a la ruta "/" (página de inicio) con la etiqueta "Landing Page". Al hacer clic en este enlace, se activa la función handleLogOut, que utiliza dispatch para llamar a las acciones clearTemperaments y clearDogs. Estas acciones limpian los datos de las razas de perro y los temperamentos almacenados en el estado de Redux.

En resumen, */