import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

class Cards extends React.Component {
    state = {
        cvall: '',
        catAll: ''
    }

    componentDidMount = () => {
        this.getCv();
        this.getCat();
    }

    getCv = () => {
        axios.get('cvall').then(resp => {
            this.setState({
                cvall: resp.data
            })
        })
    }

    getCat = () => {
        axios.get('catcounter').then(resp => {
            this.setState({
                catAll: resp.data
            })
        })
    }
    render() {
        const user = this.props.usr
        let salutation;
        if (localStorage.user_token) {
            salutation = (
                <Link to="/profile">{user.name}</Link>
            )
        } else {
            salutation = (
                <Link to="/se-connecter" >Connecter vous</Link>
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-info text-white text-center mb-grid w-100">
                            <div className="d-flex flex-row align-items-center h-100">
                                <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                    <i className="bi bi-file-earmark-person-fill" style={{ "fontSize": "50px" }}></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-info-title">
                                        Candidat disponnible <strong>+ {this.state.cvall} CV </strong>
                                    </div>
                                    <hr />
                                    <div className="card-info-title">
                                        Categorie   <strong> {this.state.catAll}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-warning text-white text-center mb-grid w-100">
                            <div className="d-flex flex-row align-items-center h-100">
                                <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                    <i className="bi bi-bell-fill" style={{ "fontSize": "50px" }}></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-info-title">Alert</div>
                                    <h3 className="card-title mb-0">
                                        <Link style={{ "color": "#fff" }} to="/notification" >Notification </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-primary text-white text-center mb-grid w-100">
                            <div className="d-flex flex-row align-items-center h-100">
                                <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                    <i className="bi bi-star-fill" style={{ "fontSize": "50px" }}></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-info-title">Favorit</div>
                                    <h3 className="card-title mb-0">
                                        <Link style={{ "color": "#fff" }} to="/favoris" > List des favorite </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex">
                        <div className="card border-0 bg-success text-white text-center mb-grid w-100">
                            <div className="d-flex flex-row align-items-center h-100">
                                <div className="card-icon d-flex align-items-center h-100 justify-content-center">
                                    <i style={{ "fontSize": "50px" }} className="bi bi-door-open-fill"></i>
                                </div>
                                <div className="card-body">
                                    <div className="card-info-title">Bonjour !</div>
                                    <div className=''>
                                        <h3 className="card-title mb-0" style={{ "fontSize": "17px" }} >
                                            {salutation}
                                        </h3>
                                    </div>
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