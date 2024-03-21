import React, { useEffect, useState } from "react";
import axios from "axios";
import {NotificationManager} from 'react-notifications';

export default function EditLoisir({id}) {
    const [loisir, setLoisir] = useState('');
    const [lois, setLois] = useState('');
    useEffect(() => {
        axios.get(`loisirs/${id}`).then(resp => {
            if(resp.status === 200) {
                setLoisir(resp.data);
            }
        }).catch(error => console.log(error))
    }, [id])

    const EditLoisir = () => {
        const formdata = new FormData;
        if(lois){formdata.append('loisir', lois)}
        if(lois) {
            axios.put(`loisirs/${id}`, formdata).then(resp => {
                if(resp.status === 200) {
                    NotificationManager.success('Modifier avec succée', 'Modification valdataer', 4000)
                }
            }).catch(error => console.log(error))
        }else {
            NotificationManager.warning('Aucune modification enregistrer', 'Modification non valider', 4000)
        }
    }

    const deleteLoisir = () => {
        if(window.confirm("Vous êtes Sûr ?") === true){
            axios.delete(`loisirs/${id}`).then(resp => {
                if(resp.status === 204) {
                    NotificationManager.success('Vous avec supprimer un loisirs', 'Suprimer avec succèes', 4000)
                }
            }).catch(error => console.log(error))
        }
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Compétence</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <textarea 
                        type="text" className="form-control" defaultValue={loisir.loisir}
                        onChange={(e) => setLois(e.target.value)}
                    ></textarea>
                </div>
            </div>
            
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button title="Enregistrer les modifications" type="button" onClick={EditLoisir} className="btn btn-primary">
                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                            Enregistrer
                        </button>
                        <button title="Supprimer" type="button" onClick={deleteLoisir} className="btn btn-danger">
                            <i class="bi bi-trash"></i>&nbsp;
                            
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}