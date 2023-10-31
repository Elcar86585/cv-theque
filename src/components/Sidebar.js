import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Sidebar extends React.Component {
    state = {
        categories: []
    }

    componentDidMount = () => {
        this.getCategorie();
    }

    getCategorie = () => {
        axios.get('categorie_cvs').then(resp => {
            if (resp.status === 200) {
                this.setState({
                    categories: resp.data
                })
            }
        })
    }

    handleClickDecon = () => {
        localStorage.clear();
        localStorage.clear(window.location.reload())
        window.location.replace('/cvtheque')
    }

    render() {
        const utilisateur = this.props.user
        const cate = this.state.categories
        const compareLink = window.location.pathname === `/utilisateurs`
        
        let userMenu;
        if (localStorage.user_token) {
            if (utilisateur.role === 'Administrateur') {
                userMenu = (
                    <>
                        <li className="sidebar-nav-item">
                            <li className="sidebar-nav-item">
                                <NavLink to="/utilisateurs"
                                    className="sidebar-nav-link"
                                >
                                    <span className="sidebar-nav-abbr">
                                        <i style={{ 'fontSize': '20px' }} className="bi bi-person-circle"></i>
                                    </span>
                                    <span className="sidebar-nav-name">
                                        Utilisateurs
                                    </span>
                                </NavLink>
                            </li>
                        </li>
                        <li className="sidebar-nav-item">
                            <NavLink to="/categories" className="sidebar-nav-link" actived>
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-list-task"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Liste des Categories
                                </span>
                            </NavLink>
                        </li>
                        <li className="sidebar-nav-item">
                            <NavLink to="/table" className="sidebar-nav-link" actived>
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-file-earmark-person-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Candidat
                                </span>
                            </NavLink>
                        </li>
                        <li className="sidebar-nav-item">
                            <NavLink to="/notifications" className="sidebar-nav-link">
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-bell-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Notifications
                                </span>
                            </NavLink>
                        </li>
                        <li className="sidebar-nav-item">
                            <NavLink to="/cv" className="sidebar-nav-link">
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-file-earmark-richtext-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Tous les CV
                                </span>
                            </NavLink>
                        </li>
                    </>
                )
            } else {
                userMenu = (
                    <>
                        <li className="sidebar-nav-item">
                            <NavLink to="/profile" className="sidebar-nav-link">
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-person-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Profile
                                </span>
                            </NavLink>
                        </li>

                        <li className="sidebar-nav-item">
                            <NavLink to="/notification" className="sidebar-nav-link">
                                <span className="sidebar-nav-abbr">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-bell-fill"></i>
                                </span>
                                <span className="sidebar-nav-name">
                                    Notifications
                                </span>
                            </NavLink>
                        </li>
                        {cate && cate.map(categorie => {
                            return (
                                <>
                                    <li className="sidebar-nav-item">
                                        <NavLink to={`/candidats/${categorie.id}`} className="sidebar-nav-link" data-toggle="collapse" href="#navTables" aria-expanded="false" aria-controls="navTables">
                                            <div className="sidebar-nav-icon">
                                                <i style={{ 'fontSize': '20px' }} className="bi bi-folder-fill"></i>
                                            </div>
                                            <span className="sidebar-nav-name">
                                                {categorie.categorie}
                                            </span>
                                        </NavLink>
                                        <GetSousCat datar={categorie.id} />
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
                            <NavLink to="/" className="sidebar-nav-link">
                                <div className="sidebar-nav-icon">
                                    <i style={{ 'fontSize': '20px' }} className="bi bi-house"></i>
                                </div>
                                <span className="sidebar-nav-name">
                                    Tableau de bord
                                </span>
                                <span className="sidebar-nav-end">

                                </span>
                            </NavLink>
                        </li>
                        {userMenu}
                        {localStorage.user_token ? (
                            <>
                                <li className="sidebar-nav-item">
                                    <a href="#" className="sidebar-nav-link" onClick={this.handleClickDecon}>
                                        <div className="sidebar-nav-icon">
                                            <i style={{ 'fontSize': '20px' }} className="bi bi-box-arrow-right"></i>
                                        </div>
                                        <span className="sidebar-nav-name">
                                            Deconnexion
                                        </span>
                                        <span className="sidebar-nav-end">

                                        </span>
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </ul>
                </div>
            </>
        )
    }

}


function GetSousCat({datar}) {
    const [sousCat, setSousCat] = useState([]);
    useEffect(() => {
        if(datar){
            axios.get(`categorie_cvs/${datar}`).then(reps => {
                setSousCat(reps.data.sousCategorie)
            }).catch(error => console.log(error))
        }
    }, [datar])

    if(sousCat.length > 0){
        return (
            <>
                <ul class="sidebar-nav">
                    {sousCat && sousCat.map(sc => {
                        return(
                            <>
                                <li class="sidebar-nav-item">
                                    <Link to={`/souscategorie/${sc.id}`} class="sidebar-nav-link">
                                        <span class="sidebar-nav-abbr">
                                            <i class="bi bi-grid-fill"></i>
                                        </span>
                                        <span class="sidebar-nav-name">
                                            {sc.categorie}
                                        </span>
                                    </Link>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </>
        )
    }
}