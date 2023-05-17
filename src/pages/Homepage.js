import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import CategorieCount from "./componentsHomepage/CategorieCount";
import Cards from "./home/Cards";
import Search from "./home/Search";
import CardsAdmin from "./home/CardsAdmin";
import IdSearch from "./home/IdSearch";
import CandidatRecent from "./home/CandidatRecent";

class Homepage extends React.Component {
    state={
        categories: []
    }

    componentDidMount = () => {
        this.getCategorie();
    }

    getCategorie = () => {
        axios.get('categorie_cvs').then(resp => {
            if(resp.status === 200){
                this.setState({
                    categories: resp.data
                })
            }
        })
    }
    render() {
        const user = this.props.user
        const categories = this.state.categories;
        let actionButton;
        if(sessionStorage.user_token){
            if(user.role === 'Administrateur'){
                actionButton = (
                    <>
                        <button className="btn btn-sm btn-secondary">Editer</button>&nbsp;
                        <button className="btn btn-sm btn-danger">Delete</button>
                    </>
                )
            }
        }

        let cards;
        if(sessionStorage.url === 'Admininstrateur'){
            cards = (
                <CardsAdmin />
            )
        }else{
            cards = (
                <Cards usr={user} />
            )
        }
        return (
            <>
                <div className="adminx-content">

                    <div className="adminx-main-content">
                        <div className="container-fluid">
                        
                            <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb adminx-page-breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Accueil</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Tableau de bord</li>
                            </ol>
                            </nav>

                            <div className="pb-3">
                            <h1>Tableau de bord</h1>
                            </div>
                            {/* <IdSearch /> */}
                            <Search ctg={categories} />
                            {cards}

                            <div className="row">
                            <div className="col-lg-8">
                                <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-header-title">Categorie recent</div>
                                    
                                </div>
                                <div className="card-body collapse show" id="card1">
                                    <table className="table table-actions table-striped table-hover mb-0">
                                        <thead>
                                            <tr>
                                            <th scope="col">
                                                <label className="custom-control custom-checkbox m-0 p-0">
                                                <input type="checkbox" className="custom-control-input table-select-all"/>
                                                <span className="custom-control-indicator"></span>
                                                </label>
                                            </th>
                                            <th scope="col">Index</th>
                                            <th scope="col">Categorie</th>
                                            <th scope="col">Nombre de CV</th>
                                            <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories && categories.map(categorie => {
                                               
                                                return (
                                                    <>
                                                        <tr>
                                                            <th scope="row">
                                                                <label className="custom-control custom-checkbox m-0 p-0">
                                                                <input type="checkbox" className="custom-control-input table-select-row"/>
                                                                <span className="custom-control-indicator"></span>
                                                                </label>
                                                            </th>
                                                            <td>
                                                                {categorie.id}
                                                            </td>
                                                            <td>{categorie.categorie} </td>
                                                            <td>
                                                                <CategorieCount data={categorie.id} />
                                                            </td>
                                                            
                                                            <td>
                                                                <Link to={`/candidats/${categorie.id}`} ><button className="btn btn-sm btn-primary" >Voir tous les CV</button></Link>&nbsp;
                                                                {actionButton}
                                                            </td>
                                                            
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <br/>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                <div className="card-header">
                                    Candidat recent
                                </div>
                                    <CandidatRecent />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Homepage;