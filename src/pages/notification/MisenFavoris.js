import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MisenFavoris({ fav, funk }) {
    return (
        <>
            {fav && fav.map(f => {
                return (
                    <div class="card" >
                       <FavorisDetails data={f} fiction={funk} />
                    </div>
                )
            })}
        </>
    )
}

function FavorisDetails({data, fiction}) {
    const [user, setUser] = useState('');
    const [cv, setCv] = useState('');
    useEffect(() => {
        if(data.id){
            axios.get(`users/${data.user_id}`).then(resp => {
                if(resp.status === 200){
                    setUser(resp.data.user)
                }
            })
            axios.get(`cvs/${data.cv_id}`).then(resp => {
                if(resp.status === 200){
                    setCv(resp.data.cv)
                }
            })
        }
    }, [data.id])

    const daty = moment(data.created_at).format('Do MMMM YYYY, h:mm a'); // August 17th 2023, 12:39:22 pm
    
    return (
        <div class="card-body">
            <h5 class="card-title">{user.name} à mis {cv.nomPrenom} (00{cv.id}) dans sa liste de favori </h5>
            <h6 class="card-subtitle mb-2 text-muted">{user.email} / {user.phone}</h6>
            <p class="card-text">
                Le {daty}
            </p>
            <Link to={`/user/${user.id}`} class="card-link"><u>A propos de {user.name}</u></Link>
            <Link to={`/cv/${cv.id}`} class="card-link"><u>A propos de {cv.nomPrenom}</u> </Link>
        </div>
    )
}