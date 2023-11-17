import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Button, Modal } from 'react-bootstrap';

class Login extends React.Component {
    state = {
        message: '',
        color: '',
        mod: false
    }

    handleShow = () => {
        this.setState({ mod: true })
    }

    handleClose = () => {
        this.setState({ mod: false })
    }

    render() {
        return (
            <div className='adminx-container d-flex justify-content-center align-items-center' >
                <div className='page-login' >
                    {this.state.message ? (
                        <>
                            <div class={this.state.color} role="alert">
                                <center>{this.state.message}</center>
                            </div>
                        </>
                    ) : (<></>)}
                    <div className="card mb-0">
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}

                                onSubmit={(value, { resetForm }) => {
                                    const formdata = new FormData;
                                    formdata.append('email', value.email)
                                    formdata.append('password', value.password)

                                    axios.post('connection', formdata).then(response => {
                                        if (response.status === 200) {
                                            const user_id = response.data.user.id;
                                            localStorage.setItem('token', response.data.token)
                                            localStorage.setItem('curent_user', user_id)
                                            localStorage.setItem('url', response.data.user.role)
                                            localStorage.setItem('user_token', response.data.user.authentication_token)
                                            localStorage.setItem('token', response.data.user.authentication_token)
                                            resetForm();
                                            NotificationManager.success(response.data.message, 'utilisateur', 4000);
                                            window.location.reload();
                                            window.location.replace('/cvtheque');
                                        } else {
                                            NotificationManager.warning(response.data.message, 'Erreur', 4000);
                                        }
                                    }).catch(error => console.log(error))
                                }}
                            >
                                <Form>
                                    <div className="form-group">
                                        <label for="exampleDropdownFormEmail1" className="form-label">E-mail</label>
                                        <Field type="email" name="email" required className="form-control" placeholder="email@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleDropdownFormPassword1" className="form-label">Mot de pass</label>
                                        <Field type="password" name="password" required className="form-control" placeholder="Votre mot de passe" />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Se rappeler de moi</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-block btn-primary">Se connecter</button>
                                </Form>
                            </Formik>
                        </div>
                        <div className="card-footer text-center">
                            <a href="#" onClick={this.handleShow}><small>Mot de passe oublier ?</small></a>
                        </div>
                    </div>
                </div>
                <ModalShow data={this.state.mod} close={this.handleClose} />
            </div>
        )
    }
}

function ModalShow({ data, close }) {
    const [email, setEmail] = useState('');
    const formData = new FormData;
    formData.append('email', email)
    const hangleMdp = () => {
        axios.post('/mdpo', formData).then(resp => {
            if(resp.status === 200){
                NotificationManager.success('L\'email de recuperation de mot de passe à été envoyer', 'Evoie avec succès', 4000)
                close();
            }else{
                NotificationManager.warning('L\'email n\'existe pas !', 'Errer de l\'envoi', 4000)
                close();
            }
        })
    }
    return (
        <>
            <Modal show={data} onHide={close}>
                <Modal.Header >
                    <Modal.Title>Mot de passe oublier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Adresse e-mail</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" placeholder="Votre e-mail"/>
                                <small id="emailHelp" className="form-text text-muted">Votre nouveau mot de passe sera envoyer par e-mail</small>
                        </div>        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={hangleMdp} >
                        Envoyer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login;