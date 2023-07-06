import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

class AllCv extends React.Component {
    state={
        cvs: ''
    }

    componentDidMount = () => {
        this.getCv();
    }

    getCv = () => {
        axios.get('cvs').then(resp => {
            this.setState({
                cvs: resp.data
            })
        })
    }

    render() {
        const cv = this.state.cvs
        const user = this.props.user
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb" role="navigation">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Tableu de bord</a></li>
                                    <li className="breadcrumb-item"><a href="#">Candidats</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Tous les Candidats</li>
                                </ol>
                            </nav>

                            <div className="pb-3">
                                <h3>Tous les candidats</h3>
                            </div>
                            <div className="table-responsive-md">
                                <div className="row" >
                                {cv && cv.map(profil => { 
                                    let image;
                                    if(profil.photo && profil.photo.url){
                                        image = (
                                            <span style={{ "background-image": `url(http://localhost:3001/${profil.photo.url})` }} className="avatar avatar-xl mr-3">
                                            </span>
                                        )
                                    }else {
                                        image = (
                                            <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
                                            </span>
                                        )
                                    }
                                    if(user.role === 'Administrateur') {
                                        if(profil.status === true){
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
                                                                            <Categoriename catId={profil.categorie_cv_id} />
                                                                        </p>
                                                                        <p className="card-text">
                                                                            {profil.disponibility}
                                                                        </p>
                                                                    </p>
                                                                    <Link to={`/editCv/${profil.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </button></Link>&nbsp;&nbsp;
                                                                    <Link to={`/cv/${profil.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
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
                                            return (
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card" style={{backgroundColor: "#e9ecef"}}>
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
                                                                            <Categoriename catId={profil.categorie_cv_id} />
                                                                        </p>
                                                                        <p className="card-text">
                                                                            {profil.disponibility}
                                                                        </p>
                                                                    </p>
                                                                    <Link to={`/editCv/${profil.id}`}><button type="button" className="btn btn-secondary btn-sm" title="Modifier">
                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </button></Link>&nbsp;&nbsp;
                                                                    <Link to={`/cv/${profil.id}`} ><button type="button" className="btn btn-primary btn-sm" title="Voir le CV">
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
                                        }
                                    }else{
                                        if(profil.status === true){
                                            return (
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="media align-items-center">
                                                                {image}
                                                                <div className="media-body overflow-hidden">
                                                                    <strong>ID : 00{profil.id} </strong>
                                                                    <h5 className="card-text mb-0">   </h5>
                                                                    <p className="card-text">
                                                                        Expereince : {profil.aExperience}<br />
                                                                        <p>
                                                                            <Categoriename catId={profil.categorie_cv_id} />
                                                                        </p>
                                                                        <p className="card-text">
                                                                            {profil.disponibility}
                                                                        </p>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link to={`/cv/${profil.id}`} className="tile-link"></Link>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AllCv;


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