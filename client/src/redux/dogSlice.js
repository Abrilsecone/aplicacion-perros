import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

const defaultOrder = {
  ALPHABETIC: 'ASC',
};

const initialState = {
  list: [],
  filtered: [],
  order: defaultOrder,
  source: 'ALL',
  selectedTemperament: '0',
  currentPage: 1,
  detail: {},
  loading: true,
  status: '',
  searchName: '',
};

// Async Thunks para realizar acciones asincrónicas
// getByOrden: Obtiene los perros ordenados por una opción específica
export const getByOrden = createAsyncThunk('dogs/getByOrden', async (order, { dispatch }) => {
  dispatch(setOrder(order));
  dispatch(applyOrder());
});

// getBySource: Obtiene los perros filtrados por una fuente específica
export const getBySource = createAsyncThunk('dogs/getBySource', async (source, { dispatch }) => {
  dispatch(setSource(source));
  dispatch(applyFilters());
  dispatch(applyOrder());
  dispatch(setStatus(''));
});

// getByTemperament: Obtiene los perros filtrados por un temperamento específico
export const getByTemperament = createAsyncThunk(
  'dogs/getByTemperament',
  async (selected, { dispatch }) => {
    dispatch(setSelectedTemperament(selected));
    dispatch(applyFilters());
    dispatch(applyOrder());
    dispatch(setStatus(''));
  }
);

// fetchAllDogs: Obtiene todos los perros
export const fetchAllDogs = createAsyncThunk('dogs/fetchAllDogs', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get('/dogs');
    dispatch(setAllDogs(data));
  } catch (error) {
    console.error('fetchAllDogs:', error);
    dispatch(setStatus(error.message));
  }
});

// searchByName: Busca perros por nombre
export const searchByName = createAsyncThunk('dogs/searchByName', async (name, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setSearchName(name));
    const { data } = await axios.get(`/dogs?name=${name}`);
    dispatch(setAllDogs(data));
    if (data.length) {
      dispatch(applyFilters(data));
    } else {
      dispatch(setStatus('NOTFOUND'));
    }
  } catch (error) {
    console.error('searchByName: ', error.message);
    dispatch(setStatus(error.message));
  }
});

// searchById: Busca un perro por su ID
export const searchById = createAsyncThunk('dogs/searchById', async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`/dogs/${id}`);
    if (data) {
      dispatch(setDetail(data));
    } else {
      dispatch(setStatus('NOTFOUND'));
    }
  } catch (error) {
    console.error('searchById:', error.message);
    dispatch(setStatus(error.response ? error.response.data : error.message));
  }
});

// postNewBreed: Agrega una nueva raza de perro
export const postNewBreed = createAsyncThunk('dogs/postNewBreed', async (formData, { dispatch }) => {
  try {
    const { data: dogCreated } = await axios.post('/dogs', formData);
    const { data } = await axios.get('/dogs');
    dispatch(setAllDogs(data));
    dispatch(applyFilters());
    dispatch(applyOrder());
    dispatch(setStatus('OK'));
    return dogCreated;
  } catch (error) {
    const message = error.response
      ? error.response.data.includes('dogs_name_key')
        ? `The name "${formData.name}" already exists!`
        : error.response.data
      : error.message;
    dispatch(setStatus(message));
    console.error('postNewBreed:', error);
  }
});

// deleteBreed: Elimina una raza de perro por su ID
export const deleteBreed = createAsyncThunk('dogs/deleteBreed', async (id, { dispatch }) => {
  try {
    await axios.delete(`/dogs/${id}`);
    dispatch(setStatus('OK'));
    const { data } = await axios.get('/dogs');
    dispatch(setAllDogs(data));
    dispatch(applyFilters());
  } catch (error) {
    dispatch(setStatus(error.message));
    console.error('deleteBreed:', error.message);
  }
});

const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
      state.loading = false;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setAllDogs(state, action) {
      state.list = action.payload;
      state.filtered = action.payload;
      state.order = defaultOrder;
      state.currentPage = 1;
      state.detail = {};
      state.loading = false;
    },
    clearDogs() {
      return {
        ...initialState,
      };
    },
    setDetail(state, action) {
      state.detail = action.payload;
      state.loading = false;
      state.status = '';
    },
    clearDetail(state) {
      state.detail = {};
      state.status = '';
    },
    setSelectedTemperament(state, action) {
      state.selectedTemperament = action.payload;
    },
    setSource(state, action) {
      state.source = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setSearchName(state, action) {
      state.searchName = action.payload;
    },

    applyFilters(state) {
      let filtered = state.list;
      filtered =
        state.source === 'ALL'
          ? filtered
          : filtered.filter((f) => f.source === state.source);
      filtered =
        state.selectedTemperament === '0'
          ? filtered
          : filtered.filter((d) => d.temperament.includes(state.selectedTemperament));

      state.filtered = filtered;
      state.loading = false;
      state.currentPage = 1;
    },

    applyOrder(state) {
      let sortedArr = [];
      if (state.order.ALPHABETIC) {
        sortedArr =
          state.order.ALPHABETIC === 'ASC'
            ? [...state.filtered].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
            : [...state.filtered].sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1));
      } else {
        sortedArr =
          state.order.WEIGHT === 'ASC'
            ? [...state.filtered].sort((a, b) => (a.weightMin > b.weightMin ? 1 : -1))
            : [...state.filtered].sort((a, b) => (b.weightMin > a.weightMin ? 1 : -1));
      }
      state.filtered = sortedArr;
      state.currentPage = 1;
    },
  },
});

// Acciones generadas por createSlice
export const {
  setLoading,
  setStatus,
  setCurrentPage,
  setAllDogs,
  clearDogs,
  setDetail,
  clearDetail,
  setSelectedTemperament,
  setSource,
  setOrder,
  setSearchName,
  applyFilters,
  applyOrder,
} = dogSlice.actions;

export default dogSlice.reducer;


/*Este código define un slice de Redux llamado dogSlice que contiene el estado y las acciones relacionadas con los perros. También define una serie de thunks asincrónicos que realizan llamadas a la API para obtener, filtrar y buscar perros. El slice también incluye acciones para establecer el estado de carga, el estado de detalle y aplicar filtros y órdenes a la lista de perros.

Ten en cuenta que este código utiliza axios para realizar las solicitudes HTTP a la API. Asegúrate de tener axios instalado en tu proyecto y de que la API a la que se hace referencia en las solicitudes sea válida.*/