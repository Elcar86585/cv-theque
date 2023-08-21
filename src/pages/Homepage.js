import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import CategorieCount from "./componentsHomepage/CategorieCount";
import Cards from "./home/Cards";
import Search from "./home/Search";
import CardsAdmin from "./home/CardsAdmin";
import CandidatRecent from "./home/CandidatRecent";
import SousCategorieCounter from "./componentsHomepage/SousCategorieCounter";
import RecentIdealProfil from "./home/RecentIdealProfil";

class Homepage extends React.Component {
    state = {
        categories: [],
        sousCategories: []
    }

    componentDidMount = () => {
        this.getCategorie();
        this.getSousCategorie();
    }

    getCategorie = () => {
        axios.get('categorie_cvs').then(resp => {
            if (resp.status === 200) {
                this.setState({
                    categories: resp.data
                })
            }
        }).catch(error => console.log(error))
    }

    getSousCategorie = () => {
        axios.get('sous_categories').then(resp => {
            if(resp.status === 200){
                this.setState({
                    sousCategories: resp.data
                })
            }
        })
    }
    render() {
        const sousCat = this.state.sousCategories
        const user = this.props.user
        const categories = this.state.categories;
        let cards;
        let idealProf;
        if (user.role === 'Administrateur') {
            cards = (
                <CardsAdmin />       
            )
            idealProf = (
                <div className="card">
                    <div className="card-header">
                        Je ne trouve pas mon profil ideal
                    </div>
                    <RecentIdealProfil use={user} />
                </div>
            )
        } else {
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
                            <Search ctg={categories} user={user} />
                            {cards}
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title">List </div>

                                        </div>
                                        <div className="card-body collapse show" id="card1">
                                            <table className="table table-actions table-striped table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th scope="col">Categorie</th>
                                                        <th scope="col">Nombre de CV</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories && categories.map(categorie => {
                                                        let actionButton;
                                                        if (localStorage.user_token) {
                                                            if (user.role === 'Administrateur') {
                                                                actionButton = (
                                                                    <>
                                                                        <Link to={`/categorie/${categorie.id}`}><button className="btn btn-sm btn-secondary">Détail</button></Link>
                                                                    </>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td><strong>{categorie.categorie}</strong> </td>
                                                                    <td>
                                                                        <h5><CategorieCount data={categorie.id} /></h5>
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/candidats/${categorie.id}`} ><button className="btn btn-sm btn-primary" >Voir tous les CV</button></Link>&nbsp;
                                                                        {actionButton}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                    {sousCat && sousCat.map(sc => {
                                                        let button;
                                                        if (localStorage.user_token) {
                                                            if (user.role === 'Administrateur') {
                                                                button = (
                                                                    <>
                                                                        <Link to={`/categorie/${sc.categorie_cv_id}`}><button className="btn btn-sm btn-secondary">Détail</button></Link>
                                                                    </>
                                                                )
                                                            }
                                                        }
                                                        return(
                                                            <tr>
                                                                <td><strong>{sc.categorie}</strong> </td>
                                                                <td>
                                                                    <h5>
                                                                        <SousCategorieCounter data={sc.id}/>
                                                                    </h5>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/souscategorie/${sc.id}`} ><button className="btn btn-sm btn-primary" >Voir tous les CV</button></Link>&nbsp;
                                                                    {button}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            Candidat recent
                                        </div>
                                        <CandidatRecent use={user} />
                                    </div>
                                    {idealProf}
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