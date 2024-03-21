import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function AddExperience({idCv}) {
    const [show, setShow] = useState(false);
    const navigation = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [entreprise, setEntreprise] = useState('');
    const [debutDate, setDebutDate] = useState('');
    const [finDate, setFinDate] = useState('');
    const [descrExp, setDescrexp] = useState('');

    const taona = [];
    for (let year = 1990; year <= 2040; year++) {
        taona.push(`${year}`);
    }

    const handlExp = () => {
        const dataExp = new FormData;
        dataExp.append('societe', entreprise);
        dataExp.append('datexp', debutDate);
        dataExp.append('datefin', finDate);
        dataExp.append('descriptionexp', descrExp)
        dataExp.append('cv_id', idCv)
        axios.post('experiences', dataExp).then(resp => {
            
            if(resp.status === 201){
                NotificationManager.success('Expérience enregistrer avec succès', 'Enregister', 4000);
                navigation(`/cv/${idCv}`);
            }else{
                NotificationManager.warning('Une erreur est survenue', 'erreur', 4000)
            }
        })
    }

    
    return (
        <>
            <Button variant="info" onClick={handleShow}>
                <b>+</b> Ajouter une expérience
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <div className="form-group">
                                <label className="form-label">Nom de l'entreprise</label>
                                <input required onChange={(e) => setEntreprise(e.target.value)} maxLength={50} className="form-control mb-2 input-credit-card"
                                    type="textarea" placeholder="Société" />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label className="form-label">Date de debut et de fin</label>
                                <div class="input-group">
                                    <select type='text' defaultValue={2023} maxLength={4} onChange={(e) => setDebutDate(e.target.value)} class="date-own form-control">
                                        {taona.map((date) => (
                                            <option value={date} key={date}>{date}</option>
                                        ))}
                                    </select>
                                    <select type="text" defaultValue={2024} maxLength={4} onChange={(e) => setFinDate(e.target.value)} class="form-control">
                                        {taona.map((date) => (
                                            <option value={date} key={date}>{date}</option>
                                        ))}
                                    </select>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label className="form-label">Description du poste</label>
                        <textarea required onChange={(e) => setDescrexp(e.target.value)} className="form-control mb-2 input-credit-card"
                            type="textarea" placeholder="Description de votre post" rows="3" >
                        </textarea>
                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handlExp}>
                        Enregistrer
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}