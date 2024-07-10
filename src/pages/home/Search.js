import React from "react";
import ResultSeach from "./ResultSearch";
import ProfilIdeal from "./ProfilIdeal";
import axios from "axios";


class Search extends React.Component {
    state={
        categorie: '',
        nationalite: '',
        exp: '',
        dispo: '',
        contrat: '',
        duree: '',
        result: []
    }

    handleSelect = (e) => {
        this.setState({
            categorie: e.target.value
        })
    }

    handlecontrat = (e) => {
        this.setState({
            contrat: e.target.value
        })
    }

    handleDuree = (e) => {
        this.setState({
            duree: e.target.value
        })
    }

    handleNation = (e) => {
        this.setState({nationalite: e.target.value})
    }

    handleExp = (e) => {
        this.setState({exp: e.target.value})
    }

    handleDispo = (e) => {
        this.setState({dispo: e.target.value})
    }

    handleSubmit = (e) => {
        axios.post(`/recherche?categorie_cv_id=${this.state.categorie}&nationalite=${this.state.nationalite}&disponibility=${this.state.dispo}&contrat=${this.state.contrat}&aExperience=${this.state.exp}&`).then(resp => {
            if(resp.status === 200){
                this.setState({
                    result: resp.data.recherche.slice(0, 7)
                })
            }
        })
    }

    render() {
        const categorie = this.props.ctg;
        let resultat;
        console.log(this.state.result.length)
        if(this.state.result.length > 0){
            resultat = (
                <>
                    <ResultSeach sea={this.state.result} con={true} />
                </>
            )
        }else{
            <div className="alert alert-warning" role="alert">
                <center>
                    <br />
                        <h3>Aucune resultat</h3>
                    <br />
                </center>
            </div>
        }
        return(
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
                                                <select onChange={this.handleSelect} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value={''} selected>Type de profil...</option>
                                                    {categorie && categorie.map(cat => {
                                                        return(
                                                            <>
                                                                <option value={cat.id}>{cat.categorie} </option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-3">
                                                <select onChange={this.handleNation} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value="">Localisation ...</option>
                                                    <option value="Madagascar">Madagascar</option>
                                                    <option value="Maurice">Maurice</option>
                                                    <option value="Autre resident">Autre resident</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <select onChange={this.handleExp} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
                                                <select onChange={this.handleDispo} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value="">Disponibilité...</option>
                                                    <option value="Disponible immédiat">Disponible immédiat</option>
                                                    <option value="Disponible avec préavis">Disponible avec préavis</option>
                                                </select>
                                            </div> 
                                            <div className="col">
                                                <select onChange={this.handlecontrat} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value="">Contrat...</option>
                                                    <option value="CDI">CDI</option>
                                                    <option value="CDD">CDD</option>
                                                </select>
                                            </div>  
                                            <div className="col">
                                                <button onClick={this.handleSubmit} class="btn btn-secondary">Recherche</button>
                                            </div>                                        
                                        </div>
                                    {localStorage.url === 'Utilisateur' ? (
                                        <>
                                            <br/>
                                            <div className="card-title-sub">
                                                <ProfilIdeal user={this.props.user} />
                                            </div>
                                        </>    
                                    ):(<></>)}

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {resultat}
            </>
        )
    }
}

export default Search