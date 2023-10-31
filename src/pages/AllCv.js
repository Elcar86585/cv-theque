import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import CvTous from "./cv/CvTous";
import Cvpublique from "./cv/Cvpublique";
import CvBrouillon from "./cv/CvBrouillon";

class AllCv extends React.Component {
    state = {
        cvs: [],
        tabKey: 'one'
    }

    componentDidMount = () => {
        this.getCv();
    }

    handleTabs = (key) => {
        this.setState({ tabKey: key })
    }

    getCv = () => {
        axios.get('cvs').then(resp => {
            this.setState({
                cvs: resp.data
            })
        }).catch(error => console.log(error))
    }

    render() {
        const allcounter = this.state.cvs.length
        const cv = this.state.cvs
        const user = this.props.user
        const publique = cv.filter(c => c.status === true)
        const prive = cv.filter(c => c.status === false || c.status === null)
        
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

                            <div className="pb-3">
                                <h3>Tous les candidats</h3>
                            </div>
                            {user.role === 'Administrateur' ? (
                                <>
                                    <Tabs activeKey={this.state.tabKey} onSelect={(e) => this.handleTabs(e)}>
                                        <Tab eventKey="one" title={`Tous les CV (${allcounter})`}>
                                            <br/>
                                            <div className="table-responsive-md">
                                                <div className="row" >
                                                    <CvTous candy={cv} utilisateur={user} />
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="two" title={`tous les CV publier (${publique.length})`}>
                                            <br/>
                                            <div className="table-responsive-md">
                                                <div className="row" >
                                                    <Cvpublique candy={cv} utilisateur={user} />
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="three" title={`Tous les CV en Brouillon (${prive.length})`}>
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
                                    {cv && cv.map(profil => {
                                        let image;
                                        if (profil.photo && profil.photo.url) {
                                            image = (
                                                <span style={{ "background-image": `url(http://cvtheque.activsolution.fr:33066/${profil.photo.url})` }} className="avatar avatar-xl mr-3">
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
                                                                                <Categoriename catId={profil.categorie_cv_id} />
                                                                            </p>
                                                                            <p className="card-text">
                                                                                {profil.disponibility}
                                                                            </p>
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
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AllCv;


function Categoriename({ catId }) {
    const [categorie, setCategorie] = useState('')
    useEffect(() => {
        if (catId) {
            axios.get(`categorie_cvs/${catId}`).then(resp => {
                if (resp.status === 200) {
                    setCategorie(resp.data.cat)
                }
            })
        }
    }, [catId])
    return (
        <p className="card-text text-muted">
            {categorie.categorie}
        </p>
    )
}