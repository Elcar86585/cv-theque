import React, { useEffect, useState } from "react";
import axios from "axios";
import {NotificationManager} from 'react-notifications';

export default function EditEtude({id}) {
    const [etude, setEtude] = useState('');
    const [ecole, setEcole] = useState('');
    const [dateEtude, setDateEtude] = useState('');
    const [dateFinEcole, setDateFinEcole] = useState('');
    const [descEtude, setDescetude] = useState('');

    useEffect(() => {
        axios.get(`diplomes/${id}`).then(resp => {
            if(resp.status === 200) {
                setEtude(resp.data)
            }
        }).catch(error => console.log(error))
    }, [id])

    const editEtude = () => {
        const data = new FormData;
        if(ecole){data.append('ecole', ecole)}
        if(dateEtude){data.append('datecole', dateEtude)}
        if(descEtude){data.append('descriptionecole', descEtude)}
        if(dateFinEcole){data.append('datefinecole', dateFinEcole)}
        if(ecole || dateEtude || descEtude || dateFinEcole) {
            axios.put(`diplomes/${id}`, data).then(resp => {
                if(resp.status === 200) {
                    NotificationManager.success('Modifier avec succée', 'Modification valider', 4000)
                }
            })
        }else {
            NotificationManager.warning('Aucune modification enregistrer', 'Modification non valider', 4000)
        }
    }

    const deletion = () => {
        axios.delete(`diplomes/${id}`).then(resp => {
            if(resp.status === 204) {
                NotificationManager.success('Vous avec supprimer une etude ou formation', 'Suprimer avec succèes', 4000)
            }
        }).catch(error => console.log(error))
    }
    
    return (
        <form>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Institution ou école</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="text" 
                        className="form-control" defaultValue={etude.ecole}
                        onChange={(e) => setEcole(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Date d'etude</h6>
                </div>
                <div className="col-sm-5 text-secondary">
                    <input type="date" 
                        className="form-control" defaultValue={etude.datecole}
                        onChange={(e) => setDateEtude(e.target.value)}
                    />
                </div>
                <div className="col-sm-4 text-secondary">
                    <input type="date" 
                        className="form-control" defaultValue={etude.datefinecole}
                        onChange={(e) => setDateFinEcole(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Description</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <textarea 
                        type="text" className="form-control" 
                        defaultValue={etude.descriptionecole} rows={4}
                        onChange={(e) => setDescetude(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={editEtude} className="btn btn-primary">
                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                            Enregistrer les modifications
                        </button>
                        <button type="button" onClick={deletion} className="btn btn-danger">
                            <i class="bi bi-trash"></i>&nbsp;
                            Supprimer
                        </button>
                    </div>
                </div>
            
            </div>
        </form>
    )
}