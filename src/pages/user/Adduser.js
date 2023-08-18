import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import {NotificationManager} from 'react-notifications';


class Adduser extends React.Component {
    state={
        message: '', 
        role: 'Utilisateur',
        pass: false,
        type: 'password',
        word: ''
    }

    handleChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    handlePasswordShow = () => {
        if(this.state.pass === false){
            this.setState({pass: true});
            this.setState({type: 'text'})
        }else{
            this.setState({pass: false});
            this.setState({type: 'password'});
        }
    }

    handlePass = (e) => {
        this.setState({
            word: e.target.value
        })
    }
    

    render () {
        var now = moment().hours();
        var month = moment().month();
        return (
            <>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '', 
                            phone: '',
                            societe: '',
                            role: '',
                            expire: '',
                            password: ''
                        }}

                        onSubmit={(value, {resetForm}) => {
                            const formdata = new FormData;
                            formdata.append('name', value.name)
                            formdata.append('email', value.email)
                            formdata.append('role', this.state.role)
                            formdata.append('expire', value.expire)
                            formdata.append('password', value.password)
                            formdata.append('pass', value.password)
                            formdata.append('phone', value.phone)
                            formdata.append('societe', value.societe)
                            formdata.append('adresse', value.adresse)
                            formdata.append('pays', value.pays)
                            axios.post('users', formdata).then(response => {
                                if(response.status === 201){
                                    NotificationManager.success(response.data.message, 'utilisateur', 4000);
                                    resetForm();
                                    this.props.get();
                                }else {
                                    NotificationManager.warning(response.data.message, 'Erreur', 4000);
                                }
                            })
                        }}
                    >
                        <Form >
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Nom etprénom</label>
                                <Field type="text" className="form-control" name="name" placeholder="Nom et prénom" _msthash="79" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">E-mail</label>
                                <Field type="email" className="form-control" name="email" placeholder="E-mail" _msthash="79" required/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Téléphone</label>
                                <Field type="text" className="form-control" name="phone" placeholder="Numéro téléphone" _msthash="79" required/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Société</label>
                                <Field type="text" className="form-control" name="societe" placeholder="Nom de la société" _msthash="79" required/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Pays</label>
                                <Field type="text" className="form-control" name="pays" placeholder="Pays" _msthash="79" required/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Adresse</label>
                                <Field type="text" className="form-control" name="adresse" placeholder="Adresse postal" _msthash="79" required/>
                            </div>
                            <div className="form-group">    
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Rôle</label>
                                <select name="role" onChange={this.handleChange} className="form-control" id="exampleFormControlSelect1">
                                    <option>Utilisateur</option>
                                    <option>Administrateur</option>
                                </select>
                            </div>
                            {this.state.role === 'Administrateur' ? (<></>
                            ):(<>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Date d'expiration</label>
                                    <Field type="date" className="form-control" name="expire" placeholder="JJ-MM-AAA" _msthash="79"/>
                                </div>
                            </>)}

                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Mot de passe</label>
                                <Field type={this.state.type} className="form-control" name="password" placeholder="Mot de passe" required />
                            </div>
                            <div className="form-check form-switch">
                                <input onClick={this.handlePasswordShow} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                <label className="form-check-label" for="flexSwitchCheckDefault">Voir le mot de passe</label>
                            </div>
                            <br/>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" _msttexthash="2631473" _msthash="97">Valider l'utilisateur</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </>
        )
    }
}

export default Adduser;