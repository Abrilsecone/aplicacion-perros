import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../HomePage/NavBar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import NotFound404 from "../../components/NotFound404";
import { Trash, CheckOK } from "../../img/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, searchById, deleteBreed } from "../../redux/dogSlice";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { detail: dog, loading, status } = useSelector((state) => state.dogs);

  /*Aquí estamos importando los módulos y componentes necesarios. useParams y useHistory son hooks proporcionados por React Router para obtener los parámetros de la URL y acceder al historial de navegación, respectivamente. NavBar, Loading, ErrorMessage y NotFound404 son componentes importados desde otros archivos. Trash y CheckOK son componentes de íconos importados desde el directorio de imágenes (SvgIcons). useDispatch y useSelector son hooks proporcionados por React Redux para manejar el estado y las acciones.*/

  useEffect(() => {
    dispatch(searchById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  /*Este efecto se ejecuta cuando el componente se monta y cuando cambia el valor de id. Se encarga de llamar a la acción searchById pasando el id como argumento para buscar los detalles del perro correspondiente. También se define una función de limpieza que se ejecutará cuando el componente se desmonte y llamará a la acción clearDetail para limpiar los detalles.*/


  const handleRemove = async (id) => {
    if (window.confirm("¿Estás seguro?")) {
      dispatch(deleteBreed(id));
      setTimeout(() => {
        history.push("/breeds");
      }, 2000);
    }
  }
  /*Esta función handleRemove se utiliza para eliminar una raza de perro. Se muestra un cuadro de confirmación y, si el usuario confirma, se llama a la acción deleteBreed pasando el id como argumento. Luego, se espera un tiempo de 2000 milisegundos (2 segundos) y se redirige al usuario a la página "/breeds" utilizando el objeto history.*/


  // Formatear texto para el peso
  let weightTxt = " - - ";
  if (dog.weightMin && dog.weightMax) {
    weightTxt = dog.weightMin + " - " + dog.weightMax + " Kg";
  } else {
    if (dog.weightMin || dog.weightMax) {
      weightTxt = (dog.weightMin ? dog.weightMin : dog.weightMax) + " Kg";
    }
  }
  // Formatear texto para la altura
  let heightTxt = " - - ";
  if (dog.heightMin && dog.heightMax) {
    heightTxt = dog.heightMin + " - " + dog.heightMax + " Cm";
  } else {
    if (dog.heightMin || dog.heightMax) {
      heightTxt = (dog.heightMin ? dog.heightMin : dog.heightMax) + " Cm";
    }
  }

  /*Estas variables weightTxt y heightTxt se utilizan para formatear el texto del peso y la altura del perro. Si se tienen los valores mínimos y máximos, se muestra el rango. Si solo se tiene un valor mínimo o máximo, se muestra ese valor.*/


  const placeholder = "../../../assets/placeholder_dog.png";

  return (
    <div>
      <NavBar search={false} />

      {loading ? (
        <Loading />
      ) : !dog.name ? (
        status && status !== "OK" ? (
          status === "NOTFOUND" ? (
            <NotFound404 />
          ) : (
            <ErrorMessage msg={status} />
          )
        ) : (
          ""
        )
      ) : (
        <div className="card-detail">
          <div className="card-image">
            <img src={dog.image ?? placeholder} alt={dog.name} />
          </div>
          <div className="card-body">
            {dog.source === "DB" ? (
              <div
                className={`card-remove ${status === "OK" ? "success" : ""}`}
                onClick={() => handleRemove(dog.id)}
              >
                {status === "" ? (
                  <Trash />
                ) : status === "OK" ? (
                  <CheckOK />
                ) : (
                  "Error!"
                )}
              </div>
            ) : (
              ""
            )}

            <div className="card-info">
              <h1>{dog.name}</h1>
              <h2>
                <span>Bred for: </span> {dog.bredFor}
              </h2>

              <div className="card-additional">
                <div>
                  <h3>Weight</h3> {weightTxt}
                </div>
                <div>
                  <h3>Height</h3> {heightTxt}
                </div>
                <div>
                  <h3>Life expectancy</h3> {dog.lifeSpan}
                </div>
              </div>
              <div className="card-temperament">
                <h2>
                  <span>Temperament:</span>
                </h2>
                {dog.temperament &&
                  dog.temperament.map((t) => (
                    <span className="temperament-tag" key={t}>
                      {t}
                    </span>
                  ))}
              </div>
            </div>
            <div className="card-button">
              <button type="button" onClick={() => history.push("/breeds")}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/*Este es el componente principal Detail. Muestra una barra de navegación, y luego, dependiendo del estado de carga (loading), muestra diferentes componentes como Loading, NotFound404 o ErrorMessage si no se encuentra la raza o hay un error.

Si se encuentra la raza, muestra los detalles en una tarjeta (card-detail). Dentro de la tarjeta, se muestra la imagen del perro, el botón de eliminar (si la fuente es "DB"), el nombre, el propósito de crianza (bredFor), el peso, la altura, la esperanza de vida (lifeSpan) y el temperamento.

Finalmente, se muestra un botón "Back" que redirige al usuario a la página de razas (/breeds) al hacer clic en él.*/