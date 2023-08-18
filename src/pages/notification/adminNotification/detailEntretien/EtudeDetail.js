import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EtudeDetail({format}) {
    return (
        <>
        <div className="row gutters-sm">
                <div className="col-md-12">
                    <div >
                        <div className="card-body">
                            {format && format.map(etude => {
                                return (
                                    <>
                                        <GetStudy id={etude} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetStudy({id}) {
    const [diple, setDiple] = useState('')
    useEffect(() => {
        axios.get(`diplomes/${id}`).then(resp => {
            if(resp.status === 200){
                setDiple(resp.data)
            }
        }).catch(error => console.log(error))
    }, [id])
    return (
        <>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">
                        <b>
                            {diple.ecole}
                        </b>
                    </h6><br/>
                    {diple.datecole}
                </div>
                <div className="col-sm-9 text-secondary">
                    {diple.descriptionecole}
                </div>
            </div>
            <hr />
        </>
    )
}