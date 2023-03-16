import React from "react";
import styles from './Landing.css'
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return(
        <div className={styles.landing}>
            <h1 className={styles.wlc}>Bienvenidos</h1>
            <Link to={'/home'}>
                <button className={styles.btn}>Ingresar</button>
            </Link>
        </div>
    )
}
