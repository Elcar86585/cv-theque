import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";


export default function CandidatEtude({diplo}) {
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
    const detude = moment(etude.datecole).format("Do MMM YYYY");
    const fetude = moment(etude.datefinecole).format("Do MMM YYYY");
    return(
        <>
        <li className="mb-2">
            <div className="resume-degree font-weight-bold">{etude.ecole}</div>
            <div className="resume-degree-time">{detude} - {fetude} </div>
            <div className="resume-degree-org">
                {etude.descriptionecole}
            </div>
        </li>
        </>
    )
}