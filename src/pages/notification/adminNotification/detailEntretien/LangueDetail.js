import axios from "axios";
import React, { useEffect, useState } from "react";
import {ProgressBar} from 'react-bootstrap';

export default function LangueDetail({langu}) {
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-12">
                    <div >
                        <div className="card-body">
                            {langu && langu.map(lang => {
                                return (
                                    <GetLangue l={lang} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetLangue({l}) {
    const [lang, setLang] = useState('')
    useEffect(() => {
        axios.get(`langages/${l}`).then(resp => {
            if(resp.status === 200){
                setLang(resp.data)
            }
        }).catch(error => console.log(error))
    }, [l])
    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <h6 className="mb-0">
                        <b>{lang.langue} </b>
                    </h6>
                </div>
                <div className="col-sm-8 text-secondary">
                    {lang.progresslangue} %
                    <ProgressBar animated variant="success" now={lang.progresslangue} />
                </div>
            </div>
            <hr />
        </>
    )
}