import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'


export default function ProfilIdeal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                        <textarea className="form-control" placeholder="Description de votre profile idéal ici">
                        </textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary btn-sm">Envoyer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
