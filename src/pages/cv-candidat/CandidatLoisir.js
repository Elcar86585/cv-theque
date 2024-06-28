import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoaderContent from './modal/LoaderContent';

export default function CandidatLoisir({loi}) {
    if(loi.length === 0){
        return(
            <div class="container">
            <div className='row'>
            <ul className="list-inline">
                <LoaderContent />
            </ul>
            </div>
        </div>
        )
    }
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
