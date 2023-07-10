// Redux

// Creamos una función createStore que recibe un reductor y un estado inicial
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  // Función para obtener el estado actual
  const getState = () => state;

  // Función para despachar una acción
  const dispatch = (action) => {
    // Llamamos al reductor con el estado actual y la acción para obtener el nuevo estado
    state = reducer(state, action);

    // Notificamos a todos los listeners (suscriptores) que el estado ha cambiado
    listeners.forEach((listener) => listener());
  };

  // Función para suscribirse a los cambios de estado
  const subscribe = (listener) => {
    // Añadimos el listener a la lista de suscriptores
    listeners.push(listener);

    // Devolvemos una función para cancelar la suscripción
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Llamamos a dispatch con una acción vacía para inicializar el estado
  dispatch({});

  // Devolvemos los métodos públicos: getState, dispatch y subscribe
  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Constantes de acción
const GET_ALL_DOGS = 'GET_ALL_DOGS';
const CREATE_DOG = 'CREATE_DOG';

// Acciones

// Acción para obtener todas las razas de perros
function getAllDogs() {
  return async (dispatch) => {
    try {
      // Llamamos a la función fetchDogsApi para obtener los perros desde la API
      const dogs = await fetchDogsApi();

      // Despachamos una acción con el tipo GET_ALL_DOGS y los perros obtenidos como carga útil (payload)
      dispatch({ type: GET_ALL_DOGS, payload: dogs });
    } catch (error) {
      console.error('Error al obtener las razas de perros:', error);
    }
  };
}

// Acción para crear una nueva raza de perro
function createDog(dogData) {
  return async (dispatch) => {
    try {
      // Llamamos a la función createDogApi para crear un perro en la API con los datos proporcionados
      const newDog = await createDogApi(dogData);

      // Despachamos una acción con el tipo CREATE_DOG y el nuevo perro como carga útil (payload)
      dispatch({ type: CREATE_DOG, payload: newDog });
    } catch (error) {
      console.error('Error al crear una nueva raza de perro:', error);
    }
  };
}

// Reductor

// Reductor para manejar el estado de las razas de perros
function dogReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      // En caso de la acción GET_ALL_DOGS, actualizamos el estado con los perros obtenidos
      return action.payload;
    case CREATE_DOG:
      // En caso de la acción CREATE_DOG, agregamos el nuevo perro al estado
      return [...state, action.payload];
    default:
      // En cualquier otro caso, devolvemos el estado sin modificar
      return state;
  }
}

// Store

// Creamos la tienda (store) utilizando la función createStore y pasando el reductor y el estado inicial
const store = createStore(dogReducer, {});

export default store;
