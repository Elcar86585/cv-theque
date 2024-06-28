import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import LoaderContent from "./modal/LoaderContent";


export default function CandidatEtude({diplo}) {

    if(diplo.length === 0){
        return (
            <section className="resume-section education-section mb-5">
                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Etudes</h2>
                <div className="resume-section-content">
                    <div className="resume-timeline position-relative">
                        <LoaderContent />
                        <LoaderContent />
                    </div>
                </div>
            </section>
        )
    }

    return(
        <>
            <section className="resume-section education-section mb-5">
                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Etudes</h2>
                <div className="resume-section-content">
                    <div className="resume-timeline position-relative">
                        {diplo && diplo.map(etu => {
                            return(
                                <article className="resume-timeline-item position-relative pb-5">
                                    <ul className="list-unstyled">    
                                        <EtudeContent id={etu}  />
                                    </ul>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}


function EtudeContent({id}) {
    const [etude, setEtude] = useState('');
    useEffect(() => {
            axios.get(`diplomes/${id}`).then(resp => {
                setEtude(resp.data);
        })
    }, [id])
    
    return(
        <>
        <li className="mb-2">
            <div className="resume-degree font-weight-bold">{etude.ecole}</div>
            <div className="resume-degree-time">{etude.datecole} - {etude.datefinecole} </div>
            <div className="resume-degree-org">
                {etude.descriptionecole}
            </div>
        </li>
        </>
    )
}