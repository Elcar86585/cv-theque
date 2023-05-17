import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
    return(
        <div className='adminx-container d-flex justify-content-center align-items-center' >
            <center>
                <h1>Page 404</h1>
                <p>Connecter Vous pour voir les contenues, ou <strong>demander un login</strong> </p>
                <Link to="/se-connecter"> 
                    <button type="button" class="btn btn-primary btn-lg">Connectez-vous </button>&nbsp;
                </Link>
                <button type="button" class="btn btn-secondary btn-lg">Demander un login</button>
            </center>
        </div>
    )
}