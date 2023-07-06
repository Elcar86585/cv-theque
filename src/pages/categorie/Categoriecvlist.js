import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categoriecvlist({ cv, userLog }) {
    
    if (cv) {
        return (
            <div className="row">
                {cv && cv.map(c => {

                    return (
                        <>
                            <CvCard id={c} user={userLog} />
                        </>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="row">
                <h1>
                    Pas encore de CV
                </h1>
            </div>
        )
    }
}

function CvCard({id, user}) {
    console.log(user)
    const [cv, setCv] = useState('')
    useEffect(() => {
        if(id) {
            axios.get(`cvs/${id}`).then(resp => {
                setCv(resp.data.cv)
            })
        }
    }, [id])
    let image;
    if(cv.photo && cv.photo.url){
        image = (
            <span style={{ "background-image": `url(http://localhost:3001/${cv.photo.url})` }} className="avatar avatar-xl mr-3">
            </span>
        )
    }else {
        image = (
            <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
            </span>
        )
    }
    if(cv.status === true){
        if(user.role === 'Administrateur') {
            return (
                <div className="col-md-6 col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                {image}
                                <div className="media-body overflow-hidden">
                                    <strong>ID : 00{cv.id} </strong>
                                    <h5 className="card-text mb-0"> {cv.nomPrenom}  </h5>
                                    <Categoriename catId={cv.categorie_cv_id} />
                                    <p className="card-text">
                                        Expereince : {cv.aExperience}<br />
                                        <i>{cv.disponibility}</i>
                                    </p>
                                    <Link to={`/editCv/${cv.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                        <i className="bi bi-pencil-square"></i>
                                    </button></Link>&nbsp;&nbsp;
                                    <Link to={`/cv/${cv.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                        <i className="bi bi-eye-fill"></i>
                                    </button></Link>&nbsp;&nbsp;
                                    <Link><button type="button" className="btn btn-danger btn-sm" title="Voir le CV">
                                        <i className="bi bi-trash"></i>
                                    </button></Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }else{
            return(
                <div className="col-md-6 col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                {image}
                                <div className="media-body overflow-hidden">
                                    <h5 className="card-text mb-0">
                                        <strong>CV ID : {cv.id}</strong>
                                    </h5>
                                    <Categoriename catId={cv.categorie_cv_id} />
                                    <p className="card-text">
                                        Expereince : {cv.aExperience}<br />
                                        <i>{cv.disponibility}</i>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link to={`/cv/${cv.id}`} className="tile-link"></Link>
                    </div>
                </div>
            )
        }
    }else if(cv.status !== true && localStorage.url === 'Administrateur'){
        return (
            <div className="col-md-6 col-xl-4">
                <div className="card" style={{backgroundColor: "#e9ecef"}}>
                    <div className="card-body">
                        <div className="media align-items-center">
                            {image}<br/>
                            <div className="media-body overflow-hidden">
                                <h5 className="card-text mb-0">
                                    {cv.nomPrenom}
                                </h5>
                                <Categoriename catId={cv.categorie_cv_id} />
                                <p className="card-text">
                                    Expereince : {cv.aExperience} <br />
                                    <i>{cv.disponibility}</i>
                                </p>
                                <Link to={`/editCv/${cv.id}`} ><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                    <i className="bi bi-pencil-square"></i>
                                </button></Link>&nbsp;&nbsp;
                                <Link to={`/cv/${cv.id}`}><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                    <i className="bi bi-eye-fill"></i>
                                </button></Link>&nbsp;&nbsp;
                                <Link to=''><button type="button" className="btn btn-danger btn-sm" title="Voir le CV">
                                    <i className="bi bi-trash"></i>
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Categoriename({catId}) {
    const [categorie, setCategorie] = useState('')
    useEffect(() => {
        if(catId) {
            axios.get(`categorie_cvs/${catId}`).then(resp => {
                if(resp.status === 200) {
                    setCategorie(resp.data.cat)
                }
            })
        }

    }, [catId])
    return (
        <p className="card-text text-muted">
            {categorie.categorie}
        </p>
    )
}
