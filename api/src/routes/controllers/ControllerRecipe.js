const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../../db');

const getApiInfo = async () => {

    try{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const api = await apiUrl.data.results.map((e) => {
            return {
                id: e.id,
                image: e.image,
                name: e.title,
                typeDiets: e.diets.map((d)=> {return{name:d}}),
                summary: e.summary,
                healthScore: e.healthScore,
                steps: e.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                    }
                })
            }
        })
        return api;
    }catch(e){
        console.log(e);
    }
}

const getInfoDB = async () => {
    const RecipeDB = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    return RecipeDB;
};

const getAllFood = async () => {
    const getApi = await getApiInfo();
    const apiInfoDB = await getInfoDB();
    const infoTotal = getApi.concat(apiInfoDB);
    return infoTotal;
    // return [...getApi, ...apiInfoDB]
};


module.exports = {
    getAllFood,
};

