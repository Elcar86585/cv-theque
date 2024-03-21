import axios from "axios";
import React, { useState } from "react";
import { NotificationManager } from 'react-notifications'
import { useNavigate } from "react-router-dom";

export default function EditUser({ user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [societe, setSociete] = useState('');
    const [mdp, setMdp] = useState('');
    const [expire, setExpire] = useState('');
    const [pays, setPays] = useState('');
    const [post, setPost] = useState('');
    const [prenom, setPrenom] = useState('');
    const [site, setSite] = useState('');
    const [role, setRole] = useState('');
    const [adresse, setAdresse] = useState('');
    const navigation = useNavigate()
    const [priorisation, setPriorisation] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const fromdata = new FormData;
        if (name) { fromdata.append('name', name); }
        if (email) { fromdata.append('email', email) }
        if (phone) { fromdata.append('phone', phone) }
        if (societe) { fromdata.append('societe', societe) }
        if (mdp) { fromdata.append('pass', mdp) }
        if (expire) { fromdata.append('expire', expire) }
        if (pays) { fromdata.append('pays', pays) }
        if (prenom) { fromdata.append('prenom', prenom) }
        if (post) { fromdata.append('post', post) }
        if (role) { fromdata.append('role', role) }
        if (site) { fromdata.append('site', site) }
        if (adresse) { fromdata.append('adresse', adresse) }

        axios.put(`users/${user.id}`, fromdata).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Utilisateur Modifier avec succée', 'Modification valider', 4000)
                navigation('/user');
            } else {
                NotificationManager.warning('Une erreur est survenu lors de la validation', 'Erreur', 4000)
            }
        })
    }
    return (
        <div className="tab-pane" id="edit">
            <form>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Nom et prénom</label>
                    <div className="col-lg-5">
                        <input
                            className="form-control"
                            type="text" defaultValue={user.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-4">
                        <input
                            className="form-control"
                            type="text" defaultValue={user.prenom}
                            onChange={(e) => setPrenom(e.target.value)}
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
                    <label className="col-lg-3 col-form-label form-control-label">Post</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="text"
                            defaultValue={user.post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Site Web</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="text"
                            defaultValue={user.site}
                            onChange={(e) => setSite(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Adresse</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="text"
                            defaultValue={user.adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Rôle</label>
                    <div className="col-lg-9">
                        <select onChange={(e) => setRole(e.target.value)} className="form-control" type="select">
                            <option defaultValue={user.role}>{user.role}</option>
                            {user.role === 'Utilisateur' ? (<option>Administrateur</option>) : (
                                <option>Utilisateur</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Numero telephone </label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="text"
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
                    <label className="col-lg-3 col-form-label form-control-label">Pays</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="text"
                            defaultValue={user.pays}
                            onChange={(e) => setPays(e.target.value)}
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
                    <label className="col-lg-3 col-form-label form-control-label">Date d'expiration</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control" type="date"
                            defaultValue={user.expire}
                            onChange={(e) => setExpire(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label"></label>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Valider les modifications
                    </button>
                </div>
            </form>
        </div>
    )
}