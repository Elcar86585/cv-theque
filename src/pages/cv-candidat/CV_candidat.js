import React, { useEffect, useState } from 'react';
import './cvCandidat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CandidatExper from './Candidatexper';
import CandidatEtude from './CandidatEtude';
import CandidatLangage from './CandidatLangage';
import CandidatLoisir from './CandidatLoisir';
import CandidatInfo from './CandidatInfo';
import CandidatCategorie from './CandidatCategorie';
import Commentaire from './Commentaire';

export default function CV_candidat() {
        const {id} = useParams();
        const [cv, setCv] = useState('');
        const [array, setArray] = useState('');
        const [comment, setComment] = useState(false);

        
        useEffect(() => {
            if(id){
                axios.get(`cvs/${id}`).then(resp => {
                setCv(resp.data.cv);
                setArray(resp.data);
                });
            }
        }, [id]);

          const handleClick = () => {
            setComment(true)
          }
          const admin = sessionStorage.url === 'Administrateur';
          let contact;
          let commentaire;
          if(admin === true){
            commentaire = (
                <>
                     {comment ? (
                        <>
                            <Commentaire />
                        </>
                    ) : (
                        <>
                            <button onClick={handleClick} class="btn btn-primary active" data-bs-toggle="button" autocomplete="off" aria-pressed="true">Ajouter un commentaire</button>
                        </>
                    )}
                </>
            )
            contact = (
                <>
                    <div className="primary-info">
                        <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">{cv.nomPrenom} </h1>
                        <div className="title mb-3">{}</div>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href={`mailto:${cv.email}`} target='_blanc'><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{cv.email} </a></li>
                            <li><a href={`tel:${cv.telephone}`} target='_blanc'><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.telephone} </a></li>
                            <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.age} ans / {cv.aExperience} d'experience(s)</li>
                        </ul>
                    </div>
                    <div className="secondary-info ml-md-auto mt-2">
                        <ul className="resume-social list-unstyled">
                            <li className="mb-3"><a href='#' ><strong>ID : 00{cv.id}</strong> </a></li>
                        </ul>
                    </div>
                </>
            )
          }else{
            contact = (
                <>
                    <div className="primary-info">
                        <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">ID : {cv.id} </h1>
                        <div className="title mb-3">
                            <CandidatCategorie id={cv.categorie_cv_id} />
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-2"><i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>{cv.disponibility} </li>
                            <li><i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>{cv.aExperience} d'experience(s) </li>
                        </ul>
                    </div>
                </>
            )
          }

          let photo;
          if(cv && cv.photo.url){
            photo = (
                <>  
                    <img src={`http://localhost:3001/${cv.photo.url}`} alt="image" border="0" width="220" height="220"/>
                </>
            )
          }else {
            photo = (
                <>
                    <img src="https://images.freeimages.com/365/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg" alt="image" border="0" width="220" height="220"/>
                </>
            )
          }
        return (
            <div>
            <div id="cvtel">
                <article className="resume-wrapper text-center position-relative">
                    <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
                        <header className="resume-header pt-4 pt-md-0">
                            <div className="media flex-column flex-md-row">
                                    {photo}
                                <img className="mr-3 img-fluid picture mx-auto" src="assets/images/фотощька.jpg" alt=""/>
                                <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                                    {contact}                                  
                                </div>
                            </div>
                        </header>
                        <div className="resume-body p-5">
                            <section className="resume-section summary-section mb-5">
                                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">profile</h2>
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
                                            <br/>
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
                                            
                                            <div className="resume-skill-item">
                                                <h4 className="resume-skills-cat font-weight-bold">Loisirs</h4>
                                                <CandidatLoisir loi={array.loisir} />
                                            </div>
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
                    <br/>
                    <div class="">
                        &nbsp;
                        <button class="btn btn-primary btn-lg" type="button">
                            <i class="bi bi-person-workspace"></i>&nbsp;
                            Demande d'entretien avec l'ID : {cv.id}
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="btn btn-secondary btn-lg me-md-2" type="button">
                            <i class="bi bi-printer-fill"></i>&nbsp;
                            Imprimer le cv
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="btn btn-warning btn-lg" type="button">
                            <i class="bi bi-bookmarks-fill"></i>&nbsp;
                            Enregistrer
                        </button>
                    </div>
                </article>  
                
            </div>
            

            </div>
        )
    }


