export const initialState = {
    recipes: [],
    allRecipes: [],
    typediets: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_BY_TYPEDIET':
            const allRec = state.allRecipes
            const typeDietFilter = action.payload === 'All' ? allRec : allRec.filter(t => t.typeDiets.find(e => e.name === action.payload))
            console.log(action.payload);

            return {
                ...state,
                recipes: typeDietFilter

            }
        case 'ORDER_BY_NAME':
            let order = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {

                    if (a.name.toLowerCase() > b.name.toLowerCase()) {

                        return 1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1
                    }
                    return 0
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: order
            }
        case 'ORDER_BY_PUNTUATION':
            let orderpunt = action.payload === 'menormayor' ?
                state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1
                    }
                    if (b.healthScore > a.healthScore) {
                        return -1
                    }
                    return 0
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1
                    }
                    if (b.healthScore > a.healthScore) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: orderpunt
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
            }

        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'GET_TYPE_DIETS':
            return {
                ...state,
                typediets: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;