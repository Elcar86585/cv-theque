import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function IdSearch({ recherche, fonc }) {
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (recherche) {
            let params = '';

            if (/^\d+$/.test(recherche)) { // Check if recherche is a number (ID)
                params = `id=${recherche}`;
            } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recherche)) { // Check if recherche is an email
                params = `email=${recherche}`;
            } else { // Assume recherche is a name
                params = `nomPrenom=${recherche}`;
            }

            axios.get(`/searchmultiple?${params}`)
                .then(resp => {
                    if (resp.status === 200 && resp.data.searchmultiple.length > 0) {
                        setSearchResults(resp.data.searchmultiple);
                    } else {
                        setSearchResults([]);
                        setMessage(resp.data.message || 'Aucun résultat trouvé');
                    }
                })
                .catch(error => {
                    console.error(error);
                    setMessage('Erreur lors de la recherche');
                });
        }
    }, [recherche]);
    console.log(searchResults.length)
    if(searchResults.length > 0) {
    return (
        <div className="adminx-content">
            <div className="adminx-main-content">
                <div className="col-12">
                    <div className="card card-margin">
                        <div className="card-body">
                            <div className="row search-body">
                                <div className="col-lg-12">
                                    <div className="search-result">
                                        <div className="result-header">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="records">Montrant : <b>{searchResults.length}</b> résultat(s)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-body">
                                            <div className="table-responsive">
                                                <table className="table widget-26">
                                                    <tbody>
                                                        {searchResults.length > 0 ? (
                                                            searchResults.map(result => {
                                                                const date = moment(result.created_at).startOf('day').fromNow();
                                                                return (
                                                                    <tr key={result.id}>
                                                                        <td>
                                                                            <div className="widget-26-job-title">
                                                                                <b>{result.nomPrenom}</b>
                                                                                <p className="m-0">{result.nom} {result.prenom}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-title">
                                                                                <a href="#">
                                                                                    <b>Expérience :</b> + de {result.aExperience} 
                                                                                </a>
                                                                                <p className="m-0">
                                                                                    <a href="#" className="employer-name">
                                                                                        <b>CV id :</b> 00{result.id}
                                                                                    </a> ... <span className="text-muted time">{date}</span>
                                                                                </p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-info">
                                                                                <p className="type m-0">{result.disponibility}</p>
                                                                                <p className="text-muted m-0">Habite à <span className="location">{result.adresse}</span></p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-salary">
                                                                                Contrat : {result.contrat}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-category bg-soft-base">
                                                                                <i className="bi bi-tags-fill"></i>&nbsp;Poste :&nbsp;
                                                                                <GetCategorieCv id={result.categorie_cv_id} />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <Link onClick={() => fonc()} to={`/cv/${result.id}`}>
                                                                                <div className="widget-26-job-starred">
                                                                                    <button type="button" className="btn btn-primary btn-sm">
                                                                                        Voir le CV ID : {result.id}
                                                                                    </button>
                                                                                </div>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="6">
                                                                    <h3>Aucun résultat</h3>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }else{
        return (
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="col-12 text-center">
                        <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">Aucune resultat !</h4>
                        <p>Ouups ! veuillez bien verifier votre mots clé pour le recherche</p>
                        <hr/>
                        <p class="mb-0">Montrant : <b>0</b> resultat</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function GetCategorieCv({ id }) {
    const [catego, setCatego] = useState('');

    useEffect(() => {
        axios.get(`categorie_cvs/${id}`).then(resp => {
            if (resp.status === 200) {
                setCatego(resp.data.cat);
            }
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <span>{catego.categorie}</span>
    );
}