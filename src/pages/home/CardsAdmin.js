import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function CardsAdmin() {
    const [userData, setUserData] = useState([]);
    const [cvs, setCvs] = useState([])
    const [demande, setDemande] = useState([])
    const [entretien, setEntretien] = useState([])

    useEffect(() => {
        axios.get('users').then(resp => {
            if(resp.status === 200) {
                setUserData(resp.data)
            }
        })
        axios.get('cvs').then(resp => {
            if(resp.status === 200) {
                setCvs(resp.data)
            }
        })
        axios.get('demand_logins').then(resp => {
            if(resp.status === 200) {
                setDemande(resp.data)
            }
        })
        axios.get('entretiens').then(resp => {
            if(resp.status === 200) {
                setEntretien(resp.data)
            }
        })
    }, [1])

    // Demande d'entretien
    const entretienFalse = entretien.filter(entretien => entretien.lu === false)
    const entretienFalseCounter = entretienFalse.length

    const entretientrue = entretien.filter(entretien => entretien.lu === true)
    const entretientrueCounter = entretientrue.length

    // Demande de login counter
    const demandeLoginCounter = demande.filter(demande => demande.lu === true)
    const demandeLogCounter = demandeLoginCounter.length

    const demandeLoginCounterFalse = demande.filter(demande => demande.lu === false)
    const demandeLogCounterFalse = demandeLoginCounterFalse.length

    // Counter cvs
    const cvPublier = cvs.filter(cvs => cvs.status === true)
    const counterCv = cvPublier.length

    const cvBroullion = cvs.filter(cvs => cvs.status === false)
    const cvBroullionCounter = cvBroullion.length

    // counter Admin
    const admins = userData.filter(user => user.role === 'Administrateur');
    const numAdmins = admins.length;

    const regularUsers = userData.filter(user => user.role === 'Utilisateur');
    const numUsers = regularUsers.length;
    
    return (
        <>
            <div className="row">
                <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-blue order-card">
                        <div className="card-block">
                            <h4 className="m-b-20">Utilisateur</h4>
                            <h2 className="text-right"><i className="bi bi-person-check f-left"></i><span>
                                {userData.length}    
                            </span></h2>
                            <p className="m-b-0">Administrateur<span className="f-right fw-bold">{numAdmins} </span></p>
                            <p className="m-b-0">Client<span className="f-right fw-bold">{numUsers} </span></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-green order-card">
                        <div className="card-block">
                            <h4 className="m-b-20">Profil de candidat</h4>
                            <h2 className="text-right"><i className="bi bi-file-earmark-person f-left"></i><span>
                                {cvs.length}    
                            </span></h2>
                            <p className="m-b-0">Profil publier<span className="f-right fw-bold">{counterCv} </span></p>
                            <p className="m-b-0">Profil en broullion<span className="f-right fw-bold">{cvBroullionCounter} </span></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-yellow order-card">
                        <div className="card-block">
                            <h4 className="m-b-20">Demande de login</h4>
                            <h2 className="text-right"><i className="bi bi-box-arrow-in-right f-left"></i><span>
                                {demande.length}    
                            </span></h2>
                            <p className="m-b-0">Valider<span className="f-right fw-bold">{demandeLogCounter} </span></p>
                            <p className="m-b-0">En cours de validation<span className="f-right fw-bold">{demandeLogCounterFalse} </span></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-pink order-card">
                        <div className="card-block">
                            <h4 className="m-b-20">Demande d'entretien</h4>
                            <h2 className="text-right"><i className="bi bi-person-add f-left"></i><span>
                                {entretien.length}
                            </span></h2>
                            <p className="m-b-0">Valider<span className="f-right fw-bold">{entretientrueCounter} </span></p>
                            <p className="m-b-0">En ocurs de validation<span className="f-right fw-bold">{entretienFalseCounter} </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}