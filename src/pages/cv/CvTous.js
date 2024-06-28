import React, { useState } from "react";
import { Link } from "react-router-dom";
import Ratage from "./Ratage";
import GetSousCategories from "./getCateogtieCv/GetSousCategories";
import Categoriename from "./getCateogtieCv/Categoriename";
import Avvvatars from 'avvvatars-react';

export default function CvTous({candy, utilisateur}) {
    const user = utilisateur;
    const [dataInf, setDataInf] = useState(18);
    const cv = candy.slice(0, dataInf)

    const cvCount = cv

    const handleClick = () => {
        setDataInf(dataInf * 2)
    }


    return (
        <>
        <div className="row" >
            {cv && cv.map(profil => {
                let image;
                if (profil.photo && profil.photo.url) {
                    image = (
                        <span style={{"margin" : "0 15px 0 0"}}><Avvvatars size={80} value={profil.nomPrenom}/></span>
                    )
                } else {
                    image = (
                        <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
                        </span>
                    )
                }
                if (user.role === 'Administrateur') {
                    <div>
                        <h2 className="mb-3">Tous les CV</h2>
                    </div>
                    if (profil.status === true) {
                        
                        return (
                            <div className="col-md-6 col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media align-items-center">
                                            {image}
                                            <div className="media-body overflow-hidden">
                                                <strong>{profil.nomPrenom} - ID: {profil.id}
                                                </strong>
                                                <h5 className="card-text mb-0">   </h5>
                                                <p className="card-text">
                                                    Expereince : {profil.aExperience} <br />
                                                    <p>
                                                        {profil.sous_category_id ? (
                                                            <GetSousCategories catid={profil.sous_category_id} />
                                                        ):(
                                                            <Categoriename catId={profil.categorie_cv_id} />
                                                        )}
                                                    </p>
                                                    <p className="card-text">
                                                        {profil.disponibility}
                                                    </p>
                                                    <Ratage dCv={profil} />
                                                </p>
                                                <Link to={`/editCv/${profil.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                                    <i className="bi bi-pencil-square"></i> Modifier
                                                </button></Link>&nbsp;&nbsp;
                                                <Link to={`/cv/${profil.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                                    <i className="bi bi-eye-fill"></i> Voir le CV
                                                </button></Link>&nbsp;&nbsp;
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="col-md-6 col-xl-4">
                                <div className="card" style={{ backgroundColor: "#e9ecef" }}>
                                    <div className="card-body" >
                                        <div className="media align-items-center">
                                            {image}
                                            <div className="media-body overflow-hidden">
                                                <strong>{profil.nomPrenom} - ID: {profil.id} &nbsp;
                                                    <span class="badge bg-info">Brouillon</span>
                                                </strong>
                                                <h5 className="card-text mb-0">   </h5>
                                                <p className="card-text">
                                                    Expereince : {profil.aExperience}<br />
                                                    <p>
                                                        {profil.sous_category_id ? (
                                                            <GetSousCategories catid={profil.sous_category_id} />
                                                        ):(
                                                            <Categoriename catId={profil.categorie_cv_id} />
                                                        )}
                                                    </p>
                                                    <p className="card-text">
                                                        {profil.disponibility}
                                                    </p>
                                                    <Ratage dCv={profil} />
                                                </p>
                                                <Link to={`/editCv/${profil.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                                    <i className="bi bi-pencil-square"></i> Modifier
                                                </button></Link>&nbsp;&nbsp;
                                                <Link to={`/cv/${profil.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                                    <i className="bi bi-eye-fill"></i> Voir le CV
                                                </button></Link>&nbsp;&nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            })}
        </div>
            <br/>
            <div className="row">
                <div class="mx-auto">
                    {cv ? (
                        <button type="button" className="btn btn-lg btn-primary" onClick={handleClick}>
                            Charger plus de CV 
                        </button>
                    ):(<></>)}
                </div>
            </div>
        </>
    )
}
