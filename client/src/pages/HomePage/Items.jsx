import { useEffect } from "react";
import Item from "./Item";
import Loading from "../../components/Loading";
import EmptyData from "../../components/EmptyData";
import ErrorMessage from "../../components/ErrorMessage";
import './Items.css'

// redux
import { fetchAllDogs, setCurrentPage } from "../../redux/dogSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";

export default function Items() {
  const dispatch = useDispatch();
  const { list, filtered: dogs, currentPage, loading, status, searchName } =
    useSelector((state) => state.dogs);

  // pagination
  const countPerPage = 8;
  const firstIdx = (currentPage - 1) * countPerPage;
  const lastIdx = firstIdx + countPerPage;
  const page = dogs.slice(firstIdx, lastIdx);

  useEffect(() => {
    if (!list.length && !searchName) {
      dispatch(fetchAllDogs());
    }
  }, [dispatch, list, searchName]);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <Loading />
        ) : !dogs.length ? (
          status ? (
            status === "NOTFOUND" ? (
              <EmptyData />
            ) : (
              <ErrorMessage msg={status} />
            )
          ) : (
            <EmptyData />
          )
        ) : (
          <>
            {page.map((dog) => (
              <Item key={dog.id} {...dog} />
            ))}

            <Pagination
              handleChange={handlePageChange}
              totalItems={dogs.length}
              currentPage={currentPage}
              countPerPage={countPerPage}
            />
          </>
        )}
      </div>
    </>
  );
}



/*Este código representa un componente llamado Items en React. El componente muestra una lista de elementos (Item) y la paginación correspondiente.

El componente utiliza el hook useEffect para realizar una acción cuando se monta el componente. Utiliza el hook useDispatch de react-redux para acceder al objeto dispatch de Redux y el hook useSelector para seleccionar datos del estado de Redux.

En el componente, se importan los componentes Loading, EmptyData, ErrorMessage y Pagination desde sus respectivos archivos.

Dentro del componente, se define una serie de constantes y se utilizan para configurar la paginación. countPerPage determina la cantidad de elementos por página. firstIdx y lastIdx calculan los índices de los elementos que se mostrarán en la página actual (page). page es un subconjunto de los elementos filtrados (dogs) basado en los índices calculados.

El efecto useEffect se dispara cuando list (la lista de elementos) está vacía y searchName (el nombre de búsqueda) también está vacío. En ese caso, se dispara la acción fetchAllDogs utilizando dispatch para obtener todos los perros.

La función handlePageChange se utiliza para manejar el cambio de página en la paginación. Se llama a la acción setCurrentPage utilizando dispatch para establecer la página actual.

El componente renderiza un contenedor principal con la clase CSS "container". Dentro de este contenedor, se muestra el componente Loading si el estado de carga (loading) es verdadero.

Si no hay perros en la lista filtrada (dogs), se muestra el componente EmptyData si no hay un estado de error (status), o se muestra el componente ErrorMessage con el mensaje de error (status) si está presente.

Si hay perros en la lista filtrada, se recorre la lista page y se renderiza el componente Item para cada perro.

Finalmente, se muestra el componente Pagination con las propiedades handleChange (para manejar el cambio de página), totalItems (la cantidad total de elementos), currentPage (la página actual) y countPerPage (la cantidad de elementos por página).

En resumen, este componente muestra una lista de elementos (Item) y la paginación correspondiente. Muestra diferentes componentes dependiendo del estado de carga, la presencia de datos y el estado de error.*/