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
                    <div class="">
                        <div class="layout-spacing">
                            <div class="statbox widget box box-shadow">
                                <div class="widget-content widget-content-area">
                                    <div class="row">
                                        {candidat && candidat.map(cv => {
                                            var date = moment(cv.created_at); // crée un objet Moment pour la date actuelle
                                            var formattedDate = date.fromNow(); // format " quelques minutes"
                                            if(cv.status !== true){
                                                return (
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" class="tabcontent"> 
                                                            <div class="story-container-2">
                                                                <div class="single-story">
                                                                    <div class="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`http://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}                                                                    
                                                                    </div>
                                                                    <div class="story-author">
                                                                        <p class="name">
                                                                            {cv.nomPrenom} / <a href="" class="badge badge-info">Broullion</a>
                                                                            &nbsp;<a href="" class="badge badge-info"> {formattedDate}</a>
                                                                        </p>
                                                                        <p class="time">
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
                                                                        <p class="time">
                                                                            <Link to={`editCv/${cv.id}`} class="badge badge-warning">Modifier le CV</Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }else{
                                                return (
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" class="tabcontent"> 
                                                            <div class="story-container-2">
                                                                <div class="single-story">
                                                                    <div class="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`http://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}                                                                    
                                                                    </div>
                                                                    <div class="story-author">
                                                                        <p class="name">
                                                                            {cv.nomPrenom} / <a href="" class="badge badge-success">Publier</a>
                                                                            &nbsp;<a href="" class="badge badge-success"> {formattedDate}</a>
                                                                        </p>
                                                                        <p class="time">
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
                                                                        <p class="time">
                                                                            <Link to={`editCv/${cv.id}`} class="badge badge-warning">Modifier le CV</Link>
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
                                <div class="widget-footer p-2 text-center bg-light-primary">
                                    <Link class="text-primary strong" to="/cv">Voir tous les Candidats recent</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }else {
            return (
                <>
                    <div class="">
                        <div class="layout-spacing">
                            <div class="statbox widget box box-shadow">
                                <div class="widget-content widget-content-area">
                                    <div class="row">
                                        {candidat && candidat.map(cv => {
                                            if(cv.status === true){
                                                return (
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="content_2" class="tabcontent"> 
                                                            <div class="story-container-2">
                                                                <div class="single-story">
                                                                    <div class="story-dp unseen">
                                                                        {cv.photo && cv.photo.url === null ? (
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                                            ):(
                                                                            <img src={`http://cvtheque.activsolution.fr:33066/${cv.photo.url}`}/>
                                                                        )}
                                                                    </div>
                                                                    <div class="story-author">
                                                                        <p class="name"><strong>ID : {cv.id}</strong> </p>
                                                                        <p class="time">
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
                                                                        <Link to={`/cv/${cv.id}`} ><p class="time">Voir le CV</p></Link>
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
                                <div class="widget-footer p-2 text-center bg-light-primary">
                                    <Link class="text-primary strong" to="/cv">Voir tous les Candidats recent</Link>
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