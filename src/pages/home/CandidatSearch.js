import React, { useState } from "react";
import ResultSeach from "./ResultSearch";
import ProfilIdeal from "./ProfilIdeal";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function CandidatSearch({catID, catName}) {
    const [localisation, setLocalisation] = useState('')
    const [exp, setExp] = useState('');
    const [dispo, setDispo] = useState('');
    const [contrat, setContrat] = useState('');
    const [results, setResults] = useState([]);
    const [tad, setTady] = useState(false)

    const handleSubmit = (e) => {
        axios.post(`/recherche?categorie_cv_id=${catID}&nationalite=${localisation}&disponibility=${dispo}&contrat=${contrat}&aExperience=${exp}&`).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                setResults(
                    resp.data.recherche.slice(0, 7)
                )
                setTady(true)
            }
        })
    }
    
    return (
        <>
            <div className="row">
                <div className="col-md-12 col-lg-12 d-flex">
                    <div className="card mb-grid w-100">
                        <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="card-title mb-0">
                                    Rechercher un profil
                                </h5>
                            </div>

                            <div>
                                <div className="form-row">
                                    <div className="col-3">
                                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option value={''} selected> {catName}  </option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <select onChange={(e) => setLocalisation(e.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option value="">Localisation ...</option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Maurice">Maurice</option>
                                            <option value="Autre resident">Autre resident</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select onChange={(e) => setExp(e.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option value="">Experience...</option>
                                            <option value="1 an">1 an</option>
                                            <option value="2 ans">2 ans</option>
                                            <option value="3 ans">3 ans</option>
                                            <option value="4 ans">4 ans</option>
                                            <option value="5 ans">5 ans</option>
                                            <option value="+ de 5 ans">+ de 5 ans</option>
                                            <option value="+ de 10 ans">+ de 10 ans</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <select onChange={(e) => setDispo(e.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option value="">Disponibilité...</option>
                                            <option value="Disponible immédiat">Disponible immédiat</option>
                                            <option value="Disponible avec préavis">Disponible avec préavis</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select onChange={(e) => setContrat(e.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option value="">Contrat...</option>
                                            <option value="CDI">CDI</option>
                                            <option value="CDD">CDD</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button onClick={handleSubmit} class="btn btn-secondary">Recherche</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ResultSeach sea={results} con={tad} />
        </>
    )
}

