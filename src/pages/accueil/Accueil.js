import React from "react";
import './accueil.css';
import { Link } from "react-router-dom";
import bg_image_1 from '../../images/img/bg_image_1.png';
import bg_image_2 from '../../images/img/bg_image_2.png';
import icon_pattern from '../../images/img/icon_pattern.svg'

class Accueil extends React.Component {
    render() {
        return (
            <><header>
                <div className="container">
                    <div className="">
                        <div className="page-banner home-banner">
                            <div className="h-100">
                                <div className="row align-items-center h-100">
                                    <div className="col-lg-8 py-3 wow fadeInUp">
                                        <h1 className="mb-4">Vous arrive-t-il de passer des heures à trier des CV sans trouver le candidat idéal ?</h1>
                                        <p className="text-lg mb-5">Souhaitez-vous maximiser vos chances de recruter les meilleurs talents rapidement et facilement ?</p>
                                        <p className="text-lg mb-5">
                                            Vous en avez marre de perdre du temps et de l'argent dans des recrutements infructueux ?
                                        </p>
                                        
                                        <Link to='/formulaire' className="btn btn-primary btn-split ml-2">Demander un login</Link>
                                    </div>
                                    <div className="col-lg-4 py-3 wow zoomIn">
                                        <div className="img-place">
                                            <img src={bg_image_1} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

                <main>
                    <div className="page-section features">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                                    <div className="d-flex flex-row">
                                        <div className="img-fluid mr-3">
                                            <img src={icon_pattern} alt="" />
                                        </div>
                                        <div>
                                            <h5>Filtres précis : ciblez les candidats répondant parfaitement à vos besoins.</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                                    <div className="d-flex flex-row">
                                        <div className="img-fluid mr-3">
                                            <img src={icon_pattern} alt="" />
                                        </div>
                                        <div>
                                            <h5>Recherche avancée : trouvez des compétences rares en quelques clics.</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                                    <div className="d-flex flex-row">
                                        <div className="img-fluid mr-3">
                                            <img src={icon_pattern} alt="" />
                                        </div>
                                        <div>
                                            <h5>Gain de temps : passez moins de temps à chercher, plus à recruter !</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 py-3 wow zoomIn">
                                    <div className="img-place text-center">
                                        <img src={bg_image_2} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-8 py-3 wow fadeInRight">
                                    <h2 className="title-section">Plus besoin de trier des centaines de CV.</h2>
                                    <div className="divider"></div>
                                    <p>
                                        Notre CVthèque centralise des CV qualifiés et vous offre des outils de recherche puissants pour trouver les meilleurs talents en un clin d'œil.<br/>
                                        Notre CVthèque, c'est la solution pour un recrutement efficace et performant.<br/>
                                        Contactez-nous dès aujourd'hui et optimisez vos chances de trouver la perle rare !
                                    </p>
                                    <div className="img-place mb-3">
                                        <img src="../assets/img/testi_image.png" alt="" />
                                    </div>
                                    <a href="#" className="btn btn-primary">More Details</a>
                                    <a href="#" className="btn btn-outline border ml-2">Success Stories</a>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </main>

            </>
        )
    }
}

export default Accueil;