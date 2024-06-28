import axios from "axios";
import React, { useEffect, useState } from "react";
import LoaderContent from "./modal/LoaderContent";

export default function CandidatLangage({lang}) {
    if(lang.length === 0){
        return(
            <ul className="list-unstyled mb-4">
                <LoaderContent />
            </ul>
        )
    }
    return(
        <>
            <ul className="list-unstyled mb-4">
                {lang && lang.map(lan => {
                    return(
                        <>
                            <li className="mb-2">
                               <LangueContent id={lan} />
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}


function LangueContent({id}) {
    const [langue, setLangue] = useState('')
    useEffect(() => {
        axios.get(`langages/${id}`).then(resp => {
            setLangue(resp.data)
        })
    }, [id])
    const progress = langue.progresslangue + "%"
    return(
        <>
            <div className="resume-skill-name">{langue.langue} </div>
                <div className="progress resume-progress">
                <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{"width": `${progress}`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </>
    )
}