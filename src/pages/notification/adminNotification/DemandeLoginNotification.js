import React from "react";
import axios from "axios";
import moment from "moment";
import { NotificationManager } from "react-notifications";

export default function DemandeLoginNotification({login, fun}) {
    const handleDelete = (id) => {
        axios.delete(`demand_logins/${id}`).then(resp => {
            if(resp.status === 204) {
                fun();
                NotificationManager.success('Demande de login effacer avec succèe', 'Effacer', 4000)
            }
        })
    }
    return (
        <>
            <h3>Demande de login recent</h3>
            {login && login.map(demande => {
                var date = moment(demande.created_at); // crée un objet Moment pour la date actuelle
                var formattedDate = date.fromNow(); // format "il y a quelques minutes"
                return(
                    <>
                        <div class="card mb-2">
                            <div class="card-body p-2 p-sm-3">
                                <div class="media forum-item">
                                    <div class="media-body">
                                        <h6><strong data-toggle="collapse" data-target=".forum-content" class="text-body">{demande.name} </strong></h6>
                                        <p class="text-secondary">
                                            {demande.email}
                                            <hr/>
                                            {demande.numero}
                                            <hr/>
                                            {demande.object}
                                            <hr/>
                                            {demande.description}

                                        </p>
                                        <p class="text-muted">
                                            Il y a <span class="text-secondary font-weight-bold">{formattedDate} </span><br/>
                                            <hr/>
                                            <button onClick={() => handleDelete(demande.id)} type="button" className="btn btn-danger btn-sm">
                                                <i className="bi bi-trash"></i>&nbsp;
                                                Supprimer
                                            </button>
                                        </p>
                                    </div>
                                    <div class="text-muted small text-center align-self-center">
                                        <span class="d-none d-sm-inline-block"><i class="bi bi-eye-fill" style={{"fontSize": "20px"}} ></i></span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}