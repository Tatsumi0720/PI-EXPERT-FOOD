import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import {getTypeDiets , postRecipes} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function RecipeCreate() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.typediets )

    const [input,setInput] = useState({
        name :'',
        image:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[]
    });

    useEffect(() => {
        dispatch(getTypeDiets());
    },[dispatch])

    return(
        <div>
            
        </div>
    )
}