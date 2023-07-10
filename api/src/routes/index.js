const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperaments = require('./temperaments')
const dogs = require('./dogs')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs)
router.use('/temperaments', temperaments)

module.exports = router;
