import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FileViewer} from 'react-file-viewer';

export default function ResumeModal({res}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const type = 'pdf'
    const onError = e => {
        console.log(e, "error in file-viewer");
      };

    console.log(res)
    
    return (
        <>
            <Button variant="success btn-lg" onClick={handleShow}>
                <i className="bi bi-eye"></i> &nbsp;
                Voir le Cv
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                className="me-2"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {res && res.url ? (
                        <>
                            <FileViewer
                                fileType={type}
                                filePath={`https://cvtheque.activsolution.fr:33066/${res.url}`}
                                onError={onError}
                            />
                        </>
                    ):(
                        <>
                            Pas encore de CV
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}