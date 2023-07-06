import axios from "axios";
import React, {useEffect, useState} from "react";


export default function CandidatExper({exp}) {
    return (
        <>
        {exp && exp.map(exper => {
            return (
                <>
                    <article className="resume-timeline-item position-relative pb-5">
                       <ContentExp id={exper} />
                    </article>
                </>
            )
        })}
        </>
    )
}

function ContentExp({id}) {
    const [experience, setExperience] = useState('');
    useEffect(() => {
        axios.get(`experiences/${id}`).then(resp => {
            setExperience(resp.data);
        })
    }, [id])
    let societe;
    if(localStorage.url === 'Administrateur'){
        societe = (
            <h3 className="resume-position-title font-weight-bold mb-1">{experience.societe} </h3>
        )
    }else {
        societe = (
            <h3 className="resume-position-title font-weight-bold mb-1">XXXXXXX </h3>
        )
    }
    return(
        <>
            <div className="resume-timeline-item-header mb-2">
                <div className="d-flex flex-column flex-md-row">
                    {societe}
                    <div className="resume-company-name ml-auto">
                        {experience.id}
                    </div>
                </div>
                <div className="resume-position-time">{experience.datexp} </div>
            </div>
            <div className="resume-timeline-item-desc">
                <p>
                    {experience.descriptionexp}
                </p>
            </div>
        </>
    )
}