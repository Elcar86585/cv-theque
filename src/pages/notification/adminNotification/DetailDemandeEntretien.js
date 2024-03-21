import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Tab, Tabs } from 'react-bootstrap';
import ProfileDetail from "./detailEntretien/ProfileDetail";
import ExperienceDetail from "./detailEntretien/ExperienceDetail";
import EtudeDetail from "./detailEntretien/EtudeDetail";
import LangueDetail from "./detailEntretien/LangueDetail";
import LoisirDetail from "./detailEntretien/LoisirDetail";
import InformatiqueDetail from "./detailEntretien/InformatiqueDetail";

export default function DetailDemandeEntretien() {
    const [entretien, setEntretien] = useState('')
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            axios.get(`entretiens/${id}`).then(resp => {
                if (resp.status === 200) {
                    setEntretien(resp.data)
                }
            }).catch(error => console.log(error))
        }
    }, [id])

    const handleDelete = () => {
        var reponse = window.confirm("Vous voulez vraiment le supprimer ?"); 
        if(reponse === true){
            axios.delete(`entretiens/${id}`).then(resp => {
                if (resp.status === 204) {
                    NotificationManager.success('Vous avez supprimer cette demande d\'entretien', 'Demande supprimer', 4000)
                    window.history.back();
                }
            }).catch(error => console.log(error))
        }
    }

    const handleRefuse = () => {
        axios.put(`entretiens/${id}`, { lu: false }).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Vous avez refuser cette demande d\'entretien', 'Demande refuser', 4000)
            }
        }).catch(error => console.log(error))
    }

    const hanldeValide = () => {
        axios.put(`entretiens/${id}`, { lu: true }).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Vous avez valider cette demande d\'entretien', 'Demande valider', 4000)
            }
        }).catch(error => console.log(error))
    }

    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <Tabulation data={entretien} deletetion={handleDelete} valide={hanldeValide} refuse={handleRefuse} />
                </div>
            </div>
        </>
    )
}


function Tabulation({ data, valide, refuse, deletetion }) {
    const [user, setUser] = useState('')
    const [candidat, setCandidat] = useState('')
    const [exper, setExper] = useState('');
    const [forma, setForma] = useState('');
    const [langue, setLangue] = useState('');
    const [lois, setLois] = useState('');
    const [inf, setInf] = useState('');
    useEffect(() => {
        axios.get(`users/${data.user_id}`).then(resp => {
            if (resp.status === 200) {
                setUser(resp.data.user)
            }
        }).catch(error => console.log(error))
        axios.get(`cvs/${data.cv_id}`).then(resp => {
            if (resp.status === 200) {
                setCandidat(resp.data.cv)
                setExper(resp.data.exp);
                setForma(resp.data.diplo);
                setLangue(resp.data.langage);
                setLois(resp.data.loisir);
                setInf(resp.data.info);
            }
        }).catch(error => console.log(error))
    }, [data.id])


    return (
        <>
            <div className="main-body">
                <div className="d-flex justify-content-between">
                    <h4>
                        Demande d'entretien
                    </h4>
                    <button type="boutton" className="btn btn-primary btn-sm" onClick={() => window.history.back()} >
                        <i className="bi bi-arrow-left-short"></i>
                        Retour
                    </button>
                </div>
                <hr />
                {data.lu === true ? (
                    <>
                        <div class="alert alert-success" role="alert">
                            <i className="bi bi-check-all"></i> Valider /.../&nbsp;
                            <b>{user.name} {user.prenom}</b> veux avoir un entretien avec <b>{candidat.nomPrenom} {candidat.prenom}</b> entre le date de {data.drdv} à {data.hrdv} heurre
                        </div>
                    </>
                ) : (
                    <>
                        <div class="alert alert-primary" role="alert">
                            <i className="bi bi-caret-right"></i>&nbsp;
                            <b>{user.name} {user.prenom}</b> veux avoir un entretien avec <b>{candidat.nomPrenom} {candidat.prenom} </b> entre le date de {data.drdv} à {data.hrdv} heurre
                        </div>
                    </>
                )}

                <hr />
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="">
                                        <h5>A propos de {user.name} {user.prenom} </h5>
                                        <hr />
                                        <div className="mt-3">
                                            <strong>Nom :  {user.name} {user.prenom} </strong><hr />
                                            <p className="text-secondary mb-1">E-mail : {user.email} </p>
                                            <hr />
                                            <p className="text-secondary mb-1">Téléphone : {user.phone} </p>
                                            <hr />
                                            <p className="text-secondary mb-1">Société : {user.societe} </p>
                                            <hr />
                                            <p className="text-secondary mb-1">Membre depuis : {user.created_at} </p>
                                            <hr />
                                            <p className="text-muted font-size-sm">Status : {user.role}  </p><hr />
                                            <div class="btn-group d-flex row">
                                                {data.lu === true ? (<>
                                                    <button type="button" onClick={deletetion} class="btn btn-danger">
                                                        Supprimer
                                                    </button>
                                                </>):(
                                                    <>
                                                        <button type="button" onClick={refuse} class="btn btn-warning">
                                                            Refuser
                                                        </button>
                                                        <button type="button" onClick={valide} class="btn btn-success">
                                                            Valider
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <CandidatTabe cv={candidat} experience={exper} formation={forma} lang={langue} loisir={lois} informatique={inf} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function CandidatTabe({cv, experience, formation, lang, loisir, informatique}) {
    return (
        <>
            <Tabs
                defaultActiveKey="profile"
                className="mb-3"
            >
                <Tab eventKey="profile" title="Profile">
                    <ProfileDetail profil={cv} />
                </Tab>
                <Tab eventKey="experience" title="Expérience">
                    <ExperienceDetail exp={experience} />
                </Tab>
                <Tab eventKey="Etudes et Formation" title=" Etudes et Formations">
                    <EtudeDetail format={formation} />
                </Tab>
                <Tab eventKey="langue" title="Langue">
                    <LangueDetail langu={lang} />
                </Tab>
                <Tab eventKey="loisir" title="Competence">
                    <LoisirDetail loi={loisir}  />
                </Tab>
                <Tab eventKey="connaissance en informatique" title="Connaissance en informatique">
                    <InformatiqueDetail informe={informatique} />
                </Tab>
            </Tabs>
        </>
    )
}