import React from "react";
import { Link } from "react-router-dom";


export default function ThinksPage() {
    return (
        <>
            <div className='adminx-container d-flex justify-content-center align-items-center' >
                <div class="card">
                    <div class="card-body">
                        <center>
                            <br/>
                            <div>
                                <h1>Merci d'avoir ajouter votre CV dans notre CVtheque</h1>
                            </div>
                            <br /><hr />
                            <div>
                                <h2>Votre CV sera publier dans 24 heures</h2>
                            </div>
                            <hr/>
                            <Link to="/" type="button" class="btn btn-primary btn-lg">
                                Retour à la page d'accueil
                            </Link>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}