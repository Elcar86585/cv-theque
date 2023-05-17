import React from "react";
import ResultSeach from "./ResultSearch";


class Search extends React.Component {
    state={
        categorie: '',
        nationalite: '',
        exp: '',
        dispo: ''
    }

    handleSelect = (e) => {
        this.setState({
            categorie: e.target.value
        })
    }

    handleNation = (e) => {
        console.log(e.target.value)
        this.setState({nationalite: e.target.value})
    }

    handleExp = (e) => {
        this.setState({exp: e.target.value})
    }

    handleDispo = (e) => {
        this.setState({dispo: e.target.value})
    }

    render() {
        const categorie = this.props.ctg;
        let resultat;
        if(this.state.categorie){
            resultat = (
                <>
                    <ResultSeach catego={this.state.categorie} sea={this.state} />
                </>
            )
        }
        return(
            <>
                <div className="row">
                    <div className="col-md-12 col-lg-12 d-flex">
                        <div className="card mb-grid w-100">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between mb-3">
                                <h5 className="card-title mb-0">
                                    Recherche de profil
                                </h5>   

                                    <div className="card-title-sub">
                                        Trouvez le profil idéal 
                                    </div>
                                </div>

                                <div>
                                    <form>
                                        <div className="form-row">
                                            <div className="col-4">
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
                                            <div className="col">
                                                <select onChange={this.handleNation} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value="">Nationalité...</option>
                                                    <option value="Malgache">Malgache</option>
                                                    <option value="Mauricen">Mauricien</option>
                                                    <option value="Autre resident Madagascar">Autre resident Madagascar</option>
                                                    <option value="Autre resident Maurice">Autre resident Maurice</option>
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
                                            <div className="col">
                                                <select onChange={this.handleDispo} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                    <option value="">Disponibilité...</option>
                                                    <option value="Disponible immédiat">Disponible immédiat</option>
                                                    <option value="Temps partiel">Temps partiel</option>
                                                    <option value="Temps plein">Temps plein</option>
                                                    <option value="Freelance">Freelance</option>
                                                    <option value="Ouvert à toutes proposition">Ouvert à toutes proposition</option>
                                                </select>
                                            </div>                                       
                                        </div>
                                    </form>
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