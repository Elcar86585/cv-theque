import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ExperienceDetail({exp}) {
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-12">
                    <div >
                        <div className="card-body">
                            {exp && exp.map(experience => {
                                return (
                                    <GetExperience data={experience} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetExperience({data}) {
    const [expert, setExpert] = useState('')
    useEffect(() => {
        axios.get(`experiences/${data}`).then(resp => {
            if(resp.status === 200){
                setExpert(resp.data)
            }
        }).catch(error => console.log(error))
    }, [data])
    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <h6 className="mb-0">
                        <b>{expert.societe}</b>
                        <br/><br/>
                        {expert.datexp}
                    </h6>
                </div>
                <div className="col-sm-8 text-secondary">
                    {expert.descriptionexp}
                </div>
            </div>
            <hr />
        </>
    )
}