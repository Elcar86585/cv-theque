import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap'
import moment from "moment";
import ModificationCategory from "./categoryComponent/ModificationCategory";
import AddSousCategory from "./categoryComponent/AddSousCategory";
import { NotificationManager } from "react-notifications";

export default function EditCategorie() {
    const [catego, setCatego] = useState('');
    const navigate = useNavigate();
    const [sousCat, setSousCat] = useState('');
    const [tabKey, initTabKey] = useState('one');
    const [editSous, setEditSous] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`categorie_cvs/${id}`).then(resp => {
            if (resp.status === 200) {
                setCatego(resp.data.cat)
                setSousCat(resp.data.sousCategorie);
            }
        }).catch(error => console.log(error))
    }, [id])

    const getCatego = () => {
        axios.get(`categorie_cvs/${id}`).then(resp => {
            if (resp.status === 200) {
                setCatego(resp.data.cat)
                setSousCat(resp.data.sousCategorie)
            }
        }).catch(error => console.log(error))
    }

    const handleDeleteCat = () => {
        const confirme = window.confirm('Vous voulez vraiment supprimer cette categorie');
        if (confirme === true) {
            axios.delete(`categorie_cvs/${id}`).then(resp => {
                if (resp.status === 204) {
                    NotificationManager.success('Supprimer avec succées', 'Catégorie supprimer avec succées', 4000)
                    navigate('/cvtheque/categories');
                }
            }).catch(error => console.log(error))
        }
    }

    const handleDeleteSousCat = (data) => {
        const confirme = window.confirm('Vous voulez vraiment supprimer cette sous categorie');
        if (confirme === true) {
            axios.delete(`sous_categories/${data}`).then(resp => {
                if (resp.status === 204) {
                    NotificationManager.success('Supprimer', 'Sous catégorie supprimer avec succées', 4000)
                    getCatego();
                } else {
                    NotificationManager.warning('Erreur', 'Une erreur est survenue lors de la suppression', 4000)
                }
            }).catch(error => console.log(error))
        }
    }

    const dateTime = moment(catego.created_at).format('d MMMM YYYY, HH:mm')
    const dateUpdate = moment(catego.updated_at).format('d MMMM YYYY, HH:mm')
    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="container-fluid">
                        <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                            <ol className="breadcrumb adminx-page-breadcrumb">
                                <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                                <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Interface utilisateur</a></li>
                                <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">
                                    Modifier le categorie
                                </li>
                            </ol>
                        </nav>
                        <div className="pb-3 d-flex justify-content-between">
                            <h3>
                                Categorie id : {catego.id}
                            </h3>
                            <button type="boutton" className="btn btn-primary btn-sm" onClick={() => window.history.back()} >
                                <i className="bi bi-arrow-left-short"></i>
                                Retour
                            </button>
                        </div>
                        <hr />
                        <div className="pb-3">
                            <h2 _msttexthash="234351" _msthash="67">Modifier un categorie</h2>
                        </div>

                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-6 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column ">
                                                <div class="">
                                                    <h4>{catego.categorie}</h4>
                                                    <p class="text-secondary mb-1">{catego.description} </p>
                                                    <hr />
                                                    <p class="text-muted font-size-sm">Créer : {dateTime} </p>
                                                    <p class="text-secondary mb-1">Modifier : {dateUpdate} </p>
                                                    <button onClick={handleDeleteCat} type="button" class="btn btn-danger btn-sm">Supprimer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>Sous Categorie</h4>
                                    <div class="card mt-3">
                                        <ul class="list-group list-group-flush">
                                            {sousCat && sousCat.map(sc => {
                                                return (
                                                    <>
                                                        <li class="list-group-item">
                                                            <h5 class="mb-0">{sc.categorie} </h5><br />
                                                            <p>
                                                                {sc.description}
                                                            </p>
                                                            <span class="text-secondary">
                                                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                                                    <button type="button" onClick={() => handleDeleteSousCat(sc.id)} class="btn btn-danger btn-sm">
                                                                        <i className="bi bi-trash3"></i> Supprimer
                                                                    </button>
                                                                    <button onClick={() => setEditSous(sc.id)} type="button" class="btn btn-primary btn-sm">
                                                                        <i className="bi bi-pencil-square"></i> Modifier
                                                                    </button>
                                                                </div>
                                                            </span>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
                                                <Tab eventKey="one" title="Modifier le catégorie">
                                                    <ModificationCategory data={catego} funcData={getCatego} />
                                                </Tab>
                                                <Tab eventKey="two" title="Ajouter un sous catégorie">
                                                    <AddSousCategory catData={catego} functionne={getCatego} />
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                    <br />
                                    {editSous ? (
                                        <>
                                            <div class="card mb-3">
                                                <div class="card-body" style={{ backgroundColor: "#e9ecef" }}>
                                                    <EditSousCategorie idSous={editSous} funct={getCatego} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function EditSousCategorie({ idSous, funct }) {
    const [sous, setSous] = useState('');
    const [catSous, setCatSous] = useState('');
    const [desSousCat, setDesSousCat] = useState('')
    useEffect(() => {
        axios.get(`sous_categories/${idSous}`).then(resp => {
            if (resp.status === 200) {
                setSous(resp.data.sc);
            }
        })
    }, [idSous])


    const handleUpdateSous = (e) => {
        e.preventDefault();
        const dataForm = new FormData;

        if (catSous) { dataForm.append('categorie', catSous) }
        if (desSousCat) { dataForm.append('description', desSousCat) }
        axios.put(`sous_categories/${idSous}`, dataForm).then(resp => {
            if (resp.status === 200) {
                NotificationManager.success('Modifier', 'Sous catégorie modilier avec succée', 4000);
                funct();
            } else {
                NotificationManager.warning('Erreur', 'Une erreur est survenue lors de la modification', 4000);
            }
        })
    }
    return (
        <>
            <h5>Modifier le sous catégorie de {sous.categorie}</h5>
            <form onSubmit={handleUpdateSous}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Sous catégorie </label>
                    <input type="text" class="form-control" defaultValue={sous.categorie}
                        onChange={(e) => setCatSous(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description du catégorie</label>
                    <textarea type="text" class="form-control" defaultValue={sous.description}
                        onChange={(e) => setDesSousCat(e.target.value)}
                    >
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enregister</button>
            </form>
        </>
    )
}