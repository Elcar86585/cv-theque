import React from 'react';
import './cvtemplate.css';
import axios from 'axios';
import PostCv from './PostCv';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import GetSousCat from './GetSousCat';

class CV_template extends React.Component {
    state = {
        cvId: null
    }


    handleSubmit = () => {
        const data = this.props.data
        const formdata = new FormData;
        formdata.append('nomPrenom', data.nomPrenom);
        formdata.append('email', data.email);
        formdata.append('telephone', data.telephone)
        formdata.append('age', data.age);
        formdata.append('adresse', data.adresse);
        if (data.sousCat) {
            formdata.append('sous_category_id', data.sousCat)
        } else {
            formdata.append('categorie_cv_id', data.categorieId);
        }
        formdata.append('descriptionProfile', data.profileDescription);
        formdata.append('disponibility', data.dispo);
        formdata.append('facebook', data.facebook);
        formdata.append('linkedin', data.linkedin);
        formdata.append('aExperience', data.aExp);
        formdata.append('nationalite', data.nation);
        formdata.append('photo', data.photo);
        formdata.append('contrat', data.contrat)

        axios.post('cvs', formdata).then(response => {
            if (response.status === 201) {
                const exp = this.props.data.experience;
                const diplo = this.props.data.diplome;
                const lang = this.props.data.langage;
                const informa = this.props.data.informatk;
                const lois = this.props.data.loisArr;

                exp && exp.map(expe => {
                    const formExp = new FormData;
                    formExp.append('societe', expe.societeState);
                    formExp.append('datexp', expe.dateState);
                    formExp.append('descriptionexp', expe.descriptionState);
                    formExp.append('cv_id', response.data.id);

                    axios.post('experiences', formExp).then(resp => {
                        if (resp.status === 201) {
                            NotificationManager.success('Experience valider', 'Experience', 2000)
                        } else {
                            NotificationManager.warning('Une erreur est survenue lors de la validation de votre experience', 'Erreur', 2000)
                        }
                    }).catch(error => console.log(error))
                })

                lois && lois.map(loisir => {
                    const formLoisir = new FormData;
                    formLoisir.append('loisir', loisir.loisirState);
                    formLoisir.append('cv_id', response.data.id);

                    axios.post('loisirs', formLoisir).then(resp => {
                        if (resp.status === 201) {
                            NotificationManager.success('Loisir valider', 'Loisir', 2000)
                        } else {
                            NotificationManager.warning('Une erreur est survenue lors de la validation de votre Loisir', 'Erreur', 2000)
                        }
                    }).catch(error => console.log(error))
                })

                lang && lang.map(langag => {
                    const formLang = new FormData;
                    formLang.append('langue', langag.langueState);
                    formLang.append('progresslangue', langag.progresLangueState);
                    formLang.append('cv_id', response.data.id);

                    axios.post('langages', formLang).then(resp => {
                        if (resp.status === 201) {
                            NotificationManager.success('Langages valider', 'Langages', 2000)
                        } else {
                            NotificationManager.warning('Une erreur est survenue lors de la validation de vos langages', 'Erreur', 2000)
                        }
                    }).catch(error => console.log(error))
                })

                informa && informa.map(infor => {
                    const forminformatique = new FormData;
                    forminformatique.append('logiciel', infor.appState);
                    forminformatique.append('progressinfo', infor.progresState);
                    forminformatique.append('cv_id', response.data.id);

                    axios.post('informatiques', forminformatique).then(resp => {
                        if (resp.status === 201) {
                            NotificationManager.success('Connaissance en informatique valider', 'Connaissance en informatique', 2000)
                        } else {
                            NotificationManager.warning('Une erreur est survenue lors de la validation de vos connaissance en informatique', 'Erreur', 2000)
                        }
                    }).catch(error => console.log(error))
                })

                diplo && diplo.map(diplome => {
                    const formDiplom = new FormData;
                    formDiplom.append('ecole', diplome.ecoleState);
                    formDiplom.append('datecole', diplome.dateDipState);
                    formDiplom.append('descriptionecole', diplome.descriptionDipState);
                    formDiplom.append('cv_id', response.data.id);

                    axios.post('diplomes', formDiplom).then(resp => {
                        if (resp.status === 201) {
                            NotificationManager.success('Diplomes et formations valider', 'Diplomes et formations', 2000)
                        } else {
                            NotificationManager.warning('Une erreur est survenue losr de la validation de vos Diplomes et formations', 'Erreur', 2000)
                        }
                    }).catch(error => console.log(error))
                })

            } else {
                NotificationManager.warning('Une erreur est survenue lors de la valdation de votre CV', 'Erreur', 4000)
            }
        }).catch(error => console.log(error))
    }



    render() {
        const experiences = this.props.data.experience
        const langages = this.props.data.langage
        const loisirs = this.props.data.loisArr
        const informatique = this.props.data.informatk
        const diplomes = this.props.data.diplome
        const photo = this.props.data.photo
        const mailto = 'mailto:' + this.props.data.email;
        const age = this.props.data.age
        let image;
        if (this.props.data.photo !== null) {
            image = (
                <img src={URL.createObjectURL(photo)} alt="image" border="0" width="220" height="220" />
            )
        } else {
            image = (
                <img src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" alt="image" border="0" width="220" height="220" />
            )
        }

        let date_moment = moment().format('YYYY-MM-DD')
        const old = this.props.data.age
        let yearNow = moment(date_moment).year();
        let yearProfil = moment(old).year();
        const ageProfil = yearNow - yearProfil
        return (
            <>
                <div id="cvtel">
                    <article className="resume-wrapper text-center position-relative" id='downCV'>
                        <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg" >
                            <header className="resume-header pt-4 pt-md-0">
                                <div className="media flex-column flex-md-row">
                                    {image}
                                    <img className="mr-3 img-fluid picture mx-auto" src="assets/images/фотощька.jpg" alt="" />
                                    <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                                        <div className="primary-info">
                                            <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">{this.props.data.nomPrenom} </h1>
                                            {this.props.data.sousCat ? (
                                                <>
                                                    <div className="title mb-3"><GetSousCat scId={this.props.data.sousCat} /> </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="title mb-3"><PostCv id={this.props.data.category} /></div>
                                                </>
                                            )}
                                            <ul className="list-unstyled">
                                                <li className="mb-2"><a href={mailto}><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{this.props.data.email} </a></li>
                                                <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{this.props.data.telephone}</li>
                                                <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{ageProfil} ans</li>
                                            </ul>
                                        </div>
                                        <div className="secondary-info ml-md-auto mt-2">
                                            <ul className="resume-social list-unstyled">
                                                {/* <li className="mb-3"><strong>Age:</strong><i className="fab fa-telegram-plane fa-fw"></i>&nbsp; {age} ans </li> */}
                                                <li className="mb-3"><a href="#"><span className="fa-container text-center mr-2"><i class="bi bi-geo-alt"></i></span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="resume-body p-5">
                                <section className="resume-section summary-section mb-5">
                                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">profile / <span class="badge badge-pill badge-primary"> {this.props.data.dispo} </span></h2>

                                    <div className="resume-section-content">
                                        <p className="mb-0">
                                            <span class="oi oi-map-marker">Adresse :</span>&nbsp;{this.props.data.adresse}<br /><hr />
                                            {this.props.data.profileDescription}
                                        </p>
                                    </div>
                                </section>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <section className="resume-section experience-section mb-5">
                                            <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Experiences</h2>
                                            <div className="resume-section-content">
                                                <div className="resume-timeline position-relative">
                                                    {experiences && experiences.map(exp => {
                                                        return (
                                                            <>
                                                                <article className="resume-timeline-item position-relative pb-5">
                                                                    <div className="resume-timeline-item-header mb-2">
                                                                        <div className="d-flex flex-column flex-md-row">
                                                                            <h3 className="resume-position-title font-weight-bold mb-1">{exp.societeState} </h3>
                                                                            {/* <div className="resume-company-name ml-auto">
                                                                        2 ans</div> */}
                                                                        </div>
                                                                        <div className="resume-position-time">{exp.dateState} </div>
                                                                    </div>
                                                                    <div className="resume-timeline-item-desc">
                                                                        <p>
                                                                            {exp.descriptionState}
                                                                        </p>
                                                                    </div>
                                                                </article>
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                                <br />
                                                <section className="resume-section education-section mb-5">
                                                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Etudes et diplôme</h2>
                                                    <div className="resume-section-content">
                                                        <div className="resume-timeline position-relative">
                                                            <ul className="list-unstyled">
                                                                {diplomes && diplomes.map(diplome => {
                                                                    return (
                                                                        <>
                                                                            <article className="resume-timeline-item position-relative pb-5">
                                                                                <div className="resume-timeline-item-header mb-2">
                                                                                    <div className="d-flex flex-column flex-md-row">
                                                                                        <h3 className="resume-position-title font-weight-bold mb-1">{diplome.ecoleState} </h3>
                                                                                        {/* <div className="resume-company-name ml-auto">
                                                                                2 ans</div> */}
                                                                                    </div>
                                                                                    <div className="resume-position-time">{diplome.dateDipState} </div>
                                                                                </div>
                                                                                <div className="resume-timeline-item-desc">
                                                                                    <p>
                                                                                        {diplome.descriptionDipState}
                                                                                    </p>
                                                                                </div>
                                                                            </article>
                                                                        </>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-lg-3">
                                        <section className="resume-section skills-section mb-5">
                                            <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Langue</h2>
                                            <div className="resume-section-content">
                                                <div className="resume-skill-item">
                                                    <ul className="list-unstyled mb-4">
                                                        {langages && langages.map(langue => {
                                                            const progress = langue.progresLangueState + "%"
                                                            return (
                                                                <>
                                                                    <li className="mb-2">
                                                                        <div className="resume-skill-name"> {langue.langueState} </div>
                                                                        <div className="progress resume-progress">
                                                                            <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{ "width": progress }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                            {/* <ProgressBar completed={langue.progresLangueState} /> */}
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>

                                                <div className="resume-skill-item">
                                                    <h4 className="resume-skills-cat font-weight-bold">Loisirs</h4>
                                                    <ul className="list-inline">
                                                        {loisirs && loisirs.map(loisir => {
                                                            return (
                                                                <li className="list-inline-item"><span className="badge badge-light">{loisir.loisirState} </span></li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="resume-section interests-section mb-5">
                                            <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Informatique</h2>
                                            <div className="resume-section-content">
                                                <ul className="list-unstyled">
                                                    {informatique && informatique.map(info => {
                                                        const progress = info.progresState + "%"
                                                        return (
                                                            <>
                                                                <li className="mb-2">
                                                                    <div className="resume-skill-name"> {info.appState} </div>
                                                                    <div className="progress resume-progress">
                                                                        <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{ "width": progress }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        {/* <ProgressBar completed={langue.progresLangueState} /> */}
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            </div>


                        </div>
                        <br />
                        <div class="d-grid gap-2 d-md-flex justify-content">
                            &nbsp;
                            {/* <button onClick={this.handletelecharge} class="btn btn-secondary btn-lg me-md-2" type="button">Télécharger le CV</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                            <button onClick={this.handleSubmit} class="btn btn-primary btn-lg" type="button">Publier le cv dans la CVthèque</button>
                        </div>
                    </article>

                </div>
            </>
        )
    }
}

export default CV_template;