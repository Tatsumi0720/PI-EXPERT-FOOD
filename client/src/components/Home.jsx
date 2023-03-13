import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, filterRecipesByTypeDiet, orderByName, orderByPuntuation } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    const[search,setSearch] =useState('')                                           
    const[orden,setOrden] =useState('')                                                   
    const[order,setOrder] =useState('')                                                   
    const[currentPage,setCurrentPage] =useState(1)                                         
    const[recipesPerPage,setrecipesPerPage]=useState(9)                            
    const indexLastRecipe = currentPage * recipesPerPage                           
    const indexFirstRecipe = indexLastRecipe - recipesPerPage                       
    const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    },[dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterTypeDiet (e) {
        dispatch(filterRecipesByTypeDiet(e.target.value))
    }

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handlePuntuation (e) {
        e.preventDefault();
        dispatch(orderByPuntuation(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to="/recipes">Crear Recipe</Link>
            <h1>FOOD</h1>
            <button onClick={(e) => {handleClick(e);}}>
                Volver a cargar todas las recipes
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">Ascendent(A-Z)</option>
                    <option value="des">Descendent(Z-A)</option>
                </select>

                <select  onChange={e => handlePuntuation(e)}>
                    <option value="mayormenor">Mayor a menor por puntuacion</option>
                    <option value="menormayor">Menor a mayor por puntuacion</option>
                </select>

                <select onChange={e => handleFilterTypeDiet(e)}>
                    <option value="All">All recipes</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
            </div>
            
            <div>
            <Paginado 
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />
            </div>

            <SearchBar/>
            
            {currentRecipes?.map((e) => {
                console.log(allRecipes);
                return (
                    <Link to={'/recipes/'+ e.id}>
                        <Card name={e.name} image={e.image} typeDiets={e.typeDiets} key={e.id} />
                    </Link>
                )
            })}
        </div>
    );
}
