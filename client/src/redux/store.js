import { configureStore } from "@reduxjs/toolkit";
// Importa los reducers de dogSlice y temperamentSlice
import dogs from './dogSlice'
import temperaments from './temperamentSlice'

// Configura el store de Redux
const store = configureStore({
    reducer: {
        dogs, // Asigna el reducer de dogSlice al estado 'dogs'
        temperaments // Asigna el reducer de temperamentSlice al estado 'temperaments'
    }
})

export default store; // Exporta el store configurado



/*En este código, se importa configureStore de @reduxjs/toolkit, así como los reducers dogs y temperaments desde los archivos dogSlice.js y temperamentSlice.js, respectivamente. Luego, se configura el store utilizando configureStore pasando un objeto de configuración que especifica los reducers para cada estado. En este caso, el estado dogs está asociado al reducer dogs y el estado temperaments está asociado al reducer temperaments. Finalmente, el store configurado se exporta para que pueda ser utilizado en la aplicación.*/