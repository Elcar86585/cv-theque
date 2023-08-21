import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import { NotificationManager } from "react-notifications";


export default function ProfilIdeal({user}) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        const formData = new FormData;
        formData.append('description', form);
        formData.append('user_id', user.id);
        axios.post( 'profil_ideals', formData).then(resp => {
            if(resp.status === 201){
              NotificationManager.success('Votre demande a été envoyer avec sucèes', 'Envoyer', 4000)
              handleClose();
            }else{
                NotificationManager.warning('Une erreur est servenu lors de l\'envoye', 'Erreur', 4000)
            }
        }).catch(error => console.log(error));
    }
    return (
        <>
            <Button class="btn btn-primary mb-2" onClick={handleShow}>
                Je ne trouve pas le profil ideal
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>Je ne trouve pas le profil idéal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Faite nous connaître votre profil ideal
                    <br/><br/>
                    <form>
                        <textarea onChange={(e) => setForm(e.target.value)} className="form-control" placeholder="Description de votre profile idéal ici">
                        </textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Fermer
                    </Button>
                    {form ? (
                        <Button variant="primary btn-sm" onClick={handleSubmit}>Envoyer</Button>
                    ):(<></>)}
                </Modal.Footer>
            </Modal>
        </>
    )
}
