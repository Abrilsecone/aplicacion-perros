import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

// Configurar la URL base de axios
axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


/*Este código es el punto de entrada de la aplicación. Aquí se configura la renderización del componente principal (App) dentro del elemento HTML con el identificador 'root' en el DOM.

Algunos puntos clave en este código son:

Se importa el estilo principal (index.css) que contiene los estilos globales de la aplicación.
Se importa el componente App que representa el componente principal de la aplicación.
Se importa BrowserRouter de react-router-dom para habilitar la navegación basada en URL en la aplicación.
Se importa Provider de react-redux para proporcionar el almacenamiento (store) a todos los componentes de la aplicación.
Se importa el almacenamiento (store) de ./redux/store, que contiene la configuración de Redux para la aplicación.
Se configura la URL base de Axios para realizar solicitudes HTTP a "http://localhost:3001". Esto es útil si estás utilizando un servidor de desarrollo local.
Se envuelve la aplicación con el Provider y el BrowserRouter para que los componentes tengan acceso al almacenamiento y la capacidad de enrutamiento.
Finalmente, se renderiza el componente App dentro del elemento con el identificador 'root' en el DOM.
En resumen, este archivo de entrada configura la renderización del componente principal de la aplicación y proporciona el enrutamiento y el almacenamiento a través de React Router y Redux, respectivamente. También configura la URL base de Axios para realizar solicitudes HTTP.*/