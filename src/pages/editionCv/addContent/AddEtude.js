import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function AddEtude({idCv}) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [etude, setEtude] = useState('');
    const [datecole, setDatecole] = useState('');
    const [datefinecole, setDateFinEcole] = useState('');
    const [descrEcole, setDescrEcole] = useState('');

    const dati = [];
    for (let year = 1990; year <= 2040; year++) {
        dati.push(`${year}`);
    }

    const handlEcole = () => {
        const dataEc = new FormData;
        dataEc.append('ecole', etude);
        dataEc.append('datecole', datecole);
        dataEc.append('datefinecole', datefinecole);
        dataEc.append('descriptionecole', descrEcole);
        dataEc.append('cv_id', idCv)
        axios.post('diplomes', dataEc).then(resp => {
            
            if(resp.status === 201){
                NotificationManager.success('Expérience enregistrer avec succès', 'Enregister', 4000);
                navigate(`/cv/${idCv}`);
            }else{
                NotificationManager.warning('Une erreur est survenue', 'erreur', 4000)
            }
        })
    }

    
    return (
        <>
            <Button variant="info" onClick={handleShow}>
                <b>+</b> Ajouter un école
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ecole</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <div className="form-group">
                                <label className="form-label">Nom de l'ecole</label>
                                <input required onChange={(e) => setEtude(e.target.value)} maxLength={50} className="form-control mb-2 input-credit-card"
                                    type="textarea" placeholder="Ecole" />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label className="form-label">Date de debut et de fin</label>
                                <div class="input-group">
                                    <select type='text' defaultValue={2023} maxLength={4} onChange={(e) => setDatecole(e.target.value)} class="date-own form-control">
                                        {dati.map((date) => (
                                            <option value={date} key={date}>{date}</option>
                                        ))}
                                    </select>
                                    <select type="text" defaultValue={2024} maxLength={4} onChange={(e) => setDateFinEcole(e.target.value)} class="form-control">
                                        {dati.map((date) => (
                                            <option value={date} key={date}>{date}</option>
                                        ))}
                                    </select>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label className="form-label">Description de votre cursus</label>
                        <textarea required onChange={(e) => setDescrEcole(e.target.value)} className="form-control mb-2 input-credit-card"
                            type="textarea" placeholder="Description de votre cursus" rows="3" >
                        </textarea>
                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handlEcole}>
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