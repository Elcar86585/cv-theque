import React, { Component } from "react";
import ResultSearch from "./ResultSearch";
import ProfilIdeal from "./ProfilIdeal";
import axios from "axios";

class Search extends Component {
    state = {
        categorie: '',
        nationalite: '',
        exp: '',
        dispo: '',
        contrat: '',
        duree: '',
        result: [],
        searched: false // Nouvelle propriété pour suivre l'état de recherche
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { categorie, nationalite, dispo, contrat, exp } = this.state;
        axios.post(`/recherche?categorie_cv_id=${categorie}&nationalite=${nationalite}&disponibility=${dispo}&contrat=${contrat}&aExperience=${exp}`)
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({
                        result: resp.data.recherche.slice(0, 7),
                        searched: true // Mise à jour de l'état après la recherche
                    });
                }
            });
    };

    render() {
        const { ctg: categories } = this.props;
        const { result, searched } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-md-12 col-lg-12 d-flex">
                        <div className="card mb-grid w-100">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="card-title mb-0">Rechercher un profil</h5>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-3">
                                            <select name="categorie" onChange={this.handleChange} className="custom-select mr-sm-2">
                                                <option value="">Type de profil...</option>
                                                {categories && categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.categorie}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <select name="nationalite" onChange={this.handleChange} className="custom-select mr-sm-2">
                                                <option value="">Localisation ...</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Maurice">Maurice</option>
                                                <option value="Autre resident">Autre resident</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select name="exp" onChange={this.handleChange} className="custom-select mr-sm-2">
                                                <option value="">Experience...</option>
                                                <option value="1 an">1 an</option>
                                                <option value="2 ans">2 ans</option>
                                                <option value="3 ans">3 ans</option>
                                                <option value="4 ans">4 ans</option>
                                                <option value="5 ans">5 ans</option>
                                                <option value="%2B%20de%205%20ans">+ de 5 ans</option>
                                                <option value="%2B%20de%2010%20ans">+ de 10 ans</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <select name="dispo" onChange={this.handleChange} className="custom-select mr-sm-2">
                                                <option value="">Disponibilité...</option>
                                                <option value="Disponible immediat">Disponible immédiat</option>
                                                <option value="Disponible avec préavis">Disponible avec préavis</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select name="contrat" onChange={this.handleChange} className="custom-select mr-sm-2">
                                                <option value="">Contrat...</option>
                                                <option value="CDI">CDI</option>
                                                <option value="CDD">CDD</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <button type="submit" className="btn btn-secondary">Recherche</button>
                                        </div>
                                    </div>
                                </form>
                                {/* {localStorage.url === 'Utilisateur' && (
                                    <div className="card-title-sub">
                                        <ProfilIdeal user={this.props.user} />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
                {searched && result.length === 0 && (
                    <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                        <span className="text-center"><strong>Aucune résultat</strong> Pas de profil trouver ...</span> 
                        {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                )}
                {result.length > 0 && (
                    <ResultSearch sea={result} con={true} />
                )}
            </>
        );
    }
}

export default Search;