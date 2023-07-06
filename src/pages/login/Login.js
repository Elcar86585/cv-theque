import React from 'react';
import { Form, Formik, Field } from 'formik';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
 
class Login extends React.Component {
    state={
        message: '',
        color: ''
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
                ):(<></>)}
                <div className="card mb-0">
                    <div className="card-body">
                        <Formik 
                            initialValues={{
                                email: '',
                                password: ''
                            }}

                            onSubmit={(value, {resetForm}) => {
                                const formdata = new FormData;
                                formdata.append('email', value.email)
                                formdata.append('password', value.password)
    
                                axios.post('connection', formdata).then(response => {
                                    if(response.status === 202){
                                        localStorage.setItem('token', response.data.token)
                                        localStorage.setItem('curent_user', response.data.user.id)
                                        localStorage.setItem('url', response.data.user.role)
                                        localStorage.setItem('user_token', response.data.user.authentication_token)
                                        localStorage.setItem('token', response.data.user.authentication_token)
                                        resetForm();
                                        NotificationManager.success(response.data.message, 'utilisateur', 4000);
                                        window.location.reload();
                                        window.location.replace('/');
                                    }else {
                                        NotificationManager.warning(response.data.message, 'Erreur', 4000);
                                    }
                                })
                            }}
                        >
                            <Form>
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail1" className="form-label">E-mail</label>
                                    <Field type="email" name="email"  className="form-control" placeholder="email@example.com"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleDropdownFormPassword1" className="form-label">Mot de pass</label>
                                    <Field type="password" name="password"  className="form-control" placeholder="Votre mot de passe"/>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                    <input  type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" for="customCheck1">Se rappeler de moi</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-sm btn-block btn-primary">Se connecter</button>
                            </Form>
                        </Formik>
                    </div>
                    <div className="card-footer text-center">
                        <a href="#"><small>Mot de passe oublier ?</small></a>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;