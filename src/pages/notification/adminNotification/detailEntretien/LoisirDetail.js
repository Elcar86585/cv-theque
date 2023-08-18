import axios from "axios";
import React, { useEffect, useState } from "react";


export default function LoisirDetail({loi}) {
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-12">
                    <div >
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center">
                                <ul className="list-inline mb-0">
                                    {loi && loi.map(l => {
                                        return (
                                            <GetLoisir l={loi} />
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetLoisir({l}) {
    const [loisir, setLoisir] = useState('');
    useEffect(() => {
        axios.get(`loisirs/${l}`).then(resp => {
            setLoisir(resp.data)
        }).catch(error => console.log(error))
    }, [l])
    return(
        <>
            <li class="list-inline-item px-2" style={{"borderRadius": "90px", "background": "#efefef"}}>
                {loisir.loisir}
            </li>
        </>
    )
}

