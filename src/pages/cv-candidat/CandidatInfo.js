import axios from "axios";
import React, { useEffect, useState } from "react";
import LoaderContent from "./modal/LoaderContent";

export default function CandidatInfo({infor}) {
    if(infor.length === 0) {
        return(
            <ul className="list-unstyled mb-4">
                <LoaderContent />
             </ul>
        )
    }
    return (
        <>
             <ul className="list-unstyled mb-4">
                {infor && infor.map(info => {
                    return(
                        <>
                            <li className="mb-2">
                                <InfoContent id={info} />
                            </li>
                        </>
                    )
                })}
             </ul>
        </>
    )
}


function InfoContent({id}) {
    const [info, setInfo] = useState('');

    useEffect(() => {
        axios.get(`informatiques/${id}`).then(resp => {
            setInfo(resp.data);
        })
    }, [id]);

    const progress = info.progressinfo + "%"
    return (
        <>
            <div className="resume-skill-name"><strong>{info.logiciel} </strong> </div>
                <div className="progress resume-progress">
                <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{"width": `${progress}`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </>
    )
}