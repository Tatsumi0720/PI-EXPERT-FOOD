import React from 'react'

export default function Card({ name, image, typeDiets, id }) {
    return(
        <div key={id}>
            <h3>{name}</h3>;
            <img src={image} alt ='img not found' width='200px'  height='250px' />
            <div>
                <h5>Diets: {typeDiets.map(el => {return el.name + " - "})}</h5>
            </div>
        </div>
    )
}
