import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CandidatLoisir({loi}) {
    return(
        <div class="container">
            <div className='row'>
            <ul className="list-inline">
                {loi && loi.map(lo => {
                    return(
                        <>
                            <GetLoisir id={lo} />
                        </>
                    )
                })}
            </ul>
            </div>
        </div>
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
            <li className="list-inline-item">{loisir.loisir}</li>
        </>
    )
}
