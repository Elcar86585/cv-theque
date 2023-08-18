import axios from "axios";
import React, { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';

export default function EditLangue({id}) {
    const [langue, setLangue] = useState('');
    const [langage, setLangage] = useState('');
    const [progresslangue, setProgresslangue] = useState('');

    useEffect(() => {
        axios.get(`langages/${id}`).then(resp => {
            if(resp.status === 200) {
                setLangue(resp.data)
            }
        }).catch(error => console.log(error))
    }, [id])

    const editInfo = () => {
        const formdata = new FormData;
        if(langue){formdata.append('langue', langue)}
        if(progresslangue){formdata.append('progresslangue', progresslangue)}
        if(langue || progresslangue) {
            axios.put(`langages/${id}`, formdata).then(resp => {
                if(resp.status === 200) {
                    NotificationManager.success('Modifier avec succée', 'Modification valdataer', 4000)
                }
            }).catch(error => console.log(error))
        }else {
            NotificationManager.warning('Aucune modification enregistrer', 'Modification non valider', 4000)
        }
    }

    const deleteLangue = () => {
        axios.delete(`langages/${id}`).then(resp => {
            if(resp.status === 204) {
                NotificationManager.success('Vous avec supprimer une langue', 'Suprimer avec succèes', 4000)
            }
        }).catch(error => console.log(error))
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
                        onChange={(e) => setLangage(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Niveau </h6>
                </div>
                <div className="col-sm-9 text-secondary input-group">
                    <input 
                        type="text" className="form-control" defaultValue={langue.progresslangue}
                        onChange={(e) => setProgresslangue(e.target.value)}
                    />
                    <span class="input-group-text">%</span>
                </div>
            </div>
            
            <div className="row container">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary ">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button title="Enregistrer les modifications" type="button" onClick={EditLangue} className="btn btn-primary">
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