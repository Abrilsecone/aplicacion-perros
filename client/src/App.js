import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/HomePage/Home.jsx'
import Landing from './pages/LandingPage/Landing.jsx'
import CreateForm from './pages/FormPage/CreateNew.jsx'
import Detail from './pages/DogDetailPage/Detail.jsx';
import NotFound404 from './components/NotFound404.jsx'

function App() {
  return (
    <Switch>
        <Route exact path='/'>
            <Landing />
        </Route>
        <Route exact path='/breeds'>
            <Home/>
        </Route>
        <Route exact path='/detail/:id'>
            <Detail/>
          </Route>
        <Route exact path='/newBreed'>
            <CreateForm/>
        </Route>
        <Route path="*">
            <NotFound404 />
          </Route>
    </Switch>
  );
}

export default App;


/*Este código representa el componente principal de la aplicación llamado App. El componente utiliza el enrutador (Switch y Route) de react-router-dom para definir las rutas de la aplicación y los componentes asociados a cada ruta.

Las rutas definidas en el componente son las siguientes:

La ruta exacta '/' muestra el componente Landing en la página de inicio.
La ruta exacta '/breeds' muestra el componente Home en la página de razas de perros.
La ruta exacta '/detail/:id' muestra el componente Detail en la página de detalle de un perro específico. El :id en la ruta representa el identificador único del perro.
La ruta exacta '/newBreed' muestra el componente CreateForm en la página de creación de una nueva raza de perro.
La ruta '*' es una ruta comodín que muestra el componente NotFound404 en caso de que ninguna de las rutas anteriores coincida.
En resumen, el componente App define las rutas de la aplicación y asigna los componentes correspondientes a cada ruta utilizando el enrutador de react-router-dom. Esto permite que la aplicación muestre diferentes componentes en función de la URL actual.*/