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
        const compareLink =  window.location.pathname === `/utilisateurs`
        let actdivLink;
        if(window.location.pathname === window.location.href) {
            actdivLink = "sidebar-nav-link active"
        }else {
            actdivLink = "sidebar-nav-link"
        }
        let userMenu;
        if(localStorage.user_token){
            if(utilisateur.role === 'Administrateur') {
                userMenu = (
                    <>
                        <li className="sidebar-nav-item">
                            <li className="sidebar-nav-item">
                                <Link to="/utilisateurs" 
                                    className={window.location.pathname === `/utilisateurs` ? "sidebar-nav-link active" : "sidebar-nav-link"}
                                >
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} className="bi bi-person-circle"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Utilisateurs
                                </span>
                                </Link>
                            </li>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/categories" className={actdivLink} actived>
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} className="bi bi-list-task"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Liste des Categories
                            </span>
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/table" className={actdivLink} actived>
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} className="bi bi-file-earmark-person-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Candidat
                                </span>
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/notifications" className={actdivLink}>
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} className="bi bi-bell-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Notifications
                                </span>
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link to="/cv" className={actdivLink}>
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} className="bi bi-file-earmark-richtext-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Tous les CV
                                </span>
                            </Link>
                        </li>
                        {/* {cate && cate.map(categorie => {
                            return (
                                <>
                                    <li className="sidebar-nav-item">
                                        <Link to={`/candidats/${categorie.id}`} className={actdivLink}>
                                            <div className="sidebar-nav-icon">
                                                <i style={{'fontSize': '20px'}} className="bi bi-caret-right-fill"></i>
                                            </div>
                                            <span className="sidebar-nav-name">
                                                {categorie.categorie}
                                            </span>
                                        </Link>
                                    </li>
                                </>
                            )
                        })}  */}
                    </>
                )
            }else {
                userMenu = (
                    <>                    
                        <li className="sidebar-nav-item">
                            <Link to="/profile" className={actdivLink}>
                            <span className="sidebar-nav-abbr">
                                <i style={{'fontSize': '20px'}} className="bi bi-person-fill"></i>
                            </span>
                            <span className="sidebar-nav-name">
                                Profile
                            </span>
                            </Link>
                        </li>

                        <li className="sidebar-nav-item">
                            <Link to="/notification" className={actdivLink}>
                                <span className="sidebar-nav-abbr">
                                    <i style={{'fontSize': '20px'}} className="bi bi-bell-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Notifications
                                </span>
                            </Link>
                        </li>
                        {cate && cate.map(categorie => {
                            return (
                                <>
                                    <li className="sidebar-nav-item">
                                        <Link to={`/candidats/${categorie.id}`} className={actdivLink}>
                                            <div className="sidebar-nav-icon">
                                                <i style={{'fontSize': '20px'}} className="bi bi-caret-right-fill"></i>
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
                            <a href="/" className={actdivLink} actived>
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
                        {localStorage.user_token ? (
                            <>
                                <li className="sidebar-nav-item">
                                    <a href="#" className={actdivLink}>
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
                                    <a href="/formulaire" className={actdivLink}>
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
                                    <a href="/ajoute-candidat" className={actdivLink}>
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
                                    <a href="/se-connecter" className={actdivLink}>
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