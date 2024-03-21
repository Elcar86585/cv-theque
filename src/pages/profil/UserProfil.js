import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserProfil({ dataUser }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Modifier mon profil
            </Button>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Modification de profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Nom</label>
                                <input type="email" className="form-control" defaultValue={dataUser.name} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Prenom</label>
                                <input type="text" className="form-control" defaultValue={'mon prenom'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="inputAddress">Adresse</label>
                            <input type="text" className="form-control" defaultValue={'Mon adresse'} />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Pays</label>
                            <input type="text" className="form-control" defaultValue={dataUser.pays} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputCity">E-mail</label>
                                <input type="email" className="form-control" id="inputCity" defaultValue={dataUser.email} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputCity">Téléphone</label>
                                <input type="email" className="form-control" id="inputCity" defaultValue={dataUser.phone} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputCity">Post</label>
                                <input type="email" className="form-control" id="inputCity" defaultValue={'votre post'} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputCity">Entreprise</label>
                                <input type="email" className="form-control" id="inputCity" defaultValue={dataUser.societe} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserProfil;