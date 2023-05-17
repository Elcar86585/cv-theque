import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Sidebar extends React.Component {
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
        const utilisateur = this.props.user
        const cate = this.state.categories
        let userMenu;
        if(sessionStorage.user_token){
            if(utilisateur.role === 'Administrateur') {
                userMenu = (
                    <>
                        <li className="sidebar-nav-item">
                            <li className="sidebar-nav-item">
                                <Link to="/utilisateurs" className="sidebar-nav-link">
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} class="bi bi-person-circle"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Utilisateurs
                                </span>
                                </Link>
                            </li>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/categories" className="sidebar-nav-link">
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} class="bi bi-list-task"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Liste des Categories
                            </span>
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/notifications" className="sidebar-nav-link">
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} class="bi bi-bell-fill"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Notifications
                            </span>
                            </Link>
                        </li>
                    </>
                )
            }else {
                userMenu = (
                    <>                    
                        <li className="sidebar-nav-item">
                            <Link to="/profile" className="sidebar-nav-link">
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} class="bi bi-person-fill"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Profile
                            </span>
                            </Link>
                        </li>

                        <li className="sidebar-nav-item">
                            <a href="#" className="sidebar-nav-link">
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} class="bi bi-gear-fill"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Reglage
                            </span>
                            </a>
                        </li> 
                        {cate && cate.map(categorie => {
                                return (
                                    <>
                                        <li className="sidebar-nav-item">
                                            <Link to={`/candidats/${categorie.id}`} className="sidebar-nav-link">
                                                <div className="sidebar-nav-icon">
                                                    <i style={{'fontSize': '20px'}} class="bi bi-caret-right-fill"></i>
                                                </div>
                                                <span className="sidebar-nav-name">
                                                    {categorie.categorie}
                                                </span>
                                            </Link>
                                        </li>
                                    </>
                                )
                        })}  
                </>
                )
            }
        }

        return (
            <>
                <div className="adminx-sidebar expand-hover push">
                    <ul className="sidebar-nav">
                        <li className="sidebar-nav-item">
                            <a href="/" className="sidebar-nav-link active">
                            <div className="sidebar-nav-icon">
                            <i style={{'fontSize': '20px'}} className="bi bi-house"></i>
                            </div>
                            <span className="sidebar-nav-name">
                                Tableau de bord
                            </span>
                            <span className="sidebar-nav-end">

                            </span>
                            </a>
                        </li>
                        {userMenu}  
                        {sessionStorage.user_token ? (
                            <>
                                <li className="sidebar-nav-item">
                                    <a href="#" className="sidebar-nav-link">
                                    <div className="sidebar-nav-icon">
                                    <i style={{'fontSize': '20px'}} className="bi bi-box-arrow-right"></i>
                                    </div>
                                    <span className="sidebar-nav-name">
                                        Deconnexion
                                    </span>
                                    <span className="sidebar-nav-end">

                                    </span>
                                    </a>
                                </li>
                            </>
                        ):(
                            <>
                                <li className="sidebar-nav-item">
                                    <a href="/formulaire" className="sidebar-nav-link">
                                    <div className="sidebar-nav-icon">
                                    <i style={{'fontSize': '20px'}} className="bi bi-box-arrow-right"></i>
                                    </div>
                                    <span className="sidebar-nav-name">
                                        Demande de login
                                    </span>
                                    <span className="sidebar-nav-end">

                                    </span>
                                    </a>
                                </li>  
                                <li className="sidebar-nav-item">
                                    <a href="/ajoute-candidat" className="sidebar-nav-link">
                                    <div className="sidebar-nav-icon">
                                    <i style={{'fontSize': '20px'}} className="bi bi-file-earmark-person"></i>
                                    </div>
                                    <span className="sidebar-nav-name">
                                        Ajouter un CV
                                    </span>
                                    <span className="sidebar-nav-end">

                                    </span>
                                    </a>
                                </li>
                                <li className="sidebar-nav-item">
                                    <a href="/se-connecter" className="sidebar-nav-link">
                                    <div className="sidebar-nav-icon">
                                    <i style={{'fontSize': '20px'}} className="bi bi-person-fill-check"></i>
                                    </div>
                                    <span className="sidebar-nav-name">
                                        Se connecter
                                    </span>
                                    <span className="sidebar-nav-end">

                                    </span>
                                    </a>
                                </li>      
                            </>
                        )}                                   
                    </ul>
                </div>
            </>
        )
    }

}

export default Sidebar;