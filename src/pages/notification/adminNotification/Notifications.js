import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemandeLoginNotification from "./DemandeLoginNotification";
import EntretienNotification from "./EntretienNotification";
import axios from "axios";
import { Tabs, Tab } from 'react-bootstrap';
import MisenFavoris from "../MisenFavoris";
import Loader from "../../../Loader";


export default class Notification extends React.Component {
    state = {
        entretien: '',
        login: '',
        favoris: [],
        loader: true
    }

    componentDidMount = () => {
        this.getEntretien();
        this.getLogin();
        this.getFavoris();
    }

    getEntretien = () => {
        axios.get('entretiens').then(resp => {
            if (resp.status === 200) {
                this.setState({ entretien: resp.data })
            }
        }).catch(error => console.log(error))
    }

    getLogin = () => {
        axios.get('demand_logins').then(resp => {
            if (resp.status === 200) {
                this.setState({ login: resp.data })
            }
        }).catch(error => console.log(error))
    }

    getFavoris = () => {
        axios.get('favorites').then(resp => {
            if(resp.status === 200){
                this.setState({
                    favoris: resp.data
                })

                setTimeout(() => {this.setState({loader: false})}, 4000)
            }
        }).catch(error => console.log(error))
    }
    
    render() {
        const favoriCounter = this.state.favoris.length
        const entretienCouter = this.state.entretien.length
        const loginCounter = this.state.login.length

        if(this.state.loader === true){
            return <Loader />
        }
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb" role="navigation">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Tableu de bord</a></li>
                                    <li className="breadcrumb-item"><a href="#">Notification</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Tous les notifications</li>
                                </ol>
                            </nav>

                            <div className="pb-3 d-flex justify-content-between">
                                <h3>
                                    Tous les notifications
                                </h3>
                                <button type="boutton" className="btn btn-primary btn-sm" onClick={() => window.history.back()} >
                                    <i className="bi bi-arrow-left-short"></i>
                                    Retour
                                </button>
                            </div>
                        <Tabs
                            defaultActiveKey="entretien"
                            id="justify-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="entretien" title={`Demande d'entretien (${entretienCouter})`}>
                                <EntretienNotification demande={this.state.entretien} fon={this.componentDidMount} />
                            </Tab>
                            <Tab eventKey="login" title={`Demande de login (${loginCounter})`}>
                                <DemandeLoginNotification login={this.state.login} fun={this.getLogin} />
                            </Tab>
                            <Tab eventKey="favori" title={`Candidats mis en favori (${favoriCounter})`}>
                                <MisenFavoris fav={this.state.favoris} funk={this.getFavoris} />
                            </Tab>
                        </Tabs>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}