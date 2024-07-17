import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Button, Modal } from 'react-bootstrap';

const Login = () => {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = (values, { resetForm }) => {
        const formdata = new FormData();
        formdata.append('email', values.email);
        formdata.append('password', values.password);

        axios.post('connection', formdata)
            .then(response => {
                if (response.status === 200) {
                    const user_id = response.data.user.id;
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('curent_user', user_id);
                    localStorage.setItem('url', response.data.user.role);
                    localStorage.setItem('user_token', response.data.user.authentication_token);
                    resetForm();
                    NotificationManager.success(response.data.message, 'utilisateur', 4000);
                    window.location.replace('/cvtheque');
                } else {
                    NotificationManager.warning(response.data.message, 'Erreur', 4000);
                }
            })
            .catch(error => {
                console.error(error);
                NotificationManager.error('Une erreur est survenue', 'Erreur', 4000);
            });
    };

    return (
        <div className='adminx-container d-flex justify-content-center align-items-center'>
            <div className='page-login'>
                {message && (
                    <div className={color} role="alert">
                        <center>{message}</center>
                    </div>
                )}
                <div className="card mb-0">
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">E-mail</label>
                                    <Field type="email" name="email" required className="form-control" placeholder="email@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Mot de passe</label>
                                    <Field type="password" name="password" required className="form-control" placeholder="Votre mot de passe" />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Se rappeler de moi</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-sm btn-block btn-primary">Se connecter</button>
                            </Form>
                        </Formik>
                    </div>
                    <div className="card-footer text-center">
                        <a href="#" onClick={handleShow}><small>Mot de passe oublié ?</small></a>
                    </div>
                </div>
            </div>
            <ModalShow showModal={showModal} handleClose={handleClose} />
        </div>
    );
};

const ModalShow = ({ showModal, handleClose }) => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        const formData = new FormData();
        formData.append('email', email);

        axios.post('/mdpo', formData)
            .then(response => {
                if (response.status === 200) {
                    NotificationManager.success('L\'email de récupération de mot de passe a été envoyé', 'Envoi avec succès', 4000);
                    handleClose();
                } else {
                    NotificationManager.warning('L\'email n\'existe pas !', 'Erreur de l\'envoi', 4000);
                    handleClose();
                }
            })
            .catch(error => {
                console.error(error);
                NotificationManager.error('Une erreur est survenue', 'Erreur', 4000);
                handleClose();
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Mot de passe oublié</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Votre e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Votre nouveau mot de passe sera envoyé par e-mail
                        </small>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={handlePasswordReset}>
                    Envoyer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Login;