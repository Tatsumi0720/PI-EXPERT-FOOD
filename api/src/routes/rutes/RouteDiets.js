const { Router } = require('express');
const router = Router();
const { diets } = require('../controllers/ControllersDiets')
const { Diets } = require('../../db');

router.get('/', async (req, res) =>{
    try {
        diets.forEach(async (e) =>{
            await Diets.findOrCreate({
                where: { name: e.name }
            });
        });
        const allDiets = await Diets.findAll();
        res.send(allDiets.map(e => e.name))
        res.status(200).json(allDiets);

    } catch (error) {
        console.log(error);
    }
})
module.exports = router; 