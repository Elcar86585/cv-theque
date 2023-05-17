import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Navebarmenu extends React.Component {
    state={
        notificationCounter: '',
        search: ''
    }

    componentDidMount = () => {
        if(sessionStorage.url === 'Administrateur'){
            axios.get('notify').then(resp => {
                this.setState({
                    notificationCounter: resp.data
                })
            })
        }
    }


    handleClick = () => {
        sessionStorage.clear();
        localStorage.clear(window.location.reload())
        window.location.replace('/')
    }

    handleChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        let button;
        let notify;
        if(sessionStorage.user_token){
            if(sessionStorage.url === 'Administrateur'){
                notify=(
                    <>
                         <li>
                            <Link class="position-relative" to="/notifications">
                                <i class="bi bi-bell-fill" style={{"fontSize": "25px"}} ></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {this.state.notificationCounter}
                                </span>
                            </Link>
                        </li>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                )
            }
            button = (
                <>
                    <button onClick={this.handleClick} class="btn btn-sm btn-danger">Se deconnecter</button>
                </>
            )
        }else{
            button = (
                <>
                    <Link to="/se-connecter">
                        <button class="btn btn-sm btn-secondary">Se connecter </button>
                    </Link>
                </>
            )
        }
        return (
            <>
                <nav className="navbar navbar-expand justify-content-between fixed-top">
                        <a className="navbar-brand mb-0 h1 d-none d-md-block" href="/">
                        <img src="https://www.activsolution.fr/superawesome/2022/11/logo-activ-solution-250.png" className="navbar-brand-image d-inline-block align-top mr-2" alt=""/>
                            CV theque Activ Solution Océan Indien
                        </a>

                        <div  className="form-inline form-quicksearch d-none d-md-block mx-auto">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-icon">
                                    <span class="oi oi-magnifying-glass" style={{"paddingTop": "8px"}} ></span>
                                </div>
                                </div>
                                <input type="number" onChange={this.handleChange} className="form-control" placeholder="Chercher par ID ..."/>
                            </div>
                        </div>

                        <div className="d-flex flex-1 d-block d-md-none">
                        <a href="#" className="sidebar-toggle ml-3">
                            <i data-feather="menu"></i>
                        </a>
                        </div>

                    <ul className="navbar-nav d-flex justify-content-end mr-2">
                        {notify}
                        <li>
                            {sessionStorage.user_token ? (<></>):(
                                <>
                                <Link to="/ajoute-candidat">
                                    <button class="btn btn-sm btn-primary">Ajouter un CV </button>
                                </Link>
                                </>
                            )}
                        </li>
                        &nbsp;&nbsp;
                        <li>
                            {button}
                        </li>
                        &nbsp;&nbsp;
                        
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navebarmenu;