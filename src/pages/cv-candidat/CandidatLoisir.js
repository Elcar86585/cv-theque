import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CandidatLoisir({loi}) {
    return(
        <>
            <ul className="list-inline">
                {loi && loi.map(lo => {
                    return(
                        <>
                            <GetLoisir id={lo} />
                        </>
                    )
                })}
            </ul>
        </>
    )
}

function GetLoisir({id}) {
    const [loisir, setLoisir] = useState('');
    useEffect(() => {
        axios.get(`loisirs/${id}`).then(resp => {
            setLoisir(resp.data);
        })
    }, [id])
    return(
        <>
            <li className="list-inline-item"><span className="badge badge-light">{loisir.loisir} </span></li>
        </>
    )
}
