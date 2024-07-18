import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cards extends Component {
    state = {
        cvall: '',
        catAll: ''
    }

    componentDidMount() {
        this.fetchData('cvall', 'cvall');
        this.fetchData('catcounter', 'catAll');
    }

    fetchData = (endpoint, stateKey) => {
        axios.get(endpoint)
            .then(resp => {
                this.setState({ [stateKey]: resp.data });
            })
            .catch(error => console.error(`Error fetching ${stateKey}:`, error));
    }

    render() {
        const { usr: user } = this.props;
        const { cvall, catAll } = this.state;

        const salutation = localStorage.user_token ? (
            <Link to="/profile">{user.name}</Link>
        ) : (
            <Link to="/se-connecter">Connectez-vous</Link>
        );

        return (
            <div className="row">
                <Card
                    className="bg-success"
                    icon="bi bi-door-open-fill"
                    title="Bonjour !"
                    content={<h3 className="card-title mb-0" style={{ fontSize: "17px", color: "#fff"}}>{salutation}</h3>}
                />
                <Card
                    className="bg-info"
                    icon="bi bi-file-earmark-person-fill"
                    title="Candidat disponible"
                    content={
                        <>
                            {cvall ? (
                                <strong>+ {cvall} CV</strong>
                            ) : (
                                <span>Chargement des CV...</span>
                            )}
                            <hr />
                            {catAll ? (
                                <strong>{catAll.count} Catégorie</strong>
                            ) : (
                                <span>Chargement des catégories...</span>
                            )}
                        </>
                    }
                />
                <Card
                    className="bg-warning"
                    icon="bi bi-bell-fill"
                    title="Alerte"
                    content={<Link style={{ color: "#fff" }} to="/notification">Notification</Link>}
                />
                <Card
                    className="bg-primary"
                    icon="bi bi-star-fill"
                    title="Favoris"
                    content={<Link style={{ color: "#fff" }} to="/favoris">Liste des favoris</Link>}
                />
            </div>
        );
    }
}

const Card = ({ className, icon, title, content }) => (
    <div className="col-md-6 col-lg-3 d-flex">
        <div className={`card border-0 ${className} text-white text-center mb-grid w-100`}>
            <div className="d-flex flex-row align-items-center h-100">
                <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                    <i className={icon} style={{ fontSize: "50px" }}></i>
                </div>
                <div className="card-body">
                    <div className="card-info-title">{title}</div>
                    <div className="card-content">{content}</div>
                </div>
            </div>
        </div>
    </div>
);

export default Cards;
