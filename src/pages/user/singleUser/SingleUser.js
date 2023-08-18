import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DemandeEntretien from "./DemandeEntretien";
import { Tab, Tabs } from 'react-bootstrap';
import FavorisList from "./FavorisList";
import EditUser from "./EditUser";
import axios from "axios";
import moment from "moment";
import { NotificationManager } from "react-notifications";

export default function SingleUser() {
    const [tabKey, initTabKey] = useState('one')
    const [user, setUser] = useState('')
    const [favo, setFavo] = useState('')
    const [demande, setDemande] = useState('')
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            axios.get(`users/${id}`).then(resp => {
                if (resp.status === 200) {
                    setUser(resp.data.user)
                    setDemande(resp.data.entretien)
                    setFavo(resp.data.favo)
                }
            })
        }
    }, [id])

    const handleDelete = (id) => {
        axios.put(`users/${id}`, { account: true }).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Utilisateur à été désactiver avec succée', 'Désactiver', 4000);
                window.history.back();
            }
        })
    }

    const handleActived = (id) => {
        axios.put(`users/${id}`, { account: false }).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Utilisateur à été activer avec succée', 'Activation', 4000);
                window.history.back();
            }
        })
    }
    var date = moment(user.created_at); // crée un objet Moment pour la date actuelle
    var formattedDate = date.fromNow(); // format "il y a quelques minutes"
    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="profile-card-4 z-depth-3">
                                <div className="card">
                                    <div className="card-body text-center bg-primary rounded-top">
                                        <h5 className="mb-1 text-white">{user.name} </h5>
                                        <h6 className="text-light">Société : {user.societe}  </h6>
                                        <h6 className="text-light">ID : 00{user.id} </h6>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group shadow-none">
                                            <li className="list-group-item">
                                                <div className="list-icon">
                                                    <i className="bi bi-telephone-fill"></i>
                                                </div>
                                                <div className="list-details">
                                                    <span>{user.phone} </span>
                                                    <small>Numero mobile</small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="list-icon">
                                                    <i className="bi bi-envelope-at-fill"></i>
                                                </div>
                                                <div className="list-details">
                                                    <span>{user.email} </span>
                                                    <small>Adresse e-mail</small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="list-icon">
                                                    <i className="bi bi-geo-alt-fill"></i>
                                                </div>
                                                <div className="list-details">
                                                    <span>{user.pays} </span>
                                                    <small>{user.adresse} </small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="list-icon">
                                                    <i className="bi bi-person-circle"></i>
                                                </div>
                                                <div className="list-details">
                                                    <span>{formattedDate} </span>
                                                    <small>En tant que membre</small>
                                                </div>
                                            </li>
                                            {user.role === 'Administrateur' ? (
                                                <li className="list-group-item">
                                                    <div className="list-icon">
                                                        <i className="bi bi-person-vcard-fill"></i>
                                                    </div>
                                                    <div className="list-details">
                                                        <span>Administrateur </span>
                                                        <small>Role de l'utilisateur</small>
                                                    </div>
                                                </li>
                                            ) : (
                                                <li className="list-group-item">
                                                    <div className="list-icon">
                                                        <i className="bi bi-person-vcard-fill"></i>
                                                    </div>
                                                    <div className="list-details">
                                                        <span>Utilisateur </span>
                                                        <small>Role de l'utilisateur</small>
                                                    </div>
                                                </li>
                                            )}

                                            {user.account === true ? (
                                                <>
                                                    <li className="list-group-item">
                                                        <div className="list-icon">
                                                          <i className="bi bi-person-fill-check"></i>
                                                        </div>
                                                        <div className="list-details">
                                                            <button onClick={() => handleActived(user.id)} type="button" class="btn btn-primary">
                                                                Activer l' <span class="badge badge-light">utilisateur</span>
                                                            </button>
                                                        </div>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="list-group-item">
                                                        <div className="list-icon">
                                                            <i className="bi bi-person-fill-x"></i>
                                                        </div>
                                                        <div className="list-details">
                                                            <button onClick={() => handleDelete(user.id)} type="button" class="btn btn-danger">
                                                                Désactiver l' <span class="badge badge-light">utilisateur</span>
                                                            </button>
                                                        </div>
                                                    </li>
                                                </>
                                            )}

                                        </ul>
                                        <div className="row text-center mt-4">
                                            <div className="col p-2">
                                                <h4 className="mb-1 line-height-5">{demande.length} </h4>
                                                <small className="mb-0 font-weight-bold">Demande d'entretien</small>
                                            </div>
                                            <div className="col p-2">
                                                <h4 className="mb-1 line-height-5">{favo.length} </h4>
                                                <small className="mb-0 font-weight-bold">Favoris</small>
                                            </div>
                                            <div className="col p-2">
                                                <h4 className="mb-1 line-height-5">500</h4>
                                                <small className="mb-0 font-weight-bold">Téléchargement</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card z-depth-3">
                                <div className="card-body">
                                    <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
                                        <Tab eventKey="one" title="Demande d'entretien">
                                            <DemandeEntretien ids={demande} />
                                        </Tab>
                                        <Tab eventKey="two" title="List des favoris">
                                            <FavorisList ids={favo} />
                                        </Tab>
                                        <Tab eventKey="three" title="Modifier l'utilisateur">
                                            <EditUser user={user} />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}