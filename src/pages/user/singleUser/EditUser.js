import axios from "axios";
import React, { useState } from "react";
import {NotificationManager} from 'react-notifications'

export default function EditUser({user}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [societe, setSociete] = useState('');
    const [mdp, setMdp] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const fromdata = new FormData;
        if(name){fromdata.append('name', name);}
        if(email){fromdata.append('email', email);}
        if(phone){fromdata.append('phone', phone);}
        if(societe){fromdata.append('societe', societe);}
        if(mdp){fromdata.append('pass', mdp)}
        

        axios.put(`users/${user.id}`, fromdata).then(resp => {
            if(resp.status === 200){
                NotificationManager.success('Utilisateur Modifier avec succée', 'Modification valider', 4000)
            }else {
                NotificationManager.warning('Une erreur est survenu lors de la validation', 'Erreur', 4000)
            }
        })
    }
    return (
        <div className="tab-pane" id="edit">
                <form>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Nom et prénom</label>
                        <div className="col-lg-9">
                            <input
                                className="form-control"
                               type="text" defaultValue={user.name} 
                               onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Adresse e-mail</label>
                        <div className="col-lg-9">
                            <input 
                                className="form-control" type="email" 
                                defaultValue={user.email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Numero telephone </label>
                        <div className="col-lg-9">
                            <input 
                                className="form-control" type="number" 
                                defaultValue={user.phone} 
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Société</label>
                        <div className="col-lg-9">
                            <input 
                                className="form-control" type="text" 
                                defaultValue={user.societe} 
                                onChange={(e) => setSociete(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Mot de passe</label>
                        <div className="col-lg-9">
                            <input 
                                className="form-control" type="text" 
                                defaultValue={user.pass} 
                                onChange={(e) => setMdp(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label"></label>
                        <button class="btn btn-primary" onClick={handleSubmit}>
                            Valider les modifications
                        </button>
                    </div>
                </form>
        </div>
    )
}