import React, { useEffect, useState } from "react";
import "./editcv.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Form, Formik, input} from 'formik';
import EditExperience from "./EditExperience";
import EditEtude from "./EditEtude";
import EditInfo from "./EditInfo";
import EditLangue from "./Editlangue";
import EditLoisir from "./EditLoisir";
import {NotificationManager} from "react-notifications";
import {useHistory } from 'react-router-dom'

export default function EditCV() {
    const {id} = useParams();
    const [cvall, setCvall] = useState('');
    const [experience, setExperience] = useState('');
    const [etude, setEtude] = useState('');
    const [info, setInfo] = useState('');
    const [langue, setLangue] = useState('');
    const [loisir, setLoisir] = useState('');
    const [categorie, setCategorie] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setlinkedin] = useState('');
    const [adresse, setAdresse] = useState('');
    const [nationalite, setNationalité] = useState('');
    const [dispo, setDispo] = useState('');
    const [post, setPost] = useState('');
    const [age, setAge] = useState('');
    const [status, setStatus] = useState('');
    const [aExp, setAexp] = useState('');
    const [contrat, setContrat] = useState('');
    const [sousCat, setSousCat] = useState([]);
    const [image, setImage] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [pretention, setPretention] = useState('');

    useEffect(() => {
        axios.get(`cvs/${id}`).then(resp => {
            if(id){
                setCvall(resp.data.cv);       
                setExperience(resp.data.exp)
                setEtude(resp.data.diplo)
                setInfo(resp.data.info)
                setLangue(resp.data.langage)
                setLoisir(resp.data.loisir)
            }
        }).catch(error => console.log(error));
        axios.get('categorie_cvs').then(resp => {
            if(resp.status === 200) {
                setCategorie(resp.data)
            }
        });
        axios.get('sous_categories').then(resp => {
            if(resp.status === 200){
                setSousCat(resp.data)
            }
        })
    }, [id])
    const profile = cvall
    const handleSubmit = () => {
        const formdata = new FormData;
        if(name){formdata.append('nomPrenom', name)}
        if(email){formdata.append('email', email)}
        if(telephone){formdata.append('telephone', telephone)}
        if(facebook){formdata.append('facebook', facebook)}
        if(linkedin){formdata.append('linkedin', linkedin)}
        if(adresse){formdata.append('adresse', adresse)}
        if(nationalite){formdata.append('nationalite', nationalite)}
        if(dispo){formdata.append('disponibility', dispo)}
        if(post){formdata.append('categorie_cv_id', post)}
        if(age){formdata.append('age', age)}
        if(aExp){formdata.append('aExperience', aExp)}
        if(status){formdata.append('status', status)}
        if(contrat){formdata.append('contrat', contrat)}
        if(image){formdata.append('photo', image)}
        if(prenom){formdata.append('prenom', prenom)}
        if(pretention){formdata.append('pretention', pretention)}
        axios.put(`cvs/${id}`, formdata).then(resp => {
            if(resp.status === 200){
                NotificationManager.success(`CV de ${profile.nomPrenom} modifier`, `Modification valider`, 4000)
                axios.get(`cvs/${id}`).then(resp => {
                    setCvall(resp.data.cv);       
                    setExperience(resp.data.exp);
                    setEtude(resp.data.diplo);
                    setInfo(resp.data.info);
                    setLangue(resp.data.langage);
                    setLoisir(resp.data.loisir);
                });
            }
        }).catch(error => console.log(error))  
    }

    const handleDeleteCv = () => {
        const confirme = window.confirm('Vous voulez vraiment le supprimer')
        if(confirme === true){
            axios.delete(`cvs/${id}`).then(response =>  {
                if(response.status === 204){
                    NotificationManager.success('Cv supprimer avec succès', 'Supprimer', 4000)
                    window.history.back();
                }
                console.log(response)
            })
        }
    }

    function handleClick() {
        // Ouvre un input image
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
    
        // Attend que l'utilisateur sélectionne une image
        input.addEventListener('change', (event) => {
          const file = event.target.files[0];
          setImage(file);
        });
    }

    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        {profile.photo && profile.photo.url ? (
                                            <>
                                                <img src={`http://cvtheque.activsolution.fr:33066/${profile.photo.url}`} alt="Admin" 
                                                className="rounded-circle p-1 bg-primary" width="110" height={110} onClick={handleClick}/>
                                            </>
                                        ):(<>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" 
                                            className="rounded-circle p-1 bg-primary" width="110" onClick={handleClick}/>  
                                        </>)}
                                            <i className="bi bi-camera-fill" style={{fontSize: "30px", position: "relative"}} onClick={handleClick} ></i>                                     
                                        <div className="mt-3">
                                            <h4>{profile.nomPrenom} </h4>
                                            {profile.sous_category_id ? (
                                                <>
                                                    <GetSousCategorie id={profile.sous_category_id} />
                                                </>
                                            ):(
                                                <>
                                                    <GetCategorie id={profile.categorie_cv_id} />
                                                </>
                                            )}
                                            <p className="text-muted font-size-sm">{profile.adresse} </p>
                                            <strong>ID : {profile.id}</strong><br/>
                                            {profile.status === true ? (
                                                <span class="badge bg-success">Publier</span>
                                            ):(
                                                <span class="badge bg-info">Broullion</span>
                                            )}
                                        </div>
                                    </div>
                                    <hr className="my-4"/>
                                    <ul className="list-group list-group-flush">
                                        <h5 className="d-flex align-items-center mb-3">A propos </h5>
                                            <from>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Nom</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            defaultValue={profile.nomPrenom} type="text" 
                                                            className="form-control"  name="nomPrenom"
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Prénom</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            defaultValue={profile.prenom} type="text" 
                                                            className="form-control"  name="nomPrenom"
                                                            onChange={(e) => setPrenom(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">E-mail</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" 
                                                            defaultValue={profile.email} 
                                                            className="form-control" name="email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Téléphone</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" defaultValue={profile.telephone} 
                                                            className="form-control"
                                                            onChange={(e) => setTelephone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Année d'experience(s)</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <select type="text" className="form-control"
                                                            onChange={(e) => setAexp(e.target.value)}
                                                        >
                                                            <option defaultValue={profile.aExperience} selected>{profile.aExperience} </option>
                                                            <option value="1 an">1 an</option>
                                                            <option value="2 ans">2 ans</option>
                                                            <option value="3 ans">3 ans</option>
                                                            <option value="4 ans">4 ans</option>
                                                            <option value="4 ans">5 ans</option>
                                                            <option value="+ de 5 ans">+ de 5 ans</option>
                                                            <option value="+ de 10 ans">+ de 10 ans</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Facebook</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" className="form-control" 
                                                            defaultValue={profile.facebook} 
                                                            onChange={(e) => setFacebook(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Linkedin</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            defaultValue={profile.linkedin}
                                                            onChange={(e) => setlinkedin(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Adresse exact</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" className="form-control" 
                                                            defaultValue={profile.adresse}
                                                            onChange={(e) => setAdresse(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Prétention</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" className="form-control" 
                                                            defaultValue={profile.pretention}
                                                            onChange={(e) => setPretention(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Nationalité</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <select type="text" className="form-control"
                                                            onChange={(e) => setNationalité(e.target.value)}
                                                        >
                                                            <option defaultValue={profile.nationalite} selected>{profile.nationalite} </option>
                                                            <option value="Malagasy">Malagasy</option>
                                                            <option value="Mauricien">Mauricien</option>
                                                            <option value="Autre resident Madagascar">Autre resident Madagascar</option>
                                                            <option value="Autre resident Maurice">Autre resident Maurice</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Disponibilité</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <select type="text" className="form-control"
                                                            onChange={(e) => setDispo(e.target.value)}
                                                        >
                                                            <option defaultValue={profile.disponibility} >{profile.disponibility} </option>
                                                            <option value="Disponible immediat" >Disponible immediat </option>
                                                            <option value="Temps plein" >Temps plein </option>
                                                            <option value="Temps partiel" >Temps partiel</option>
                                                            <option value="Indisponible" >Indisponible</option>
                                                            <option value="Temps partiel" >Ouvert à toutes proposition</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Contrat</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <select type="text" className="form-control"
                                                            onChange={(e) => setContrat(e.target.value)}
                                                        >
                                                            <option defaultValue={profile.contrat} >{profile.contrat} </option>
                                                            <option value="CDI" >CDI </option>
                                                            <option value="CDD" > CDD </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {profile.sous_category_id ? (
                                                    <>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Post</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <select type="text" className="form-control" 
                                                                    onChange={(e) => setPost(e.target.value)}
                                                                >
                                                                    <option selected ><GetSousCategorie id={profile.sous_category_id } /></option>
                                                                    {sousCat && sousCat.map(cat => {
                                                                        return (
                                                                            <>
                                                                                <option value={cat.id} >{cat.categorie} </option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>
                                                ):(
                                                    <>
                                                         <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Post</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <select type="text" className="form-control" 
                                                                    onChange={(e) => setPost(e.target.value)}
                                                                >
                                                                    <option selected ><GetCategorie id={profile.categorie_cv_id} /></option>
                                                                    {categorie && categorie.map(cat => {
                                                                        return (
                                                                            <>
                                                                                <option value={cat.id} >{cat.categorie} </option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Age</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" className="form-control" 
                                                            defaultValue={profile.age} 
                                                            onChange={(e) => setAge(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Status</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <select type="text" className="form-control"
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        >
                                                            {profile.status === true ? (
                                                                <>
                                                                    <option value="true" selected >Publier</option>
                                                                    <option value="false">Brouillon</option>
                                                                </>
                                                            ):(
                                                                <>
                                                                    <option value="false" selected>Brouillon</option>
                                                                    <option value="true">Publier</option>
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3"></div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-sm" title="Enregistrer les modifications">
                                                            <i class="bi bi-bookmark-fill"></i>&nbsp;
                                                            Enregistrer
                                                        </button>&nbsp;
                                                        <button onClick={handleDeleteCv} type="button" className="btn btn-danger btn-sm" title="Enregistrer les modifications">
                                                            <i class="bi bi-trash-fill"></i>&nbsp;
                                                            Supprimer le CV
                                                        </button>
                                                    </div>
                                                </div>
                                            </from>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {langue && langue.map(lang => {
                                            return (
                                                <>
                                                    <h5 className="d-flex align-items-center mb-3">Langues ({lang}) </h5>
                                                    <EditLangue id={lang} />
                                                    <hr className="my-4"/>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {loisir && loisir.map(loi => {
                                            return (
                                                <>
                                                    <h5 className="d-flex align-items-center mb-3">Loisirs ({loi}) </h5>
                                                    <EditLoisir id={loi} />
                                                    <hr/>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    {experience && experience.map(exp => {
                                        return(
                                            <>
                                                <h5 className="d-flex align-items-center mb-3">Experience ({exp}) </h5>
                                                <EditExperience data={exp} />
                                                <hr className="my-4"/>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            {etude && etude.map(diplo => {
                                                return(
                                                    <>
                                                        <h5 className="d-flex align-items-center mb-3">Etudes det formations ({diplo}) </h5>
                                                        <EditEtude id={diplo} />
                                                        <hr className="my-4"/>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            {info && info.map(infor => {
                                                return (
                                                    <>
                                                        <h5 className="d-flex align-items-center mb-3">Connaissance en informatique ({infor}) </h5>
                                                        <EditInfo id={infor} />
                                                        <hr className="my-4"/>
                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>
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

function GetCategorie({id}) {
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                if(resp.status === 200){
                    setCat(resp.data.cat)
                }
            }).catch(error => console.log(error))
        }
    },[id])
    return (
        <>
            <strong className="text-secondary mb-1">{cat.categorie}  </strong>
        </>
    )
}

function GetSousCategorie({id}) {
    const [sousCat, setSousCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`sous_categories/${id}`).then(resp => {
                if(resp.status === 200){
                    setSousCat(resp.data)
                }
            }).catch(error => console.log(error))
        }
    },[id])
    return (
        <>
            <strong className="text-secondary mb-1">{sousCat.categorie}  </strong>
        </>
    )
}