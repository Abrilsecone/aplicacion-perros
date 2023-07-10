const axios = require("axios")
require("dotenv").config()
const { URL_API } = process.env

const { Dog, Temperament } = require("../db")

// Obtener datos de la API
const getApiData = async () => {
  try {
    const { data } = await axios.get(URL_API)

    return data.map((d) => {
      // Extraer los valores necesarios de la respuesta de la API
      let [weightMin, weightMax] = d.weight.metric.split("-")
      let [heightMin, heightMax] = d.height.metric.split("-")
      let temperament = d.hasOwnProperty("temperament")   
        ? d.temperament.split(/\s*(?:,|$)\s*/)   // coincide cantidad de espacios en blanco, seguido de una coma o el final de la cadena, y luego nuevamente cualquier cantidad de espacios en blanco.
        : ""
      const result = {
        id: d.id,
        name: d.name,
        weightMin: Number(weightMin),
        weightMax: Number(weightMax),
        heightMin: Number(heightMin),
        heightMax: Number(heightMax),
        temperament: temperament,
        lifeSpan: d.life_span,
        bredFor: d.bred_for,
        image: d.image.url,
        source: "API",
      }
      return result
    })
  } catch (error) {
    console.error("getApiData: ", error.message)
    throw new Error(error.message)
  }
}

// Obtener datos de la base de datos
const getDbData = async () => {
  try {
    const dogs = await Dog.findAll({
      include: {
        model: Temperament,
        through: {
          attributes: [],
        },
      },
    })

    if (dogs.length) {
      // Formatear los registros como en la API
      const dbData = dogs.map((d) => {
        const tempArray = d.temperaments.map((t) => t.name)
        const field = d.dataValues
        const data = {
          id: field.id,
          name: field.name,
          weightMin: field.weightMin,
          weightMax: field.weightMax,
          heightMin: field.heightMin,
          heightMax: field.heightMax,
          temperament: tempArray,
          lifeSpan: field.lifeSpan,
          bredFor: field.bredFor,
          image: field.image,
          source: "DB",
        }
        return data
      })
      return dbData
    } else {
      return []
    }
  } catch (error) {
    console.error("getDbData: ", error.message)
    throw new Error(error.message)
  }
}

// Combinar todos los datos
const getAllData = async (name) => {
  const api = await getApiData()
  const db = await getDbData()

  const all = [...api, ...db]
  // Ordenar alfabéticamente ASC por defecto
  all.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
  // Filtrar por nombre si es necesario
  return name
    ? all.filter((d) => d.name.toLowerCase().includes(name.toLowerCase()))
    : all
}

// Obtener datos por ID de raza
const getByIdRaza = async (idRaza) => {
  try {
    const data = await getAllData()
    const dog = data.find((d) => d.id.toString() === idRaza.toString())
    return dog || false
  } catch (error) {
    console.error("getByIdRaza: ", error.message)
    throw new Error(error.message)
  }
}

// Crear una nueva raza
const addNewBreed = async ({
  name,
 heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpan,
  image,
  bredFor,
  temperaments,
}) => {
  try {
    name = name.charAt(0).toUpperCase() + name.slice(1)
    // Crear una nueva raza
    const newDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      bredFor,
      image,
    })
    // Agregar los temperamentos a la nueva raza
    if (temperaments.length) {
      await Promise.all(
        temperaments.map(async (name) => {
          const temp = await Temperament.findOne({
            attributes: ["id"],
            where: { name: name },
          })
          await newDog.addTemperament(temp.id)
        })
      )
    }
    return newDog
  } catch (error) {
    console.error("addNewBreed: ", error.message)
    throw new Error(error.message)
  }
}

// Eliminar de la base de datos
const deleteDbBreed = async (id) => {
  try {
    const res = await Dog.destroy({
      where: {
        id,
      },
      force: true,
    })
    return res
  } catch (error) {
    console.error("deleteDbBreed: ", error.message)
    throw new Error(error.message)
  }
}

module.exports = {
  getApiData,
  getDbData,
  getAllData,
  getByIdRaza,
  addNewBreed,
  deleteDbBreed,
}
