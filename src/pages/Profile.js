import axios from 'axios';
import React from 'react';
import moment from 'moment/moment';
import { NotificationManager } from 'react-notifications'


class Profile extends React.Component {
    state = {
        user: '',
        password: false,
        type: 'password',
        pass: this.props.user.pass,
        mdp: '',
        usage: {}
    }

    componentDidMount = () => {
        this.getUser();
    }

    getUser = () => {
        if (localStorage.token) {
            axios.get(`users/${localStorage.curent_user}`).then(resp => {
                this.setState({usage: resp.data})
            })
        }
    }

    handlePasswordShow = () => {
        if (this.state.password === false) {
            this.setState({ password: true });
            this.setState({ type: 'text' })
        } else {
            this.setState({ password: false });
            this.setState({ type: 'password' });
        }
    }

    handleChangePassword = (id) => {
        const compare = this.state.pass === this.state.mdp
        if (compare === true) {
            const formData = new FormData;
            formData.append('pass', this.state.pass);
            formData.append('password', this.state.mdp)
            axios.put(`users/${id}`, formData).then(resp => {
                if (resp.status === 200) {
                    NotificationManager.success('Votre mot de passe a été changer avec succès', 'Modifier', 4000)
                }
            })
        } else {
            NotificationManager.warning('Les mots de passes ne sont pas identique', 'Erreur', 4000)
        }
    }

    handlePass = (e) => {
        this.setState({ pass: e.target.value })
    }

    handleMdp = (e) => {
        this.setState({ mdp: e.target.value })
    }
    render() {
        const show = this.state.password;
        const user = this.props.user;
        const date = moment(user.created_at).format('LL');
        const expireDate = moment(user.expire).format('LL');
        const deta = this.state.usage
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Éléments de l’interface utilisateur</a></li>
                                    <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">Profile</li>
                                </ol>
                            </nav>

                            <div className="pb-3">
                                <h1 _msttexthash="234351" _msthash="67">Profile</h1>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title" _msttexthash="183612" _msthash="68">A propos de vous</div>
                                        </div>
                                        <div className="card-body collapse show" id="card1">
                                            <p>Nom et prenom : <strong>{user.name}</strong> </p>
                                            <p>E-mail : <strong>{user.email}</strong> </p>
                                            <p>Pays : <strong>{user.pays}</strong> </p>
                                            <p>Société : <strong>{user.societe}</strong> </p>
                                            <p>Téléphone : <strong>{user.phone}</strong> </p>
                                            <p>Date d'expiration de compte : <strong>{expireDate}</strong> </p>
                                            <p>Membre depuis : <strong>{date}</strong> </p>
                                            <div class="alert alert-danger" role="alert"><br />
                                                <p>Date d'expiration du compte : <strong>{expireDate}</strong> </p>
                                            </div>
                                            {/* <hr /> */}
                                            {/* <div class="row space-between">
                                                <div class="col-4">
                                                    <div class="card service-card card-inverse">
                                                        <center>
                                                            <div class="card-block">
                                                                <i class="bi bi-star-fill" style={{ 'fontSize': '30px' }}></i>
                                                                <h4 class="card-title">
                                                                    {deta.favo}
                                                                </h4>
                                                            </div>
                                                        </center>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="card service-card card-inverse">
                                                        <center>
                                                            <div class="card-block">
                                                                <i class="bi bi-person-square" style={{ 'fontSize': '30px' }}></i>
                                                                <h4 class="card-title">
                                                                    5
                                                                </h4>
                                                            </div>
                                                        </center>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="card service-card card-inverse">
                                                        <center>
                                                            <div class="card-block">
                                                                <i class="bi bi-cloud-download-fill" style={{ 'fontSize': '30px' }}></i>
                                                                <h4 class="card-title">
                                                                    2
                                                                </h4>
                                                            </div>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title" _msttexthash="183612" _msthash="68">
                                                Réglage des notifications par e-mail
                                            </div>
                                        </div>
                                        <div className="card-body collapse show" id="card1">
                                            <table class="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Notification nouveau CV</td>
                                                        <td>
                                                            <select class="custom-select">
                                                                <option value="2">Activer</option>
                                                                <option value="3">Desactiver</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Notification de mise à jour</td>
                                                        <td>
                                                            <select class="custom-select">
                                                                <option value="2">Activer</option>
                                                                <option value="3">Desactiver</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Notification de validation </td>
                                                        <td>
                                                            <select class="custom-select">
                                                                <option value="2">Activer</option>
                                                                <option value="3">Desactiver</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button type="submit" class="btn btn-primary mb-2">Valider</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title" _msttexthash="183612" _msthash="68">
                                                Je ne trouve pas le profil ideal
                                            </div>
                                        </div>
                                        <div className="card-body collapse show" id="card1">
                                            <form>
                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Description de votre profil</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>
                                                <button type="submit" class="btn btn-primary mb-2">Envoyer</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-header-title" _msttexthash="58201" _msthash="77">Change mot de passe</div>
                                        </div>
                                        <div className="card-body">
                                            <form id="notificationDemo">
                                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Taper le nouveau mot de passe</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" onClick={this.handlePasswordShow}>
                                                        {show ? (<i class="bi bi-eye-fill"></i>) : (<i class="bi bi-eye-slash-fill"></i>)}
                                                    </span>
                                                    <input type={this.state.type}
                                                        class="form-control" defaultValue={user.pass} aria-describedby="basic-addon1"
                                                        onChange={this.handlePass}
                                                    />
                                                </div>
                                                <br />
                                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Retaper le nouveau mot de passe</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" onClick={this.handlePasswordShow}>
                                                        {show ? (<i class="bi bi-eye-fill"></i>) : (<i class="bi bi-eye-slash-fill"></i>)}
                                                    </span>
                                                    <input type={this.state.type}
                                                        class="form-control" placeholder='Retaper votre nouveau mot de passe' aria-describedby="basic-addon1"
                                                        onChange={this.handleMdp}
                                                    />
                                                </div>
                                                <br />
                                                <div className="form-group">
                                                    <button onClick={() => this.handleChangePassword(user.id)} className="btn btn-primary" _msttexthash="2631473" _msthash="97">Valider les modifications</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;