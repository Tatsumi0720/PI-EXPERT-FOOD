const { Router } = require('express');
const router = Router();
const recipe = require('../routes/rutes/RouteRecipe')
const diet = require('../routes/rutes/RouteDiets')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipe);
router.use("/diets", diet);

module.exports = router;
