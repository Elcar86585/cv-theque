import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";


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
    const [demande, setDemande] = useState('');

    useEffect(() => {
        if (dem) {
            axios.get(`users/${dem.user_id}`).then(resp => {
                setUse(resp.data.user)
            }).catch(error => console.log(error))
        }
        if (dem) {
            axios.get(`cvs/${dem.cv_id}`).then(resp => {
                setCv(resp.data.cv)
            }).catch(error => console.log(error))
        }
        if(dem){
            axios.get(`entretiens/${dem.id}`).then(resp => {
                if(resp.status === 200) {
                    setDemande(resp.data)
                }
            }).catch(error => console.log(error))
        }
    }, [dem.id])

    const handleInfo = () => {
        if(info === false){
            setInfo(true)
        }else{
            setInfo(false)
        }
    }

    return (
        <>
            <div className="media forum-item">
                <div className="media-body">
                    <h6>
                        <Link to="#" data-toggle="collapse" data-target=".forum-content" className="text-body">
                            {use.name}
                        </Link>
                    </h6>
                    <p className="text-secondary">
                        A fait une demande d'entretien avec <strong>{cv.nomPrenom} ou ID : {cv.id}</strong>
                    </p>
                    <p className="text-muted">
                        <Link to={`/entretien/${dem.id}`}>
                            <button type="button" className="btn btn-primary btn-sm">Détail de la demande</button>
                        </Link>
                    </p>
                </div>
                <div className="text-muted small text-center align-self-center">
                    <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i></span>
                    <span><i className="far fa-comment ml-2"></i>{date}</span>&nbsp;
                    {demande.lu === true ? (<><i class="bi bi-check2-all"></i> Valider</>) : (<></>)}
                </div>
            </div>
        </>
    )
}

