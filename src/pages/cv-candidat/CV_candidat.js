import React, { useEffect, useRef, useState } from 'react';
import './cvCandidat.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CandidatExper from './Candidatexper';
import CandidatEtude from './CandidatEtude';
import CandidatLangage from './CandidatLangage';
import CandidatLoisir from './CandidatLoisir';
import CandidatInfo from './CandidatInfo';
import CandidatCategorie from './CandidatCategorie';
import Commentaire from './Commentaire';
import { NotificationManager } from 'react-notifications';
import CommentList from './CommentList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Calendar, DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import moment from 'moment';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

export default function CV_candidat({ user, fun }) {
    const { id } = useParams();
    const [cv, setCv] = useState('');
    const [array, setArray] = useState('');
    const [comment, setComment] = useState(false);
    const [com, setCom] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dateValue, setDateValue] = useState([
        new DateObject().setDay(15),
        new DateObject().add(1, "month").setDay(15)
    ]);
    const [heurre, setHeurre] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`cvs/${id}`).then(resp => {
                if (resp.status === 200) {
                    setCv(resp.data.cv);
                    setArray(resp.data);
                    setCom(resp.data.comment)
                }
            }).catch(error => { console.log(error) })
        }
    }, [id]);

    const getComment = () => {
        axios.get(`cvs/${id}`).then(resp => {
            setCom(resp.data.comment)
        }).catch(error => console.log(error));
    }

    const handleClick = () => {
        if(comment === true){
            setComment(false)
        }else{
            setComment(true);
        }
    }

    const date = dateValue.map(d => `${d.day}/${d.month}/${d.year}`)
    const hours = `${heurre.hour}:${heurre.second}`

    const admin = user.role === 'Administrateur';
    let contact;
    let commentaire;
    let date_moment = moment().format('YYYY-MM-DD')
    let yearNow = moment(date_moment).year();
    let yearProfil = moment(cv.age).year();
    const ageCandidat = yearNow - yearProfil
    if (admin === true) {
        commentaire = (
            <>
                {comment ? (
                    <>
                        <Commentaire userId={user.id} hid={handleClick} cvId={cv.id} fon={getComment} />
                        <br />
                        <CommentList comment={com} />
                    </>
                ) : (
                    <>
                        <button onClick={handleClick} className="btn btn-primary active" data-bs-toggle="button" autocomplete="off" aria-pressed="true">Ajouter un commentaire</button>
                        <br />
                        <CommentList comment={com} fon={getComment} />
                    </>
                )}
            </>
        )
        contact = (
            <>
                <div className="primary-info">
                    <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">{cv.nomPrenom} {cv.prenom} </h1>
                    <div className="title mb-3">
                        <CandidatCategorie id={cv.categorie_cv_id} />
                    </div>
                    <ul className="list-unstyled">
                        <li className="mb-2"><a href={`mailto:${cv.email}`} target='_blanc'><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{cv.email} </a></li>
                        <li><a href={`tel:${cv.telephone}`} target='_blanc'><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.telephone} </a></li>
                        <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{ageCandidat} ans / {cv.aExperience} d'experience(s)</li>
                        <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.national} à {cv.nationalite} </li>
                    </ul>
                </div>
                <div className="secondary-info ml-md-auto mt-2">
                    <ul className="resume-social list-unstyled">
                        <li className="mb-3"><a href='#' ><strong>ID : 00{cv.id}</strong> </a></li>
                    </ul>
                </div>
            </>
        )
    } else {
        contact = (
            <>
                <div className="primary-info">
                    <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">ID : 00{cv.id} </h1>
                    <div className="title mb-3">
                        <CandidatCategorie id={cv.categorie_cv_id} />
                    </div>
                    <ul className="list-unstyled">
                        <li className="mb-2"><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{cv.disponibility} </li>
                        <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.aExperience} d'experience(s) </li>
                        <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.national} </li>
                    </ul>
                </div>
            </>
        )
    }

    let photo;
    if (cv && cv.photo.url) {
        photo = (
            <>
                <img src={`http://cvtheque.activsolution.fr:33066/${cv.photo.url}`} alt="image" border="0" width="220" height="220" />
            </>
        )
    } else {
        photo = (
            <>
                <img src="https://images.freeimages.com/365/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg" alt="image" border="0" width="220" height="220" />
            </>
        )
    }

    const printCv = () => {
        var printSection = document.getElementById('ifmcontentstoprint');
        var printHTML = printSection.innerHTML;
        var originalHTML = document.body.innerHTML;
        document.body.innerHTML = printHTML;
        window.print();
        document.body.innerHTML = originalHTML;
    }

    const handleFavorite = () => {
        const formData = new FormData;
        formData.append('cv_id', cv.id);
        formData.append('user_id', user.id)
        axios.post('favorites', formData).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Ajouter avec succée dans votre favoris', 'Valider', 4000)
            } else {
                NotificationManager.info('Le CV est déja dans votre favoris', 'Info', 4000)
            }
        }).catch(error => console.log(error))
    }

    const handleDemandeEntretien = () => {
        const formdata = new FormData;
        formdata.append('cv_id', cv.id);
        formdata.append('user_id', user.id);
        formdata.append('drdv', date);
        formdata.append('hrdv', hours);
        axios.post('entretiens', formdata).then(resp => {
            if (resp.status === 201) {
                NotificationManager.success('Votre demande d\'entretien est valider', 'Valider', 4000)
                handleClose();
            } else {
                NotificationManager.warning('Une erreur est survenue lors de l\'envoie de votre demande', 'Erreur', 4000)
            }
        }).catch(error => console.log(error));
    }
    
    const targetRef = useRef();
    return (
        <div className="adminx-content">
            <div className="adminx-main-content">
                <article className="resume-wrapper text-div position-relative">
                    <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg" id="ifmcontentstoprint" ref={targetRef}>
                        <header className="resume-header pt-4 pt-md-0">
                            <div className="media flex-column flex-md-row">
                                {photo}
                                <img className="mr-3 img-fluid picture mx-auto" src="assets/images/фотощька.jpg" alt="" />
                                <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                                    {contact}
                                </div>
                            </div>
                        </header>
                        <div className="resume-body p-5">
                            <section className="resume-section summary-section mb-5">
                                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">profile / &nbsp;
                                    <span class="badge bg-secondary" style={{color: "white"}}>{cv.disponibility} </span>&nbsp;
                                    <span class="badge bg-dark" style={{color: "white"}}>{cv.contrat} </span>
                                </h2>
                                <div className="resume-section-content">
                                    <p className="mb-0">{cv.descriptionProfile} </p>
                                </div>
                            </section>
                            <div className="row">
                                <div className="col-lg-9">
                                    <section className="resume-section experience-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Experiences</h2>
                                        <div className="resume-section-content">
                                            <div className="resume-timeline position-relative">
                                                <CandidatExper exp={array.exp} />
                                            </div>
                                            <br />
                                            <CandidatEtude diplo={array.diplo} />
                                        </div>
                                    </section>
                                </div>
                                <div className="col-lg-3">
                                    <section className="resume-section skills-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Langues</h2>
                                        <div className="resume-section-content">
                                            <div className="resume-skill-item">
                                                <CandidatLangage lang={array.langage} />
                                            </div>
                                            <hr/>
                                            <div className="resume-skill-item">
                                                <h4 className="resume-skills-cat font-weight-bold">Loisirs</h4>
                                                <CandidatLoisir loi={array.loisir} />
                                            </div>
                                            {admin === true ? (
                                                <><hr/>
                                                    <div className="resume-skill-item">
                                                        <h4 className="resume-skills-cat font-weight-bold">Pretention salarial</h4>
                                                            <b>{cv.pretention}</b>
                                                    </div>
                                                    <hr/>
                                                    <div className="resume-skill-item">
                                                        <h4 className="resume-skills-cat font-weight-bold">Adresse</h4>
                                                            {cv.adresse}
                                                    </div>
                                                    <hr/>
                                                </>
                                            ):(<></>)}
                                        </div>
                                    </section>
                                    <section className="resume-section interests-section mb-5">
                                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Informatique</h2>
                                        <div className="resume-section-content">
                                            <CandidatInfo infor={array.info} />
                                        </div>
                                    </section>
                                </div>
                            </div>
                            {commentaire}
                        </div>
                    </div>
                </article>
                <center>
                    <div className="">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin === true ? (
                            <>
                                {cv.resume && cv.resume.url ? (
                                    <>
                                        <Link to={`http://cvtheque.activsolution.fr:33066/${cv.resume && cv.resume.url}`}
                                            className="btn btn-success btn-lg"
                                            target='_blanc'
                                        >
                                            <i className="bi bi-eye"></i>&nbsp;
                                            Voir le CV de l'ID : {cv.id}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="#"
                                            className="btn btn-success btn-lg"
                                            target='_blanc' hidden
                                        >
                                            <i className="bi bi-eye"></i>&nbsp;
                                            Pas de CV pour l'ID : {cv.id}
                                        </Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <button className="btn btn-primary btn-lg"
                                    onClick={handleShow}
                                >
                                    <i className="bi bi-person-workspace"></i>&nbsp;
                                    Demande d'entretien avec l'ID : {cv.id}
                                </button>
                            </>
                        )}

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-secondary btn-lg me-md-2" onClick={printCv} >
                            <i className="bi bi-printer-fill"></i>&nbsp;
                            Imprimer le cv
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin === true ? (<>
                            <Link to={`/editCv/${cv.id}`} className="btn btn-warning btn-lg"

                            >
                                <i className="bi bi-pencil-square"></i>&nbsp;
                                Modifier le CV
                            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </>) : (
                            <>
                                <button className="btn btn-warning btn-lg"
                                    onClick={() => handleFavorite()}
                                >
                                    <i className="bi bi-star"></i>&nbsp;
                                    Mettre en favori
                                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </>
                        )}
                        <button 
                        onClick={() => generatePDF(targetRef, {filename: `activsolution_cvtheque_${cv.id}.pdf`, page: {format: 'letter',
                            margin: Margin.SMALL, orientation: 'landscape'}
                        })} 
                            className="btn btn-info btn-lg"
                        >
                            <i className="bi bi-cloud-arrow-down-fill"></i>&nbsp;
                            Télécharger
                        </button>
                    </div>
                </center>
            </div>
            <Modal aria-labelledby="contained-modal-title-vcenter" size="lg"
                centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Fixer vos date de disponibilité</Modal.Title>
                </Modal.Header>
                <Modal.Body className='row'>
                    <Row className='container'>
                        <Col xs={12} md={8} >
                            <Calendar
                                range
                                onChange={setDateValue}
                                numberOfMonths={2}
                                plugins={[
                                    <Footer
                                        position="bottom"
                                        format="DD MMM YYYY"
                                        names={{
                                            selectedDates: "Date de rendez-vous d'entretien",
                                            from: "Je suis libre le",
                                            to: "Jusqu'au ",
                                            selectDate: "selection",
                                            close: "Close",
                                            separator: ",",
                                        }}
                                    />,
                                ]}
                            />
                        </Col>
                        <Col xs={6} md={4}>
                            <p>Selectionnez l'heure de rendez-vous : </p>
                            <DatePicker
                                disableDayPicker
                                format="HH:mm"
                                onChange={setHeurre}
                                plugins={[
                                    <TimePicker
                                    />
                                ]}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleDemandeEntretien}>
                        Valider le rendez-vous
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


