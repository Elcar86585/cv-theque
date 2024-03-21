import axios from "axios";
import React, { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';
import { useNavigate } from "react-router-dom";

export default function EditExperience({data}) {
    const [experience, setExperience] = useState('');
    const [societe, setSociete] = useState('');
    const [dateExp, setDateExp] = useState('');
    const navigate = useNavigate();
    const [descriptionExp, setDescriptionExp] = useState('');
    const [datefin, setDateFin] = useState('');
    useEffect(() => {
       getExperiences();
    }, [data])

    const getExperiences = () => {
        axios.get(`experiences/${data}`).then(resp => {
            if(resp.status === 200) {
                setExperience(resp.data)
            }
        }).catch(error => console.log(error))
    }
    
    const editExperience = () => {
        const formdata = new FormData;
        if(societe){formdata.append('societe', societe)}
        if(dateExp){formdata.append('datexp', dateExp)}
        if(descriptionExp){formdata.append('descriptionexp', descriptionExp)}
        if(datefin){formdata.append('datefin', datefin)}
        if(societe || dateExp || descriptionExp || datefin) {
            axios.put(`experiences/${data}`, formdata).then(resp => {
                if(resp.status === 200) {
                    NotificationManager.success('Modifier avec succée', 'Modification valdataer', 4000);
                    getExperiences();
                }
            }).catch(error => console.log(error))
        }else {
            NotificationManager.warning('Aucune modification enregistrer', 'Modification non valider', 4000);
        }
    }

    const DeleteExperience = () => {
        if(window.confirm("Vous êtes sûr ?") === true){
            axios.delete(`experiences/${data}`).then(resp => {
                if(resp.status === 204) {
                    NotificationManager.success('Vous avec supprimer une experience', 'Suprimer avec succèes', 4000);
                    navigate('/cv');
                }
            }).catch(error => console.log(error));
        }
    }
    
    const dexp = [];
    for (let years = 1990; years <= 2040; years++) {
        dexp.push(`${years}`);
    }

    return (
        <form>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Société</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input 
                        type="text" className="form-control" defaultValue={experience.societe}
                        onChange={(e) => setSociete(e.target.value)}
                    />

                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Date d'experience</h6>
                </div>
                <div className="col-sm-4 text-secondary">
                    <select 
                        type="text" className="form-control" defaultValue={experience.datexp}
                        onChange={(e) => setDateExp(e.target.value)}
                    >
                        <option defaultChecked >{experience.datexp}</option>
                        {dexp.map((dates) => (
                            <option value={dates} key={dates}>{dates}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-5 text-secondary">
                    <select 
                        type="date" className="form-control" defaultValue={experience.datefin}
                        onChange={(e) => setDateFin(e.target.value)}
                    >
                        <option defaultChecked >{experience.datefin}</option>
                         {dexp.map((dates) => (
                            <option value={dates} key={dates}>{dates}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">Description de post</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <textarea 
                        type="text" className="form-control" defaultValue={experience.descriptionexp} rows={4}
                        onChange={(e) => setDescriptionExp(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={editExperience} className="btn btn-primary">
                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                            Enregistrer les modifications
                        </button>
                        <button type="button" onClick={DeleteExperience} className="btn btn-danger">
                            <i class="bi bi-trash"></i>&nbsp;
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}