import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
    const dating = moment().format('Do MMMM YYYY, h:mm ');
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