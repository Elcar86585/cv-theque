import axios from "axios";
import React, { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';

export default function EditLangue({id}) {
    const [langue, setLangue] = useState('');
    const [language, setlanguage] = useState('');
    const [progresslang, setProgresslang] = useState('');

    useEffect(() => {
        axios.get(`langages/${id}`).then(resp => {
            if(resp.status === 200) {
                setLangue(resp.data)
            }
        }).catch(error => console.log(error))
    }, [id])

    const editInfo = () => {
        const formdata = new FormData;
        if(language){formdata.append('langue', language)}
        if(progresslang){formdata.append('progresslangue', progresslang)}
        axios.put(`langages/${id}`, formdata).then(resp => {
            if(resp.status === 200) {
                NotificationManager.success('Modifier avec succée', 'Modification valdataer', 4000)
            }
        }).catch(error => console.log(error))
        
    }

    const deleteLangue = () => {
        if(window.confirm("Vous êtes Sûr ?") === true){
            axios.delete(`langages/${id}`).then(resp => {
                if(resp.status === 204) {
                    NotificationManager.success('Vous avec supprimer une langue', 'Suprimer avec succèes', 4000)
                }
            }).catch(error => console.log(error))
        }
    }
    const niveau = [];
    for(let numbers = 10; numbers <= 100; numbers += 10) {
        niveau.push(`${numbers}`)
    }
    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Langue</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input 
                        type="text" className="form-control" defaultValue={langue.langue}
                        onChange={(e) => setlanguage(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Niveau </h6>
                </div>
                <div className="col-sm-9 text-secondary input-group">
                    <select 
                        type="select" className="form-control"
                        onChange={(e) => setProgresslang(e.target.value)}
                    >
                        <option>{langue.progresslangue}</option>
                        {niveau && niveau.map((niv) => (
                            <>
                                <option value={niv}>{niv}</option>
                            </>
                        ))}

                    </select>
                    <span class="input-group-text">%</span>
                </div>
            </div>
            
            <div className="row container">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary ">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button title="Enregistrer les modifications" type="button" onClick={editInfo} className="btn btn-primary">
                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                            Enregistrer
                        </button>
                        <button title="Supprimer" type="button" onClick={deleteLangue} className="btn btn-danger">
                            <i class="bi bi-trash"></i>&nbsp;
                            
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}