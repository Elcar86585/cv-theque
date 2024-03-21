import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import CvTous from "./cv/CvTous";
import Cvpublique from "./cv/Cvpublique";
import CvBrouillon from "./cv/CvBrouillon";
import Ratage from "./cv/Ratage";
import GetSousCategories from "./cv/getCateogtieCv/GetSousCategories";
import Categoriename from "./cv/getCateogtieCv/Categoriename";
import Loader from "../Loader";
import NavSearchCv from "./cv/NavSearchCv";

class AllCv extends React.Component {
    state = {
        cvs: [],
        tabKey: 'one',
        ncv: 9,
        loading: true,
        cvsu: [],
        limit: 150
    }

    componentDidMount = () => {
        this.getCv();
        this.getCvUser();
    }

    handleTabs = (key) => {
        this.setState({ tabKey: key })
    }

    getCv = () => {
        if(this.props.user.role === 'Administrateur'){
            axios.get('cvs?limit=10').then(resp => {
                if(resp.status === 200){
                    this.setState({
                        cvs: resp.data
                    })
                    setTimeout(() => {
                        this.setState({loading: false})
                    }, 3000)
                }
            }).catch(error => console.log(error))
        }
    }

    getCvUser = () => {
        if(this.props.user.role !== 'Administrateur'){
            axios.get('cvs?limit=10').then(resp => {
                if(resp.status === 200){
                    this.setState({
                        cvsu: resp.data
                    })
    
                    if(this.state.cvs){
                        this.setState({loading: false})
                    }
                    // setTimeout(() => {
                    // }, 3000)
                }
            }).catch(error => console.log(error))
        }
    }


    handleClick = () => {
        this.setState({limit: this.state.limit + 100})
    }


    render() {
        
        const allcounter = this.state.cvs.length
        const cv = this.state.cvs
        const cvall = this.state.cvsu.slice(0, this.state.limit)
        const user = this.props.user
        const publique = cv.filter(c => c.status === true)
        const prive = cv.filter(c => c.status === false || c.status === null)

        if(this.state.loading === true){
            return <Loader/>
        }
        
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb" role="navigation">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Tableu de bord</a></li>
                                    <li className="breadcrumb-item"><a href="#">Candidats</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Tous les Candidats</li>
                                </ol>
                            </nav>

                            <div className="pb-3 d-flex justify-content-between">
                                <h3>
                                    Tous les candidats
                                </h3>
                                <button type="boutton" className="btn btn-primary btn-sm" onClick={() => window.history.back()} >
                                    <i className="bi bi-arrow-left-short"></i>
                                    Retour
                                </button>
                            </div>
                            {user.role === 'Administrateur' ? (
                                <>
                                    <Tabs activeKey={this.state.tabKey} onSelect={(e) => this.handleTabs(e)}>
                                        <Tab eventKey="one" title={`Tous les CV (${allcounter})`}>
                                            <br />
                                            <NavSearchCv candydat={cv} />
                                            <br/>
                                            <div className="table-responsive-md">
                                                <>
                                                    <CvTous candy={cv} utilisateur={user} />
                                                </>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="two" title={`tous les CV publier (${publique.length})`}>
                                            <br />
                                            <NavSearchCv candydat={cv} />   
                                            <br/>
                                            <div className="table-responsive-md">
                                                <>
                                                    <Cvpublique candy={cv} utilisateur={user} />
                                                </>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="three" title={`Tous les CV en Brouillon (${prive.length})`}>
                                            <br />
                                            <NavSearchCv candydat={cv} />
                                            <br/>
                                            <div className="table-responsive-md">
                                                <div className="row" >
                                                    <CvBrouillon candy={cv} utilisateur={user} />
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </>
                            ) : <></>}
                            <div className="table-responsive-md">
                                <div className="row" >
                                    {cvall && cvall.map(profil => {
                                        let image;
                                        if (profil.photo && profil.photo.url) {
                                            image = (
                                                <span style={{ "background-image": `url(https://cvtheque.activsolution.fr:33066/${profil.photo.url})` }} className="avatar avatar-xl mr-3">
                                                </span>
                                            )
                                        } else {
                                            image = (
                                                <span style={{ "background-image": "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3">
                                                </span>
                                            )
                                        }
                                        if (user.role === 'Administrateur') {
                                            return <></>
                                        } else {
                                            if (profil.status === true) {
                                                return (
                                                    <div className="col-md-6 col-xl-4">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="media align-items-center">
                                                                    {image}
                                                                    <div className="media-body overflow-hidden">
                                                                        <strong>ID : 00{profil.id} </strong>
                                                                        <h5 className="card-text mb-0">   </h5>
                                                                        <p className="card-text">
                                                                            Expereince : {profil.aExperience}<br />
                                                                            <p>
                                                                                {profil.sous_category_id ? (
                                                                                    <GetSousCategories catid={profil.sous_category_id} />
                                                                                ) : (
                                                                                    <Categoriename catId={profil.categorie_cv_id} />
                                                                                )}
                                                                            </p>
                                                                            <p className="card-text">
                                                                                {profil.disponibility}
                                                                            </p>
                                                                            <Ratage dCv={profil} />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Link to={`/cv/${profil.id}`} className="tile-link"></Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                            <center>
                            {user.role !== 'Administrateur' ? (
                                <button type="button" onClick={this.handleClick} class="btn btn-primary btn-lg ">
                                    Monter plus de CV
                                </button>
                            ):(<></>)}
                            </center>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default AllCv;