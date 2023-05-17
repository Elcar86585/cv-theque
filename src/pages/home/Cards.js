import React from 'react';
import { Link } from 'react-router-dom';

class Cards extends React.Component {
    render() {
        const user = this.props.usr
        let salutation;
        if(sessionStorage.user_token){
            salutation = (
                <>{user.name}</>
            )
        }else{
            salutation = (
                <Link to="/se-connecter" >Connecter vous</Link>
            )
        }
        return(
            <>
                <div className="row">
                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card mb-grid w-100">
                        <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between mb-3">
                            <h5 className="card-title mb-0">
                                Utilisateurs
                            </h5>

                            <div className="card-title-sub">
                                50
                            </div>
                            </div>

                            <div className="progress mt-auto">
                            <div className="progress-bar" role="progressbar" style={{"width": "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">3/4</div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card mb-grid w-100">
                        <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between mb-3">
                            <h5 className="card-title mb-0">
                                Candidat indisponible
                            </h5>

                            <div className="card-title-sub">
                                150
                            </div>
                            </div>

                            <div className="progress mt-auto">
                            <div className="progress-bar" role="progressbar" style={{"width": "60%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-primary text-white text-center mb-grid w-100">
                        <div className="d-flex flex-row align-items-center h-100">
                            <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                <span style={{"fontSize": "50px"}} class="oi oi-person"></span>
                            </div>
                            <div className="card-body">
                            <div className="card-info-title">Demande de login</div>
                            <h3 className="card-title mb-0">
                               <Link style={{"color": "#fff"}} to="/formulaire" > Formulaire </Link>
                            </h3>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-success text-white text-center mb-grid w-100">
                        <div className="d-flex flex-row align-items-center h-100">
                            <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                <i style={{"fontSize": "50px"}} class="bi bi-door-open-fill"></i>
                            </div>
                            <div className="card-body">
                            <div className="card-info-title">Bonjour !</div>
                            <h3 className="card-title mb-0">
                                {salutation}
                            </h3>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Cards;