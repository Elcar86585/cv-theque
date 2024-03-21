import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

class CandidatRecent extends React.Component {
    state = {
        profil : []
    }

    componentDidMount = () => {
        this.getprofile()
    }

    getprofile = () => {
        axios.get('/cvs').then(reponse => {
            this.setState({
                profil: reponse.data.slice(0, 6)
            })
        }).catch(error => console.log(error))
    }
    render() {
        const candidat = this.state.profil
        const user = this.props.use
        if(user.role === "Administrateur") {
            return (
                <>
                    <div className="">
                        <div className="layout-spacing">
                            <div className="statbox widget box box-shadow">
                                <div className="widget-content widget-content-area">
                                    <div className="row">
                                        {candidat && candidat.map(cv => {
                                            var date = moment(cv.created_at); // crée un objet Moment pour la date actuelle
                                            var formattedDate = date.fromNow(); // format " quelques minutes"
                                            if(cv.status !== true){
                                                return (
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" className="tabcontent"> 
                                                            <div className="story-container-2">
                                                                <div className="single-story">
                                                                    <div className="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`https://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}                                                                    
                                                                    </div>
                                                                    <div className="story-author">
                                                                        <p className="name">
                                                                            {cv.nomPrenom} / <a href="" className="badge badge-info">Broullion</a>
                                                                            &nbsp;<a href="" className="badge badge-info"> {formattedDate}</a>
                                                                        </p>
                                                                        <p className="time">
                                                                            {cv.sous_category_id ? (
                                                                                <>
                                                                                    <SousCategorie sid={cv.sous_category_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <Categorie id={cv.categorie_cv_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            )}
                                                                        </p>
                                                                        <p className="time">
                                                                            <Link to={`editCv/${cv.id}`} className="badge badge-warning">Modifier le CV</Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }else{
                                                return (
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" className="tabcontent"> 
                                                            <div className="story-container-2">
                                                                <div className="single-story">
                                                                    <div className="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`https://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}                                                                    
                                                                    </div>
                                                                    <div className="story-author">
                                                                        <p className="name">
                                                                            {cv.nomPrenom} / <a href="" className="badge badge-success">Publier</a>
                                                                            &nbsp;<a href="" className="badge badge-success"> {formattedDate}</a>
                                                                        </p>
                                                                        <p className="time">
                                                                            {cv.sous_category_id ? (
                                                                                <>
                                                                                    <SousCategorie sid={cv.sous_category_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <Categorie id={cv.categorie_cv_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            )}
                                                                        </p>
                                                                        <p className="time">
                                                                            <Link to={`editCv/${cv.id}`} className="badge badge-warning">Modifier le CV</Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="widget-footer p-2 text-center bg-light-primary">
                                    <Link className="text-primary strong" to="/cv">Voir tous les Candidats recent</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }else {
            return (
                <>
                    <div className="">
                        <div className="layout-spacing">
                            <div className="statbox widget box box-shadow">
                                <div className="widget-content widget-content-area">
                                    <div className="row">
                                        {candidat && candidat.map(cv => {
                                            if(cv.status === true){
                                                return (
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" className="tabcontent"> 
                                                            <div className="story-container-2">
                                                                <div className="single-story">
                                                                    <div className="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`https://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}
                                                                    </div>
                                                                    <div className="story-author">
                                                                        <p className="name"><strong>ID : {cv.id}</strong> </p>
                                                                        <p className="time">
                                                                            {cv.sous_category_id ? (
                                                                                <>
                                                                                    <SousCategorie sid={cv.sous_category_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            ):(
                                                                                <>
                                                                                    <Categorie id={cv.categorie_cv_id} /> / {cv.aExperience} d'experience(s)
                                                                                </>
                                                                            )}
                                                                        </p>
                                                                        <Link to={`/cv/${cv.id}`} ><p className="time">Voir le CV</p></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="widget-footer p-2 text-center bg-light-primary">
                                    <Link className="text-primary strong" to="/cv">Voir tous les Candidats recent</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        
    }
}

export default CandidatRecent;

function Categorie({id}) {
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`/categorie_cvs/${id}`).then(resp => {
                setCat(resp.data.cat)
            }).catch(error => console.log(error))
        }
    }, [id])
    
    return(
        <>
            {cat.categorie}
        </>
    )
}

function SousCategorie({sid}) {
    const [sousCat, setSousCat] = useState('')
    useEffect(() => {
        if(sid){
            axios.get(`/sous_categories/${sid}`).then(resp => {
                setSousCat(resp.data.sc)
            }).catch(error => console.log(error))
        }
    }, [sid])
    return(
        <>
        {sousCat.categorie}
    </>
    )
}