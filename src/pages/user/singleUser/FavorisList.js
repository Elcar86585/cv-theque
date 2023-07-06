import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function FavorisList({ids}) {
    var date = moment(ids.created_at); // crée un objet Moment pour la date actuelle
    var formattedDate = date.fromNow(); // format "il y a quelques minutes"
    return (
        <div className="tab-pane active show" id="profile">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover table-striped">
                        <tbody>
                            {ids && ids.map(favori => {
                                return(
                                    <tr>
                                        <GetData data={favori} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


function GetData({data, date}) {
    const [user, setUser] = useState('');
    const [cv, setCv] = useState('');
    const [detail, setDetail] = useState(false);
    var date = moment(data.created_at); // crée un objet Moment pour la date actuelle
    var formattedDate = date.fromNow(); // format "il y a quelques minutes"
    useEffect(() => {
        if(data.id){
            axios.get(`users/${data.user_id}`).then(resp => {
                setUser(resp.data.user)
            });
            axios.get(`cvs/${data.cv_id}`).then(resp => {
                setCv(resp.data.cv)
            })
        }
    }, [data.id])

    const handleDetials = () => {
        if(detail === false){
            setDetail(true)
        }else{
            setDetail(false)
        }
    }
    return(
        <td>
            <span className="float-right font-weight-bold">il y a {formattedDate}</span>
             <strong>{user.name}</strong> à mis <strong>{cv.nomPrenom} ou ``ID : {cv.id}``</strong> dans la liste de ses favoris
             <br/>
             <Link onClick={()=> handleDetials()}><h6><span className="badge bg-warning text-dark">Détails sur {cv.nomPrenom}</span></h6></Link>
             {detail === true ? (
                <>
                    <hr/>
                    <ul className="list-group">
                        <li className="list-group-item bg-warning active"><strong>A propos de {cv.nomPrenom} </strong></li>
                        <li className="list-group-item">ID :
                            <span className="float-right font-weight-bold">{cv.id}</span>
                        </li>
                        <li className="list-group-item">Nom et prénom :
                            <span className="float-right font-weight-bold">{cv.nomPrenom}</span>
                        </li>
                        <li className="list-group-item">Post :
                            <GetCategorie id={cv.categorie_cv_id} />
                        </li>
                        <li className="list-group-item">Expérience :
                            <span className="float-right font-weight-bold">{cv.aExperience}</span>
                        </li>
                        <li className="list-group-item">Disponibilité :
                            <span className="float-right font-weight-bold">{cv.disponibility}</span>
                        </li>
                        <li className="list-group-item">Téléphone :
                            <span className="float-right font-weight-bold">{cv.telephone}</span>
                        </li>
                        <li className="list-group-item">E-mail :
                            <span className="float-right font-weight-bold">{cv.email}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="float-right font-weight-bold">
                                <Link to={`/cv/${cv.id}`} ><h6><span className="badge bg-success">Voir le cv de {cv.nomPrenom} </span></h6></Link>
                            </span>
                        </li>
                    </ul>
                </>
             ):(<></>)}
        </td>
    )
}

function GetCategorie({id}) {
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                setCat(resp.data.cat)
            })
        }
    }, [id])
    return(
        <>
            <span className="float-right font-weight-bold">{cat.categorie}</span>
        </>
    )
}