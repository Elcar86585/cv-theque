import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from 'react-stars';
import Loader from "../../Loader";

export default function Categoriecvlist({ cv, userLog, spinner, lim }) {

    
    if(spinner === true){
        return <Loader/>
    }

    const cvs = cv.slice(0, lim)


    if (cvs.length > 0) {
        return (
            <div className="row">
                {cvs && cvs.map(c => {

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
                <h2>
                    Ooops, Pas encore de CV
                </h2>
            </div>
        )
    }
}

function CvCard({id, user}) {
    const [cv, setCv] = useState('')
    const [cvRate, setCvRate] = useState('');
    const [rating, setRating] = useState('');
    useEffect(() => {
        if(id) {
            axios.get(`cvs/${id}`).then(resp => {
                setCv(resp.data.cv);
                setCvRate(resp.data.cvRat);
                setRating(resp.data.rating);
            })
        }
    }, [id])
    let image;
    if(cv.photo && cv.photo.url){
        image = (
            <span style={{ "background-image": `url(https://cvtheque.activsolution.fr:33066/${cv.photo.url})` }} className="avatar avatar-xl mr-3">
            </span>
        )
    }else {
        image = (
            <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
            </span>
        )
    }

    const handleView = (e) => {
        const formData = new FormData;
        formData.append('cv_id', e);
        formData.append('user_id', user.id)
        axios.post('views', {formData}).then(resp => {
            console.log('viewws');
        }).catch(error => console.log(error))
    }

    const calculateur = (cvRate / rating)
    const valueRate = Math.ceil(calculateur)

    if(cv.status === true || cv.status === null){
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
                                    <p><ReactStars count={5} value={cvRate} size={20} /></p>
                                    <Link to={`/editCv/${cv.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                        <i className="bi bi-pencil-square"></i> Modifier
                                    </button></Link>&nbsp;&nbsp;
                                    <Link to={`/cv/${cv.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                        <i className="bi bi-eye-fill"></i> Voir le CV
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
                                    
                                        <ReactStars count={5} value={cvRate} size={20} />
                                    <Categoriename catId={cv.categorie_cv_id} />
                                    <p className="card-text">
                                        Expereince : {cv.aExperience}<br />
                                        <i>{cv.disponibility}</i>
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                        <Link onClick={() => handleView(cv.id)} to={`/cv/${cv.id}`} className="tile-link"></Link>
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
                                <p><ReactStars count={5} value={cvRate} size={20} /></p>
                                <Link to={`/editCv/${cv.id}`} ><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                    <i className="bi bi-pencil-square"></i> Modifier
                                </button></Link>&nbsp;&nbsp;
                                <Link to={`/cv/${cv.id}`}><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
                                    <i className="bi bi-eye-fill"></i> Voir le CV
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
