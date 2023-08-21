import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SousCategorie({user}) {
    const [sousCat, setSousCat] = useState([]);
    const [cv, setCv] = useState({})
    const {id} = useParams();
    useEffect(() =>  {
        if(id){
            axios.get(`sous_categories/${id}`).then(resp => {
                if(resp.status === 200){
                    setSousCat(resp.data.sc)
                    setCv(resp.data.cv)

                }
            }).catch(error => console.log(error))
        }
    }, [id])

    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="container-fluid">
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb adminx-page-breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Tableu de bord</a></li>
                                <li className="breadcrumb-item"><a href="#">Candidats</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Tous les Candidats de {sousCat.categorie} </li>
                            </ol>
                        </nav>

                        <div className="pb-3">
                            <h3>Candidats pour le post de {sousCat.categorie} </h3>
                        </div>
                        <div className="table-responsive-md">
                            <div className="row">
                                <CadreCv data={cv} cat={sousCat} us={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function CadreCv({data, sousCat, us}) {
    if(data.length > 0){
        return (
            <>
                {data && data.map(c => {
                    return(
                        <CvContent id={c} cate={sousCat} usage={us} />
                    )
                })}
            </>
        )
    }else{
        return (
            <>
                <h2>Oops, il n'y a pas encore de CV</h2>
            </>
        )
    }
}

function CvContent({id, cate, usage}){
    const [candi, setCandi] = useState('');
    useEffect(() => {
        if(id){
            axios.get(`cvs/${id}`).then(resp => {
                setCandi(resp.data.cv)
            }).catch(error => console.log(error))
        }
    }, [id])

    let image;
    if(candi.photo && candi.photo.url){
        image = (
            <span style={{ "background-image": `url(https://8fa5-154-126-85-47.ngrok-free.app/${candi.photo.url})` }} className="avatar avatar-xl mr-3">
            </span>
        )
    }else {
        image = (
            <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
            </span>
        )
    }
    if(candi.status === true || candi.status === null){
        if(usage.role === 'Administrateur') {
            return (
                <div className="col-md-6 col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                {image}
                                <div className="media-body overflow-hidden">
                                    <strong>ID : 00{candi.id} </strong>
                                    <h5 className="card-text mb-0"> {candi.nomPrenom}  </h5>
                                    <p className="card-text text-muted">{cate}</p>
                                    <p className="card-text">
                                        Expereince : {candi.aExperience}<br />
                                        <i>{candi.disponibility}</i>
                                    </p>
                                    <Link to={`/editCv/${candi.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                        <i className="bi bi-pencil-square"></i>
                                    </button></Link>&nbsp;&nbsp;
                                    <Link to={`/cv/${candi.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
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
                                        <strong>CV ID : {candi.id}</strong>
                                    </h5>
                                    <p className="card-text text-muted">{cate}</p>
                                    <p className="card-text">
                                        Expereince : {candi.aExperience}<br />
                                        <i>{candi.disponibility}</i>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link to={`/cv/${candi.id}`} className="tile-link"></Link>
                    </div>
                </div>
            )
        }
    }else if(candi.status !== true && localStorage.url === 'Administrateur'){
        return (
            <div className="col-md-6 col-xl-4">
                <div className="card" style={{backgroundColor: "#e9ecef"}}>
                    <div className="card-body">
                        <div className="media align-items-center">
                            {image}<br/>
                            <div className="media-body overflow-hidden">
                                <h5 className="card-text mb-0">
                                    {candi.nomPrenom}
                                </h5>
                                <p className="card-text text-muted">{cate}</p>
                                <p className="card-text">
                                    Expereince : {candi.aExperience} <br />
                                    <i>{candi.disponibility}</i>
                                </p>
                                <Link to={`/editCv/${candi.id}`} ><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                    <i className="bi bi-pencil-square"></i>
                                </button></Link>&nbsp;&nbsp;
                                <Link to={`/cv/${candi.id}`}><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
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