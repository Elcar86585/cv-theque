import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemandeLoginNotification from "./DemandeLoginNotification";
import EntretienNotification from "./EntretienNotification";
import axios from "axios";
import { Tabs, Tab } from 'react-bootstrap';
import MisenFavoris from "../MisenFavoris";


export default class Notification extends React.Component {
    state = {
        entretien: '',
        login: '',
        favoris: []
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
            }
        }).catch(error => console.log(error))
    }
    
    render() {
        const favoriCounter = this.state.favoris.length
        const entretienCouter = this.state.entretien.length
        const loginCounter = this.state.login.length
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
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
            </>
        )
    }
}