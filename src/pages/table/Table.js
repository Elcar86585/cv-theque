import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap'
import Mailing from "./Mailing";
import Telephonique from "./Telephonique";
import SocialNet from "./SocialNet";
import Notified from "./Notified";

class Table extends React.Component {
    state = {
        categorie: [],
        ongle: 'one',
        cvall: [],
        selectAllMail: false,
        alltelephone: false, 
        allSocial: false,
        email: [],
        e_mail: ''
    }

    componentDidMount = () => {
        this.getCategorie();
        this.getCv();
    }

    getCategorie = () => {
        axios.get('categorie_cvs').then(resp => {
            if (resp.status === 200) {
                this.setState({
                    categorie: resp.data
                })
            }
        }).catch(error => console.log(error))
    }

    getCv = () => {
        axios.get('cvs').then(resp => {
            this.setState({
                cvall: resp.data
            })
        }).catch(error => console.log(error))
    }

    handleOnglet = (e) => {
        this.setState({
            ongle: e
        })
    }

    handleSelectAllMail = () => {
        if(this.state.selectAllMail === false){
            this.setState({
                selectAllMail: true
            })
        }else {
            this.setState({
                selectAllMail: false
            })
        }
    }

    handleSelectTelephone = () => {
        if(this.state.alltelephone === false){
            this.setState({
                alltelephone: true
            })
        }else {
            this.setState({
                alltelephone: false
            })
        }
    }

    handleSelectSocial = () => {
        if(this.state.allSocial === false){
            this.setState({
                allSocial: true
            })
        }else {
            this.setState({
                allSocial: false
            })
        }
    }

    handleEmail = (e) => {
        const mail = e.target.value
        const email = this.state.email.filter(item => item.email !== mail)
        
        // if(mail) {
        //     this.setState(prevState => ({
        //         email: [{mail}, ...prevState.email]
        //     }))
        // } else {
        //     this.setState(prevState => ({
        //         email: prevState.email.filter(
        //             item => item.email !== mail
        //         )
        //     }))
        // }
    }
    render() {
        const categories = this.state.categorie;
        return (
            <>
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Interface utilisateur</a></li>
                                    <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">
                                        Gestion des requêtte des profile
                                    </li>
                                </ol>
                            </nav>

                            <div className="pb-3">
                                <h1 _msttexthash="234351" _msthash="67">List des profiles</h1>
                            </div>

                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <div className="card-header-title" _msttexthash="183612" _msthash="68">Gestion des requêtte des profiles</div>
                                        </div>
                                        <div className="card-body collapse show" id="card1">

                                            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-6">
                                                        <div class="dataTables_length" id="DataTables_Table_0_length">
                                                            <label>
                                                                <font _mstmutation="1" _msttexthash="97825" _msthash="69">Montrer &nbsp; </font>
                                                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" style={{ "width": "200px" }} class="form-control form-control-sm">
                                                                    {categories && categories.map(c => {
                                                                        return (
                                                                            <option value={c.id} _msttexthash="9451" _msthash="70">{c.categorie} </option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-6">
                                                        <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                                            <label>
                                                                <font _mstmutation="1" _msttexthash="167180" _msthash="75">Rechercher :</font>
                                                                <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <br />
                                                        <Tabs class="nav nav-tabs" activeKey={this.state.ongle} onSelect={(e) => this.handleOnglet(e)}>
                                                            <Tab eventKey="one" title="Notitifier par e-mail">
                                                                <Mailing data={this.state.cvall} fun={this.handleSelectAllMail} check={this.state.selectAllMail} 
                                                                    changeMail={this.handleEmail}
                                                                />
                                                            </Tab>&nbsp;&nbsp;
                                                            <Tab eventKey="two" title="Notifier par téléphone">
                                                                <Telephonique main={this.state.cvall} 
                                                                    fon={this.handleSelectTelephone} 
                                                                    checked={this.state.alltelephone}
                                                                />
                                                            </Tab>&nbsp;&nbsp;
                                                            <Tab eventKey="three" title="Notifier par les réseaux sociaux">
                                                                <SocialNet meta={this.state.cvall} check={this.state.allSocial} fonction={this.handleSelectSocial} />
                                                            </Tab>&nbsp;&nbsp;
                                                        </Tabs>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-header-title" _msttexthash="58201" _msthash="77">Requêtte</div>
                                        </div>
                                        <Notified status={this.state.ongle} mail={this.state.email} />
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

export default Table;