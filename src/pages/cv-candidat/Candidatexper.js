import axios from "axios";
import moment from "moment";
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
    const dexp = moment(experience.datexp).format("Do MMM YYYY");
    const fexp = moment(experience.datefin).format("Do MMM YYYY");
    const exper = moment(experience.datefin).format('YYYY') - moment(experience.datexp).format('YYYY')
    return(
        <>
            <div className="resume-timeline-item-header mb-2">
                <div className="d-flex flex-column flex-md-row">
                    {societe}
                    <div className="resume-company-name ml-auto"> 
                        {exper} an(s)
                    </div>
                </div>
                <div className="resume-position-time">{dexp} - {fexp} </div>
            </div>
            <div className="resume-timeline-item-desc">
                <p>
                    {experience.descriptionexp}
                </p>
            </div>
        </>
    )
}