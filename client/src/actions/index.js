import axios from 'axios';
const GET_RECIPES = 'GET_RECIPES';
const FILTER_BY_TYPEDIET = 'FILTER_BY_TYPEDIET';
// const FILTER_CREATED = 'FILTER_CREATED ';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_PUNTUATION = 'ORDER_BY_PUNTUATION';
const GET_BY_NAME = 'GET_BY_NAME';
const GET_TYPE_DIETS ='GET_TYPE_DIETS'


export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getRecipesByName(name) {

    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: json.data
        })
    }
}

export function getTypeDiets() {

    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/diets`);
        console.log(json.data);
        return dispatch({
            type: GET_TYPE_DIETS,
            payload: json.data
        })

    }
}

export function postRecipes (payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`,payload);
        return json
    }

}

export function filterRecipesByTypeDiet(payload) {
    return {
        type: FILTER_BY_TYPEDIET,
        payload
    }
}

// export function filterCreated(payload){
//     return{
//         type: FILTER_CREATED,
//         payload
//     }
// }

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPuntuation(payload) {
    return {
        type: ORDER_BY_PUNTUATION,
        payload
    }
}