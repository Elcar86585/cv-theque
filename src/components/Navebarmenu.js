import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import favicon from '../images/favicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';

class NavbarMenu extends Component {
    state = {
        notificationCounter: 0,
        entretienCount: 0
    };

    async componentDidMount() {
        if (localStorage.url === 'Administrateur') {
            try {
                const [notifyResponse, entretienResponse] = await Promise.all([
                    axios.get('notify'),
                    axios.get('entretienCounter')
                ]);
                this.setState({
                    notificationCounter: notifyResponse.data,
                    entretienCount: entretienResponse.data
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.replace('/cvtheque');
    }

    render() {
        const { user } = this.props;
        const { notificationCounter, entretienCount } = this.state;
        const notificationTotal = notificationCounter + entretienCount;

        const notificationBadge = notificationTotal !== 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {notificationTotal}
            </span>
        );

        const adminNotification = localStorage.user_token && user.role === 'Administrateur' && (
            <li>
                <Link className="position-relative" to="/notifications">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                    {notificationBadge}
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </li>
        );

        const loginButton = localStorage.user_token ? (
            <button onClick={this.handleLogout} className="btn btn-sm btn-danger">Se déconnecter</button>
        ) : (
            <Link to="/se-connecter">
                <button className="btn btn-sm btn-secondary">Se connecter</button>
            </Link>
        );

        return (
            <nav className="navbar navbar-expand justify-content-between fixed-top">
                <a className="navbar-brand mb-0 h1 d-none d-md-block" href="/cvtheque">
                    <img src={favicon} className="navbar-brand-image d-inline-block align-top mr-2" alt="" />
                    CVthèque Activ Solution Océan Indien
                </a>
                {localStorage.user_token && (
                    <div className="mx-auto">
                        <div className="inputs mx-auto">
                            <span>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                            </span>
                            <form>
                                <input
                                    onChange={(e) => this.props.fonction(e)}
                                    type="search"
                                    className="form-control"
                                    placeholder="Recherche de profil ..."
                                />
                            </form>
                        </div>
                    </div>
                )}

                <div className="d-flex flex-1 d-block d-md-none">
                    <a href="#" className="sidebar-toggle ml-3">
                        <i data-feather="menu"></i>
                    </a>
                </div>

                <ul className="navbar-nav d-flex justify-content-end mr-2">
                    {adminNotification}
                    <li>
                        {user.role === 'Administrateur' && (
                            <Link to="/ajoute-candidat">
                                <button className="btn btn-sm btn-primary">Ajouter un CV</button>
                            </Link>
                        )}
                    </li>
                    &nbsp;&nbsp;
                    <li>
                        {loginButton}
                    </li>
                    &nbsp;&nbsp;
                </ul>
            </nav>
        );
    }
}

export default NavbarMenu;