import React, { useEffect, useState } from "react";
import axios from "axios";
import {NotificationManager} from 'react-notifications';

export default function EditInfo({id}) {
    const [info, setInfo] = useState('');
    const [logiciel, setLogiciel] = useState('');
    const [progressinfo, setProgressinfo] = useState('');
    useEffect(() => {
    if(id !== null){
        axios.get(`informatiques/${id}`).then(resp => {
            if(resp.status === 200) {
                setInfo(resp.data)
            }
        }).catch(error => console.log(error))
    }
    }, [id])

    const editInfo = () => {
        const formdata = new FormData;
        if(logiciel){formdata.append('logiciel', logiciel)}
        if(progressinfo){formdata.append('progressinfo', progressinfo)}
        if(logiciel || progressinfo) {
            axios.put(`informatiques/${id}`, formdata).then(resp => {
                if(resp.status === 200) {
                    NotificationManager.success('Modifier avec succée', 'Modification valdataer', 4000)
                }
            }).catch(error => console.log(error))
        }else {
            NotificationManager.warning('Aucune modification enregistrer', 'Modification non valider', 4000)
        }
    }

    const deleteInfo = () => {
        axios.delete(`informatiques/${id}`).then(resp => {
            if(window.confirm("Vous êtes Sûr ?") === true){
                if(resp.status === 204) {
                    NotificationManager.success('Vous avec supprimer un connaissance en informatique', 'Suprimer avec succèes', 4000)
                }
            }
        }).catch(error => console.log(error))
    }

    const ninfo = [];
    for(let numbre = 10; numbre <= 100; numbre += 10){
        ninfo.push(`${numbre}`)
    }


    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Logiciel</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input 
                        type="text" className="form-control" defaultValue={info.logiciel}
                        onChange={(e) => setLogiciel(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Niveau</h6>
                </div>
                <div className="col-sm-9 text-secondary input-group">
                    <select
                        type="text" className="form-control" defaultValue={info.progressinfo}
                        onChange={(e) => setProgressinfo(e.target.value)}
                    >
                        <option aria-checked > {info.progressinfo} </option>
                        {ninfo.map((cent) => (
                            <option value={cent} >{cent} </option>
                        ))}

                    </select>
                    <span class="input-group-text">%</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={editInfo} className="btn btn-primary">
                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                            Enregistrer les modifications
                        </button>
                        <button type="button" onClick={deleteInfo} className="btn btn-danger">
                            <i class="bi bi-trash"></i>&nbsp;
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
