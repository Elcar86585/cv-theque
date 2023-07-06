import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { NotificationManager } from "react-notifications";


export default function EntretienNotification({ demande, fon }) {
    return (
        <>
            <h3>Demande d'entretien</h3>
            <hr />
            {demande && demande.map(entre => {
                var date = moment(entre.created_at); // crée un objet Moment pour la date actuelle
                var formattedDate = date.fromNow(); // format "il y a quelques minutes"
                return (
                    <div className="card mb-2">
                        <div className="card-body p-2 p-sm-3">
                            <Contenu dem={entre} date={formattedDate} fun={fon} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

function Contenu({ dem, date, fun }) {
    const [use, setUse] = useState('');
    const [cv, setCv] = useState('');
    const [info, setInfo] = useState(false);
    const [demande, setDemande] = useState('')
    useEffect(() => {
        if (dem) {
            axios.get(`users/${dem.user_id}`).then(resp => {
                setUse(resp.data.user)
            })
        }
        if (dem) {
            axios.get(`cvs/${dem.cv_id}`).then(resp => {
                setCv(resp.data.cv)
            })
        }
        if(dem){
            axios.get(`entretiens/${dem.id}`).then(resp => {
                if(resp.status === 200) {
                    setDemande(resp.data)
                }
            })
        }
    }, [dem.id])

    const handleInfo = () => {
        if(info === false){
            setInfo(true)
        }else{
            setInfo(false)
        }
    }

    const hanldeValide = () => {
        axios.put(`entretiens/${dem.id}`, {lu: true} ).then(resp => {
            if(resp.status === 200) {
                NotificationManager.success('Vous avez valider cette demande d\'entretien', 'Demande valider', 4000)
                fun();
            }
        })
    }

    const handleRefuse = () => {
        axios.put(`entretiens/${dem.id}`, {lu: false}).then(resp => {
            if(resp.status === 200) {
                NotificationManager.success('Vous avez refuser cette demande d\'entretien', 'Demande refuser', 4000)
                fun();
            }
        })
    }

    const handleDelte = () => {
        axios.delete(`entretiens/${dem.id}`).then(resp => {
            if(resp.status === 204) {
                NotificationManager.success('Vous avez supprimer cette demande d\'entretien', 'Demande supprimer', 4000)
                fun();
            }
        })
    }

    return (
        <>
            <div className="media forum-item">
                <div className="media-body">
                    <h6><Link to="#" data-toggle="collapse" data-target=".forum-content" className="text-body">
                        {use.name}
                    </Link></h6>
                    <p className="text-secondary">
                        A fait une demande d'entretien avec <strong>{cv.nomPrenom} ou ID : {cv.id}</strong>
                    </p>
                    <p className="text-muted">
                        <button type="button" onClick={() => handleInfo()} className="btn btn-primary btn-sm">Détail de la demande</button>
                    </p>
                </div>
                <div className="text-muted small text-center align-self-center">
                    <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> Il y a</span>
                    <span><i className="far fa-comment ml-2"></i>{date}</span>&nbsp;
                    {demande.lu === true ? (<><i class="bi bi-check2-all"></i> Valider</>) : (<></>)}
                </div>
            </div>
            {info === true ? (
                <>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        A propos de {use.name}
                                    </h5>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>Téléphone :</strong> {use.phone}
                                        </p>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>E-mail :</strong> {use.email}
                                        </p>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>Rôle : </strong>{use.role ? (<>{use.role}</>) : (<>Utilisateur</>)}
                                        </p>
                                    <hr/>
                                    <p className="card-text">
                                            <strong>Société :</strong> {use.societe}
                                        </p>
                                    <Link to={`/user/${use.id}`} type="button" class="btn btn-success btn-sm">
                                        Voir le profil
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">A propos de {cv.nomPrenom}</h5>
                                    <hr/>
                                        <p className="card-text">
                                            <GetCategorie id={cv.categorie_cv_id}  />
                                        </p>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>Disponibilité :</strong> {cv.disponibility}
                                        </p>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>E-mail :</strong> {cv.email}
                                        </p>
                                    <hr/>
                                        <p className="card-text">
                                            <strong>Téléphone : </strong> {cv.telephone}
                                        </p>  
                                    <> 
                                       <Link to={`/cv/${cv.id}`} type="button" onClick={() => handleInfo()} className="btn btn-info btn-sm">
                                            Voir le CV
                                        </Link>
                                    </>                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group btn-group-toggle btn-sm" data-toggle="buttons">
                        {demande.lu === true ? (
                            <>
                                <label class="btn btn-warning">
                                    <input onClick={handleRefuse} type="radio" name="options" id="option2" autocomplete="off"/>
                                    Refuser la demande
                                </label>
                            </>
                        ):(
                            <>
                                <label class="btn btn-info active">
                                    <input onClick={hanldeValide}  type="radio" name="options" id="option1" autocomplete="off"/>
                                    Valider la demande
                                </label>
                            </>
                        )}
                        <label class="btn btn-danger">
                            <input onClick={handleDelte} type="radio" name="options" id="option3" autocomplete="off"/>
                            Supprimer la demande
                        </label>
                    </div>
                </>
            ): (<></>)}
        </>
    )
}

function GetCategorie({id}) {
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                if(resp.status === 200){
                    setCat(resp.data.cat)                
                }
            })
        }
    }, [id])
    return (
        <strong> Poste de {cat.categorie} </strong> 
    )
}

