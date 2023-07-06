import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemandeLoginNotification from "./DemandeLoginNotification";
import EntretienNotification from "./EntretienNotification";
import axios from "axios";


export default class Notification extends React.Component {
    state={
        onglet: 'DL',
        entretien: '',
        login: ''
    }

    componentDidMount = () => {
        this.getEntretien();
        this.getLogin();
    }

    getEntretien = () => {
        axios.get('entretiens').then(resp => {
            if(resp.status === 200){
                this.setState({entretien: resp.data})
            }
        })
    }

    getLogin = () => {
        axios.get('demand_logins').then(resp => {
            if(resp.status === 200){
                this.setState({login: resp.data})
            }
        })
    }

    handleClickDE = () => {
        this.setState({
            onglet: 'DE'
        }) 
    }

    handleClickDL = () => {
        this.setState({
            onglet:'DL'
        })
    }
    render() {
        const entretienCouter = this.state.entretien.length
        const loginCounter = this.state.login.length
    return (
        <>
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div class="main-body p-0">
                        <div class="inner-wrapper">
                            <div class="inner-sidebar">
                                <div class="inner-sidebar-body p-0">
                                    <div class="p-3 h-100" data-simplebar="init">
                                        <div class="simplebar-wrapper" style={{ "margin": -"16px" }}>
                                            <div class="simplebar-height-auto-observer-wrapper">
                                                <div class="simplebar-height-auto-observer">
                                                </div>
                                            </div>
                                            <div class="simplebar-mask">
                                                <div class="simplebar-offset" style={{ "right": "0px", "bottom": "0px" }}>
                                                    <div class="simplebar-content-wrapper" style={{ "height": "100%", "overflow": "hidden scroll" }}>
                                                        <div class="simplebar-content" style={{ "padding": "16px" }}>
                                                            <nav class="nav nav-pills nav-gap-y-1 flex-column">
                                                                <Link class="nav-link nav-link-faded has-icon"
                                                                    onClick={this.handleClickDL}
                                                                >
                                                                    Demande de login ({loginCounter})
                                                                </Link>
                                                                <Link class="nav-link nav-link-faded has-icon"
                                                                    onClick={this.handleClickDE}
                                                                >
                                                                    Demande d'entretien ({entretienCouter})
                                                                </Link>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="simplebar-placeholder" style={{ "width": "234px", "height": "292px" }}></div>
                                        </div>
                                        <div class="simplebar-track simplebar-horizontal" style={{ "visibility": "hidden" }}><div class="simplebar-scrollbar" style={{ "width": "0px", "display": "none" }}></div></div>
                                        <div class="simplebar-track simplebar-vertical" style={{ "visibility": "visible" }}><div class="simplebar-scrollbar" style={{ "height": "151px", "display": "block", "transform": "translate3d(0px, 0px, 0px)" }}></div></div>
                                    </div>
                                </div>
                            </div>

                            <div class="inner-main">
                                <div class="inner-main-body p-2 p-sm-3 collapse forum-content show">
                                    {this.state.onglet === 'DL' ? (
                                        <DemandeLoginNotification login={this.state.login} fun={this.getLogin} />
                                    ) : (
                                        <EntretienNotification demande={this.state.entretien} fon={this.componentDidMount} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}
}