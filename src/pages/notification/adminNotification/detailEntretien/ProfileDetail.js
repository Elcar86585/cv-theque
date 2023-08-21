import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfileDetail({profil}) {
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div>
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                {profil.photo && profil.photo.url ? (
                                    <>
                                        <img src={`https://8fa5-154-126-85-47.ngrok-free.app/${profil.photo.url}`} alt="Admin" className="rounded-circle" width="150" height={150} />
                                    </>
                                ): (
                                    <>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" height={150} />
                                    </>
                                )}
                                <div className="mt-3">
                                    <h4>
                                        {profil.nomPrenom}
                                    </h4>
                                    <GetCat id={profil.categorie_cv_id} />
                                    <p className="text-secondary mb-1">{profil.aExperience} d'expereince(s) </p>
                                    <p className="text-muted font-size-sm">{profil.adresse} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Date de naissance</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.age}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">E-mail</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.email}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Téléphone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.telephone}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Nationalité</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.nationalite}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Contrat</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.contrat}
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Disponibilité</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.disponibility}
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profil.descriptionProfile}
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetCat({id}) {
    const [category, setCategorie] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                if(resp.status === 200){
                    setCategorie(resp.data.cat)
                }
            })
        }
    }, [id])
    return(
        <>
            <strong>
                <p className="text-secondary mb-1">{category.categorie} </p>
            </strong>
        </>
    )
}
