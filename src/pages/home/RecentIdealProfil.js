import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";


export default function RecentIdealProfil({ use }) {
    const [ideal, setIdeal] = useState('');

    useEffect(() => {
        axios.get('profil_ideals').then(resp => {
            if (resp.status === 200) {
                setIdeal(resp.data.slice(0, 4))
            }
        }).catch(error => console.log(error))
    }, [1])
    const getIde = () => {
        axios.get('/profil_ideals').then(resp => {
            if (resp.status === 200) {
                setIdeal(resp.data.slice(0, 4))
            }
        }).catch(error => console.log(error))
    }
    const dating = moment().format('Do MMMM YYYY, h:mm ');
    const handleDeleteProfileIdeal = (idPro) => {
        const confirmation = window.confirm('Vous voulez vraiment le supprimer')
        if(confirmation === true){
            axios.delete(`profil_ideals/${idPro}`).then(response => {
                console.log(response)
                if(response.status === 204){
                    NotificationManager.success('Notification supprimer avec succès', 'Supprimer avec succès', 4000);
                    getIde();
                }else{
                    NotificationManager.warning('Une erreur est suvenu lors de la traitement', 'Erreur' , 4000 )
                }
                console.log(response.data)
            }).catch(error => console.log(error))
        }
    }
    return (
        <div class="layout-spacing">
            <div class="statbox widget box box-shadow">
                <div class="widget-content widget-content-area">
                    <div class="row">
                        {ideal && ideal.map(ide => {
                            return (
                                <>
                                    <div class="container">
                                        <h6 class="card-title">
                                            <Link to={`/user/${ide.user_id}`}>
                                                <GetingUser ud={ide.user_id} />
                                            </Link>
                                        </h6>
                                        <p class="card-text">
                                            {ide.description}
                                        </p>
                                        <p class="card-text"><small class="text-muted">
                                            --{dating}
                                        </small></p>
                                        <Link onClick={() => handleDeleteProfileIdeal(ide.id)} className="badge badge-danger">Supprimer</Link>
                                        <hr />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function GetingUser({ud}) {
    const [usered, setUsered] = useState('')
    useEffect(() => {
        axios.get(`users/${ud}`).then(resp => {
            if(resp.status === 200){
                setUsered(resp.data.user)}
        }).catch(error => console.log(error))
    }, [ud])
    return (
        <strong>
            {usered.name}
        </strong>
    )
}