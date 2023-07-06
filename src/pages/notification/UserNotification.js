import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserNotification({user, id}) {
    const notif = user
    const [cv, setCv] = useState('');
    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                        <ol className="breadcrumb adminx-page-breadcrumb">
                            <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                            <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Interface utilisateur</a></li>
                            <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">Notifications</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card mb-grid">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-header-title">Demande d'entretien</div>

                                    <nav className="card-header-actions">
                                        <a className="card-header-action" data-toggle="collapse" href="#card1" aria-expanded="false" aria-controls="card1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                        </a>
                                        <a href="#" className="card-header-action">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10">
                                                </circle><line x1="15" y1="9" x2="9" y2="15">
                                                </line>
                                                    <line x1="9" y1="9" x2="15" y2="15">
                                                </line>
                                            </svg>
                                        </a>
                                    </nav>
                                </div>
                                <div className="card-body collapse show" id="card1">
                                    <h3>
                                        Toutes les notifications
                                    </h3>
                                    {notif && notif.map(n => {
                                        var date = moment(n.created_at); // crée un objet Moment pour la date actuelle
                                        var formattedDate = date.fromNow(); // format "il y a quelques minutes"
                                        if(n.lu === false) {
                                            return (
                                                <div className="alert alert-primary" role="alert">
                                                    <strong>{id.name} </strong>, vous avez fait une demande d'entretien avec le profil 
                                                    <strong>&nbsp;
                                                        <Link onClick={() => setCv(n.cv_id)} >
                                                            ID : {n.cv_id}
                                                        </Link>
                                                    </strong> <br/>
                                                    <Link onClick={() => setCv(n.cv_id)}>
                                                        <h5><span className="badge bg-info text-dark">Détail de la demande</span></h5>
                                                    </Link>
                                                    <hr/>
                                                    Il y a {formattedDate} / &nbsp;
                                                    <i className="bi bi-arrow-repeat"></i>&nbsp;
                                                     en cours de validation ...
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div className="alert alert-info" role="alert">
                                                    <strong>{id.name} </strong>, vous avez fait une demande d'entretien avec le profil 
                                                    <strong>&nbsp;
                                                        <Link onClick={() => setCv(n.cv_id)} >
                                                            ID : {n.cv_id}
                                                        </Link>
                                                    </strong> <br/>
                                                    <Link onClick={() => setCv(n.cv_id)}>
                                                        <h5><span className="badge bg-info text-dark">Détail de la demande</span></h5>
                                                    </Link>
                                                    <hr/>
                                                    Il y a {formattedDate} / &nbsp;
                                                    <i className="bi bi-check2-all"></i>&nbsp;
                                                    Valider
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card mb-grid">
                                <div className="card-header">
                                    <div className="card-header-title">Notification de profil</div>
                                </div>
                                <Notification idCv={cv} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Notification({idCv}) {
    const [profil, setProfile] = useState('')
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(idCv){
            axios.get(`cvs/${idCv}`).then(resp => {
                setProfile(resp.data.cv)
            })
        }
        if(profil) {
            const id = profil.categorie_cv_id
            axios.get(`categorie_cvs/${id}`).then(resp => {
                setCat(resp.data.cat)
            })
        }
    }, [idCv])
    if(profil){
        return (
            <>
                <div className="card-body">
                    <h5 className="card-title"><strong>ID : {profil.id}</strong> </h5>
                    <strong>{cat.categorie}</strong>
                    <hr/>
                    Annés d'experience {profil.aExperience}
                    <hr/>
                    Localisation : {profil.nationalite}
                    <hr/>
                    <p className="card-text">
                        {profil.disponibility}
                    </p>
                    <hr/>
                    <p className="card-text">
                        Contrat : {profil.contrat}
                    </p>
                    <hr/>

                    <Link to={`/cv/${profil.id}`} className="btn btn-primary">Voir le detail du CV</Link>
                </div>
            </>
        )
    }else{
        return (
            <>
                <div className="card-body">
                    <h5 className="card-title"><strong>Detail de notification</strong> </h5>
                    
                </div>
            </>
        )
    }
}