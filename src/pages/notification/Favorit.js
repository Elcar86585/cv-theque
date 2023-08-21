import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Favorit({ id, fav }) {
    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                        <ol className="breadcrumb adminx-page-breadcrumb">
                            <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                            <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Interface utilisateur</a></li>
                            <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">Liste des favoris</li>
                        </ol>
                    </nav>
                    <br />
                    <div className="section pt-0">
                        <div >
                            <div className="row gy-4 justify-content-center">
                                {fav && fav.map(f => {
                                    return (
                                        <div className="col-sm-6 col-md-6 col-lg-4">
                                            <Favori idCv={f.cv_id}  />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function Favori({idCv}) {
    const [cv, setCv] = useState('')
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(idCv) {
            axios.get(`cvs/${idCv}`).then(resp => {
                setCv(resp.data.cv)
            }).catch(error => console.log(error))
        }
        if(cv) {
            axios.get(`categorie_cvs/${cv.categorie_cv_id}`).then(resp => {
                setCat(resp.data.cat)
            }).catch(error => console.log(error))
        }
    }, [idCv])
    return (
        <>
            <div className="card">
                <div className="card-body d-flex">
                    <div className="icon-lg rounded-3 text-white">
                        {cv.photo && cv.photo.url ? (<>
                            <img src={`https://8fa5-154-126-85-47.ngrok-free.app/${cv.photo.url}`} width={70} />
                        </>) : (
                            <>
                                <img src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" width={70} />
                            </>
                        )}
                    </div>
                    <div className="ps-3 col">
                        <h5 className="h6 mb-2">
                            <Link className="stretched-link text-reset" to={`/cv/${cv.id}`}>
                                <strong>
                                   Profil ID : {cv.id}
                                </strong>
                            </Link>
                        </h5>
                        <hr/>
                        <p className="m-0">
                            {cat.categorie}
                        </p>
                        <p className="m-0">
                            {cv.disponibility}
                        </p>
                        <p className="m-0">
                            Année d'experience : {cv.aExperience}
                        </p>
                        <p className="m-0">
                            Localisation : {cv.nationalite}
                        </p>
                        <br />
                        <div className="btn-group">
                            <Link to={`/cv/${cv.id}`} className="btn btn-primary">Voir les detailes </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


