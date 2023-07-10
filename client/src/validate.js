const validate = (field) => {
	let err = {}

	const msgRequired = "Required field"
	// Name
	if (!field.name) {
		err.name = msgRequired
	} else {
		err.name = field.name.length > 30 ? "Name too long (30 Max)" : ""
    }
    // bredfor
	err.bredFor = field.bredFor && field.bredFor.length > 65 ? "Name too long (60 Max)" : ""


	// height and weight ar required and be number
	const msgNumber = "Must be number"
	err.weightMin = !field.weightMin
		? msgRequired
		: isNaN(field.weightMin)
		? msgNumber
		: ""
	err.weightMax = !field.weightMax
		? msgRequired
		: isNaN(field.weightMax)
		? msgNumber
		: ""
	err.heightMin = !field.heightMin
		? msgRequired
		: isNaN(field.heightMin)
		? msgNumber
		: ""
	err.heightMax = !field.heightMax
		? msgRequired
		: isNaN(field.heightMax)
		? msgNumber
		: ""

	// validate the range between MIN and MAX
	const msgRange = "Min must be lower than Max"
	if (
		field.weightMin &&
		field.weightMax &&
		err.weightMin === "" &&
		err.weightMax === ""
	) {
		err.weightMax =
			Number(field.weightMin) > Number(field.weightMax) ? msgRange : ""
	}
	if (
		field.heightMin &&
		field.heightMax &&
		err.heightMin === "" &&
		err.heightMax === ""
	) {
		err.heightMax =
			Number(field.heightMin) > Number(field.heightMax) ? msgRange : ""
	}
	if (field.lifeSpanMin && field.lifeSpanMax && err.lifeSpanMax === "") {
		err.lifeSpanMax =
			Number(field.lifeSpanMin) > Number(field.lifeSpanMax) ? msgRange : ""
	}

	// validate valid range between 1 -100
	const msgLimit = "Valid range: 1 "
	if (err.weightMin === "" && err.weightMax === "") {
		if (Number(field.weightMin) < 1 || Number(field.weightMax) > 100) {
			err.weightMax = msgLimit + "- 100"
		}
	}
	if (err.heightMin === "" && err.heightMax === "") {
		if (Number(field.heightMin) < 1 || Number(field.heightMax) > 100) {
			err.heightMax = msgLimit + "- 100"
		}
	}
	if ((!err.lifeSpanMax || err.lifeSpanMax === "") && field.lifeSpanMin && field.lifeSpanMax) {
		if (Number(field.lifeSpanMin) < 1 || Number(field.lifeSpanMax) > 20) {
			err.lifeSpanMax = msgLimit + "- 20"
		}
	}

	return err
}

export default validate


/*El código proporcionado muestra una función de validación llamada validate que toma un objeto field como argumento y devuelve un objeto err que contiene los mensajes de error para cada campo.

Aquí está la lógica de validación que se realiza:

Se inicializa el objeto err vacío para almacenar los mensajes de error.
Se define msgRequired como el mensaje de error para los campos requeridos.
Se valida el campo name para asegurarse de que no esté vacío y que no exceda los 30 caracteres.
Se valida el campo bredFor para asegurarse de que no exceda los 65 caracteres.
Se validan los campos weightMin, weightMax, heightMin y heightMax para asegurarse de que no estén vacíos y que sean números.
Se valida el rango entre weightMin y weightMax para asegurarse de que weightMin sea menor que weightMax.
Se valida el rango entre heightMin y heightMax para asegurarse de que heightMin sea menor que heightMax.
Se valida el rango entre lifeSpanMin y lifeSpanMax para asegurarse de que lifeSpanMin sea menor que lifeSpanMax.
Se valida que los campos weightMin, weightMax, heightMin y heightMax estén dentro del rango válido de 1 a 100.
Se valida que los campos lifeSpanMin y lifeSpanMax estén dentro del rango válido de 1 a 20.
Finalmente, se devuelve el objeto err que contiene los mensajes de error correspondientes a cada campo.

Esta función de validación se puede utilizar para validar los campos de un formulario antes de enviar los datos. Los mensajes de error devueltos por esta función se pueden mostrar al usuario para indicar los campos que no cumplen con los requisitos de validación. */