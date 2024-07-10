import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentTable from "./ContentTable";
import { Link } from "react-router-dom";
import Avvvatars from 'avvvatars-react';



export default function ResultSeach({ sea, con }) {
    console.log(con)
    //sea = resultat de recherche
    const array = sea
    if (array.length === 0 && con === true) {
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Aucune resultat !</strong> veuillez réessayer
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    } else if (array.length !== 0 && con === true)
        return (
            <>
                <table className="table table-actions table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Localisation</th>
                            <th scope="col">Expérience</th>
                            <th scope="col">Disponibilité</th>
                            <th scope="col">Contrat</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sea && sea.map(cv => {
                            let image;
                            if (cv.photo && cv.photo.url !== null) {
                                const url = cv.photo.url;
                                image = (
                                    <>
                                        <span><Avvvatars size={50} value={cv.nomPrenom}/></span>
                                    </>
                                )
                            } else {
                                image = (
                                    <>
                                        <img src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" style={{ "width": "50px", "height": "50px", "borderRadius": "50%" }} className="img-thumbnail" alt="..." />
                                    </>)
                            }

                            if (cv.status === true) {
                                return (
                                    <tr>
                                        <th scope="row">
                                            <strong>{cv.id}</strong>
                                        </th>
                                        <th>
                                            {image}
                                        </th>
                                        <td className="align-middle">{cv.nationalite} </td>
                                        <td className="align-middle">{cv.aExperience} </td>
                                        <td className="align-middle">
                                            <h6><span className="badge bg-success">{cv.disponibility}</span></h6>
                                        </td>
                                        <td className="align-middle">
                                            <h6><span className="badge bg-info">{cv.contrat}</span></h6>
                                        </td>
                                        <td className="align-middle">
                                            <Link to={`/cv/${cv.id}`}><button type="button" className="btn btn-primary btn-sm">Voir le CV</button></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>

                </table>
                <br />
                <br />
            </>
        )
}


