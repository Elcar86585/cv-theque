import React from "react";
import { Form, Formik, Field } from 'formik';
import axios from "axios";
import { NotificationManager } from 'react-notifications'
import santatra from '../../images/santatra.jpg'
import emailjs from '@emailjs/browser';

class DemandeLogin extends React.Component {
    state = {
        name: '',
        email: '',
        objet: '',
        description: '',
        type: 'submit',
        phone: '',
        ip: {},
        adresse: '',
        post: '',
        priorisation: '',
        site: '',
        prenom: '',
        field: '',
        pays: ''
    }

    componentDidMount = () => {
        axios.get('https://ipapi.co/json').then(resp => {
            this.setState({ ip: resp.data })
        }).catch(error => console.log(error))
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleObjet = (e) => {
        this.setState({
            objet: e.target.value
        })
    }

    handleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handlePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    render() {
        const trace = this.state.ip
        console.log(this.state.pays)

        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Éléments de l’interface utilisateur</a></li>
                                    <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">Formulaire de demande de login</li>
                                </ol>
                            </nav>

                            <div className="pb-3">
                                <h1 _msttexthash="234351" _msthash="67">Formulaire</h1>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title" _msttexthash="183612" _msthash="68">Pourquoi demander un login</div>
                                        </div>
                                        <div className="card-body collapse show" id="card1">
                                            Vous cherchez à recruter des talents qualifiés pour votre entreprise ? <br />
                                            Ne cherchez plus loin que notre CVthèque. Inscrivez-vous dès maintenant pour découvrir une
                                            myriade de profils de candidats qualifiés, spécialisés dans votre secteur d'activité.
                                            Que vous cherchiez des employés à temps plein, à temps partiel ou des stagiaires,
                                            vous êtes sûr de trouver des candidats passionnés et qualifiés pour l'emploi.
                                            Inscrivez-vous dès maintenant pour accéder à notre base de données de CV et découvrir
                                            les talents qui peuvent faire la différence pour votre entreprise !
                                            <hr />
                                            <div class="card mb-3">
                                                <img src={santatra} alt="santatra activ solution" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-header-title" _msttexthash="58201" _msthash="77">Votre demande</div>
                                        </div>
                                        <div className="card-body">
                                            <Formik
                                                initialValues={{
                                                    name: '',
                                                    email: '',
                                                    objet: '',
                                                    phone: '',
                                                    societe: '',
                                                    description: '',
                                                    post: '',
                                                    priorisation: '',
                                                    site: '',
                                                    prenom: ''
                                                }}
                                                onSubmit={(value, { resetForm }) => {
                                                    const formData = new FormData;
                                                    formData.append('name', this.state.name);
                                                    formData.append('email', this.state.email);
                                                    formData.append('object', this.state.objet);
                                                    formData.append('numero', this.state.phone);
                                                    formData.append('pays', this.state.pays);
                                                    formData.append('adresse', this.state.adresse);
                                                    formData.append('description', this.state.description);
                                                    formData.append('prenom', this.state.prenom);
                                                    formData.append('site', this.state.site);
                                                    formData.append('priorisation', this.state.priorisation);
                                                    formData.append('post', this.state.post);
                                                    axios.post('demand_logins', formData).then(resp => {
                                                        if (resp.status === 201) {
                                                            NotificationManager.success('Votre demande est bien envoyer', 'Envoyer', 4000);
                                                            this.setState({ type: 'reset' })
                                                            resetForm();
                                                            window.location.replace('/cvtheque');
                                                        } else {
                                                            NotificationManager.warning('Une erreur est survenue lors de l\'envoye de votre demande', 'Erreur', 4000);
                                                        }
                                                    }).catch(error => console.log(error))

                                                    const templateParams = {
                                                        email: this.state.email,
                                                    };

                                                    emailjs.send('service_x3zbaha', 'template_g917mgp', templateParams, 'MfXlP5doj950_gfSF')
                                                        .then(() => {
                                                            console.log('Email envoyé avec succès');
                                                        }, (error) => {
                                                            console.log('Erreur lors de l\'envoi de l\'email', error.text);
                                                        });
                                                }}
                                            >
                                                <Form>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Nom </label>
                                                        <input name="name" onChange={this.handleName} placeholder="Votre nom" type="text" class="form-control" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Prénom</label>
                                                        <input name="name" onChange={(e) => this.setState({ prenom: e.target.value })} placeholder="Votre prénom" type="text"
                                                            class="form-control" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Poste</label>
                                                        <input name="name" onChange={(e) => this.setState({ post: e.target.value })} placeholder="Votre poste" type="text" class="form-control" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Adresse E-mail</label>
                                                        <input name="email" onChange={this.handleEmail} placeholder="Votre adresse e-mail" type="email" class="form-control" required aria-describedby="emailHelp" />
                                                        <div class="form-text">Votre adresse e-mail ne sera pas publier.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Site internet</label>
                                                        <input name="site" onChange={(e) => this.setState({ site: e.target.value })} placeholder="Votre site internet"
                                                            type="text" class="form-control" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Ordre de priorité</label>
                                                        <select name="priorisation" onChange={(e) => this.setState({ priorisation: e.target.value })} type="select"
                                                            class="form-control" required aria-describedby="emailHelp" >
                                                            <option >-------</option>
                                                            <option >Immédiat</option>
                                                            <option >Urgent</option>
                                                            <option >Indéterminé</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Numéro téléphone</label>
                                                        <input name="phone" onChange={this.handlePhone} defaultValue={trace.country_calling_code} type="text" 
                                                        class="form-control" required maxLength={15} aria-describedby="emailHelp" />
                                                        <div class="form-text">Votre numéro de téléphone ne sera pas publier.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Pays </label>
                                                        <input name="pays" defaultValue={trace.country_name} 
                                                        onChange={(e) => this.setState({pays: e.target.value})}
                                                        type="text" class="form-control" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Adresse </label>
                                                        <input name="adresse" onChange={(e) => this.setState({ adresse: e.target.value })} type="text" 
                                                        class="form-control" placeholder="Votre adresse exacte" required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputPassword1" class="form-label">Nom de l'entreprise</label>
                                                        <input name="societe" onChange={this.handleObjet} type="text" placeholder="Le nom de votre entreprise" 
                                                        class="form-control" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputPassword1" class="form-label">Description de votre demande</label>
                                                        <textarea onChange={this.handleDescription} name="description" required class="form-control" rows={4} 
                                                        placeholder="Votre description">
                                                        </textarea>
                                                    </div>
                                                    <br />
                                                    <div class="mb-3 form-check">
                                                        <Field type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        <label class="form-check-label" for="exampleCheck1">Inscrire à la newsletter</label>
                                                    </div>
                                                    <button type={this.state.type} class="btn btn-primary">Envoyer la demande</button>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DemandeLogin