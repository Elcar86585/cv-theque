import React from 'react';
import '../cv-template/cvtemplate.css';
import axios from 'axios';
import PostCv from '../cv-template/PostCv';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import GetSousCat from '../cv-template/GetSousCat';
import { Link } from 'react-router-dom';
import LoaderA from '../../components/LoaderA';

class CVTemplate extends React.Component {
    state = {
        cvId: null,
        newCvid: null,
        mod: false,
    };

    handleSubmit = async () => {
        this.setState({ mod: true });
        const { data } = this.props;
        const formData = this.createFormData(data);

        try {
            const response = await axios.post('cvs', formData);
            if (response.status === 201) {
                this.setState({ newCvid: response.data.id });
                await this.submitRelatedData(response.data.id);
            } else {
                this.handleError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            this.handleError('Une erreur est survenue lors de la validation de votre CV.');
        }
    };

    createFormData = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        return formData;
    };

    submitRelatedData = async (cvId) => {
        const { experience, diplomes, langage, informatik, loisArr } = this.props.data;
        await Promise.all([
            this.submitData('experiences', experience, cvId, this.createExperienceData),
            this.submitData('loisirs', loisArr, cvId, this.createLoisirData),
            this.submitData('langages', langage, cvId, this.createLanguageData),
            this.submitData('informatiques', informatik, cvId, this.createInformatiqueData),
            this.submitData('diplomes', diplomes, cvId, this.createDiplomeData),
        ]);

        setTimeout(() => {
            this.setState({ mod: false });
            window.location.replace('/cvtheque/table');
        }, 2000);
    };

    submitData = async (endpoint, items, cvId, createData) => {
        if (!items) return;

        await Promise.all(
            items.map(async (item) => {
                const formData = createData(item, cvId);
                try {
                    const response = await axios.post(endpoint, formData);
                    this.handleSubmissionResponse(response, endpoint);
                } catch (error) {
                    console.error(error);
                    NotificationManager.warning(`Une erreur est survenue lors de la validation de ${endpoint}.`, 'Erreur', 2000);
                }
            })
        );
    };

    createExperienceData = (experience, cvId) => {
        const formData = new FormData();
        formData.append('societe', experience.societeState);
        formData.append('datexp', experience.dateState);
        formData.append('datefin', experience.dateFinExp);
        formData.append('descriptionexp', experience.descriptionState);
        formData.append('cv_id', cvId);
        return formData;
    };

    createLoisirData = (loisir, cvId) => {
        const formData = new FormData();
        formData.append('loisir', loisir.loisirState);
        formData.append('cv_id', cvId);
        return formData;
    };

    createLanguageData = (langue, cvId) => {
        const formData = new FormData();
        formData.append('langue', langue.langueState);
        formData.append('progresslangue', langue.progresLangueState);
        formData.append('cv_id', cvId);
        return formData;
    };

    createInformatiqueData = (info, cvId) => {
        const formData = new FormData();
        formData.append('logiciel', info.appState);
        formData.append('progressinfo', info.progresState);
        formData.append('cv_id', cvId);
        return formData;
    };

    createDiplomeData = (diplome, cvId) => {
        const formData = new FormData();
        formData.append('ecole', diplome.ecoleState);
        formData.append('datecole', diplome.dateDipState);
        formData.append('descriptionecole', diplome.descriptionDipState);
        formData.append('datefinecole', diplome.dateFinDilpoState);
        formData.append('cv_id', cvId);
        return formData;
    };

    handleSubmissionResponse = (response, endpoint) => {
        if (response.status === 201) {
            NotificationManager.success(`${endpoint} validé`, endpoint, 2000);
        } else {
            NotificationManager.warning(`Une erreur est survenue lors de la validation de ${endpoint}.`, 'Erreur', 2000);
        }
    };

    handleError = (message) => {
        NotificationManager.warning(`Erreur: ${message}`, 'Erreur', 2000);
        this.setState({ mod: false });
    };

    render() {
        const { data } = this.props;
        const { newCvid } = this.state;

        const age = data.age ? moment().diff(moment(data.age, 'YYYY-MM-DD'), 'years') : 'N/A';
        const mailto = `mailto:${data.email}`;
        const imageSrc = data.photo ? URL.createObjectURL(data.photo) : "https://avatar.iran.liara.run/public";

        return (
            <div id="cvtel">
                <article className="resume-wrapper text-center position-relative" id='downCV'>
                    <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
                        <header className="resume-header pt-4 pt-md-0">
                            <div className="media flex-column flex-md-row">
                                <img src={imageSrc} alt="avatar" width="220" height="220" className='p-3' />
                                <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                                    <div className="primary-info">
                                        <h1 className="name mt-0 mb-1 text-white text-uppercase">{`${data.nomPrenom} ${data.prenom}`}</h1>
                                        <div className="title mb-3">
                                            {data.sousCat ? <GetSousCat scId={data.sousCat} /> : <PostCv id={data.category} />}
                                        </div>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><a href={mailto}><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{data.email}</a></li>
                                            <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{data.telephone}</li>
                                            <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{age} ans</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="resume-body p-5">
                            <section className="resume-section summary-section mb-5">
                                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Profile</h2>
                                <div className="resume-section-content">
                                    <p className="mb-0">
                                        <span className="oi oi-map-marker">Adresse :</span> {data.adresse}<br /><hr />
                                        {data.profileDescription}
                                    </p>
                                </div>
                            </section>

                            <div className="row">
                                <div className="col-lg-9">
                                    <section className="resume-section experience-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Experiences</h2>
                                        <div className="resume-section-content">
                                            <div className="resume-timeline position-relative">
                                                {data.experience.map(exp => (
                                                    <article key={exp.societeState} className="resume-timeline-item position-relative pb-5">
                                                        <div className="resume-timeline-item-header mb-2">
                                                            <div className="d-flex flex-column flex-md-row">
                                                                <h3 className="resume-position-title font-weight-bold mb-1">{exp.societeState}</h3>
                                                            </div>
                                                            <div className="resume-position-time">{`${exp.dateState} - ${exp.dateFinExp}`}</div>
                                                        </div>
                                                        <div className="resume-timeline-item-desc">
                                                            <p>{exp.descriptionState}</p>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="col-lg-3">
                                    <section className="resume-section skills-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Langues</h2>
                                        <div className="resume-section-content">
                                            <ul className="list-unstyled mb-4">
                                                {data.langage.map(langue => (
                                                    <li key={langue.langueState} className="mb-2">
                                                        <div className="resume-skill-name">{langue.langueState}</div>
                                                        <div className="progress resume-progress">
                                                            <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{ width: `${langue.progresLangueState}%` }} aria-valuenow={langue.progresLangueState} aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>

                                    <section className="resume-section interests-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Informatique</h2>
                                        <div className="resume-section-content">
                                            <ul className="list-unstyled">
                                                {data.informatk.map(info => (
                                                    <li key={info.appState} className="mb-2">
                                                        <div className="resume-skill-name">{info.appState}</div>
                                                        <div className="progress resume-progress">
                                                            <div className="progress-bar theme-progress-bar-dark" role="progressbar" style={{ width: `${info.progresState}%` }} aria-valuenow={info.progresState} aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <div className="resume-wrapper-inner mx-auto text-left">
                    <button onClick={this.handleSubmit} className="btn btn-primary btn-lg" type="button">Publier le CV dans la CVthèque</button>
                    {newCvid && localStorage.url === 'Administrateur' && (
                        <Link to={`/editCv/${newCvid}`} className="btn btn-secondary btn-lg me-md-2">Modifier</Link>
                    )}
                </div>
            </div>
        );
    }
}

export default CVTemplate;
