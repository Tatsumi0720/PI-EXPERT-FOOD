import React from 'react'
import styles from './Card.modulo.css'


export default function Card({ name, image, typeDiets, id }) {
    return(
        <div key={id} className={styles.card}>
            <div className={styles.cd}>
            <h3>{name}</h3>;
            <img src={image} alt ='img not found' width='200px'  height='250px' />
            <div className={styles.tipes}>
                <h5>Diets: {typeDiets.map(el => {return el.name + " - "})}</h5>
            </div>
            </div>
        </div>
    )
}
