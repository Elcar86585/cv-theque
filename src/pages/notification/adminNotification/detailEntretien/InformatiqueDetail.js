import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function InformatiqueDetail({informe}) {
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-12">
                    <div >
                        <div className="card-body">
                            {informe && informe.map(info => {
                                return (
                                    <GetInfo i={info} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetInfo({i}) {
    const [infor, setInfor] = useState('');
    useEffect(() => {
        axios.get(`informatiques/${i}`).then(resp => {
            if(resp.status === 200){
                setInfor(resp.data)
            }
        }).catch(error => console.log(error))
    }, [i])
    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <h6 className="mb-0">
                        <b>{infor.logiciel} </b>
                    </h6>
                </div>
                <div className="col-sm-8 text-secondary">
                    {infor.progressinfo} %
                    <ProgressBar animated variant="primary" now={infor.progressinfo} />
                </div>
            </div>
            <hr />
        </>
    )
}