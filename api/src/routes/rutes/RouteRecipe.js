const { Router } = require("express");
const { Recipe, Diets } = require('../../db');
const { getAllFood } = require("../controllers/ControllerRecipe");

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.params

    try {
        let recipesAll = await getAllFood();
        if (name) {
            let recipeName = recipesAll.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length?
            res.status(200).send(recipeName):
            res.status(400).send('No existe una receta con ese nombre')
        }else{
            res.status(200).send(recipesAll)
        }
    } catch (error) {
        res.status(200).send("Algo salio mal");
    }
});

router.post('/', async (req, res) => {
    let { name, image, diets, healthScore, steps, summary } = req.body;

    try {
        let newRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            createDB: true,
            steps
        });

        let dbDiets = await Diets.findAll({
            where: {
                name: diets
            },
        });

        newRecipe.addDiets(dbDiets);
        res.status(200).send("Receta Creada Exitosamente");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllFood();

    try {
        if (!id.includes('-')) {
            if (id) {
                let recipesId = await allRecipes.filter(e => e.id == id);
                recipesId.length?
                res.status(200).json(recipesId):
                res.status(404).json("Not Found");
            }
        }else{
            let dbId = await Recipe.findByPk(id, {
                include: [{
                    model: Diets,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }]
            });

            var arr = [];
            arr.push(dbId);
            res.status(200).json(arr)
        }
    } catch (error) {
        res.status(200).send(error)
    }

})

module.exports = router;