
import React from "react";
import axios from "axios";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Adduser from "../../user/Adduser";

export default function DemandeLoginNotification({ login, fun }) {
    const handleDelete = (id) => {
        var confirmation = window.confirm("Vous voulez vraiment le supprimer ?");
        if(confirmation === true){
            axios.delete(`demand_logins/${id}`).then(resp => {
                if (resp.status === 204) {
                    fun();
                    NotificationManager.success('Demande de login effacer avec succèe', 'Effacer', 4000)
                }
            }).catch(error => console.log(error))
        }
    }

    const handleValidation = (data) => {
        axios.put(`demand_logins/${data}`, {lu: true}).then(resp => {
            if(resp.status === 200){
                fun();
                NotificationManager.success('Demande de login valider avec succès', 'Valider', 4000)
            }
        })
    }

    return (
        <div>
            <div className="main-body">
                <h3>Demande de login recent</h3><hr />
                <div className="row gutters-sm">
                    <div class="col-md-8 mb-3">
                        {login && login.map(demande => {
                            var date = moment(demande.created_at); // crée un objet Moment pour la date actuelle
                            var formattedDate = date.fromNow(); // format "il y a quelques minutes"
                            if(demande.lu === true){
                                return (
                                    <>
                                        <div className="card">
                                            <div class=" card-body">
                                                <div class="media forum-item">
                                                    <div class="media-body">
                                                        Nom et prenom : <h6><strong data-toggle="collapse" data-target=".forum-content" class="text-body">{demande.name} </strong></h6>
                                                        <hr />
                                                        <p class="text-secondary">
                                                            E-mail: {demande.email}
                                                            <hr />
                                                            Téléphone : {demande.numero}
                                                            <hr />
                                                            Société : {demande.object}
                                                            <hr />
                                                            Description :<br /> {demande.description}
    
                                                        </p>
                                                        <p class="text-muted">
                                                            <span class="text-secondary font-weight-bold">{formattedDate} </span><br />
                                                            <hr />
                                                            <button onClick={() => handleDelete(demande.id)} type="button" className="btn btn-danger btn-sm">
                                                                <i className="bi bi-trash"></i>&nbsp;
                                                                Supprimer
                                                            </button>
                                                        </p>
                                                    </div>
                                                    <div class="text-muted small text-center align-self-center">
                                                        <span class="d-none d-sm-inline-block"></span>
    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <div className="card">
                                            <div class=" card-body" style={{"backgroundColor": "#e9ecef "}}>
                                                <div class="media forum-item">
                                                    <div class="media-body">
                                                        Nom et prenom : <h6><strong data-toggle="collapse" data-target=".forum-content" class="text-body">{demande.name} </strong></h6>
                                                        <hr />
                                                        <p class="text-secondary">
                                                            E-mail: {demande.email}
                                                            <hr />
                                                            Téléphone : {demande.numero}
                                                            <hr />
                                                            Société : {demande.object}
                                                            <hr />
                                                            Pays :<br /> {demande.pays}
                                                            <hr />
                                                            Adresse :<br /> {demande.adresse}
                                                            <hr />
                                                            Description :<br /> {demande.description}
                                                        </p>
                                                        <p class="text-muted">
                                                            Il y a <span class="text-secondary font-weight-bold">{formattedDate} </span><br />
                                                            <hr />
                                                            <button onClick={() => handleValidation(demande.id)} type="button" className="btn btn-success btn-sm">
                                                                <i className="bi bi-check-all"></i>&nbsp;
                                                                Valider
                                                            </button>&nbsp;
                                                            <button onClick={() => handleDelete(demande.id)} type="button" className="btn btn-danger btn-sm">
                                                                <i className="bi bi-trash"></i>&nbsp;
                                                                Supprimer
                                                            </button>
                                                        </p>
                                                    </div>
                                                    <div class="text-muted small text-center align-self-center">
                                                        <span class="d-none d-sm-inline-block"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        })}
                    </div>
                    <>
                        <div className="col-md-4">
                            <div className="sticky-top">
                                <div>
                    <br/><br/><br/>

                                    <div className="card mb-3">
                                        <div className="card-body ">
                                            <Adduser />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>

    )
}