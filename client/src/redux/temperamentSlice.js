import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Estado inicial del slice
const initialState = {
	list: [] // Inicialmente, la lista de temperamentos está vacía
};

// Creación del slice de Redux para manejar los temperamentos
const temperamentSlice = createSlice({
	name: "temperaments", // Nombre del slice
	initialState, // Estado inicial
	reducers: {
		// Reducer para establecer todos los temperamentos
		setAllTemperaments(state, action) {
			state.list = action.payload; // Actualiza la lista de temperamentos con los datos recibidos
		},
		// Reducer para limpiar los temperamentos
		clearTemperaments() {
			return {
				...initialState, // Devuelve el estado inicial, restableciendo la lista de temperamentos
			};
		},
	},
});

// Acción asincrónica para obtener todos los temperamentos
export const fetchAllTemperaments = () => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud GET a "/temperaments" utilizando axios
            const { data } = await axios.get("/temperaments");
            dispatch(setAllTemperaments(data)); // Dispara la acción setAllTemperaments con los datos recibidos
        } catch (error) {
            console.error("getBySource:", error.message); // Muestra un mensaje de error en la consola en caso de fallo
        }
	};
};

// Exporta las acciones y el reducer del slice de temperamentos
export const { setAllTemperaments, clearTemperaments } = temperamentSlice.actions;
export default temperamentSlice.reducer;
