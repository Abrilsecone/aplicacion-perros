const axios = require("axios");
require("dotenv").config();
const { URL_API } = process.env;
const { Temperament } = require("../db");

const getTemperamentData = async () => {
  try {
    // Obtener temperamentos de la base de datos
    const temperamentsDb = await Temperament.findAll();

    if (temperamentsDb.length) {
      // Si hay temperamentos en la base de datos, devolverlos ordenados
      return [...temperamentsDb].sort();
    } else {
      // Obtener temperamentos de la API DOG si no hay datos en la base de datos
      const { data } = await axios.get(URL_API);

      var temperaments = [];
      data.map((d) => {
        let temperament = d.hasOwnProperty("temperament")
          ? d.temperament.split(",")
          : [];
        const trimmed = temperament.map((t) => t.trim());
        temperaments = [...temperaments, ...trimmed];
      });

      const tempSet = new Set([...temperaments]);
      const sorted = [...tempSet].sort();

      const bulk = sorted.map((t, i) => {
        return { name: t };
      });

      // Insertar los temperamentos en la base de datos
      const temperamentsInserted = await Temperament.bulkCreate(bulk);
      return temperamentsInserted;
    }
  } catch (error) {
    console.error("getTemperamentData: ", error.message);
    throw new Error(error.message);
  }
};

module.exports = { getTemperamentData };
