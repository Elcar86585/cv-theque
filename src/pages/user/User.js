import React from 'react';
import Userall from './Userall';
import Adduser from './Adduser';
import axios from 'axios';


class User extends React.Component {
    state={
        users: []
    }

    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () => {
        axios.get('users').then(response => {
            this.setState({
            users: response.data
            })
        })
    };
    render() {
        const use = this.state.users
        console.log(use)
        return (
            <>
            <div className="adminx-content">
                <div className="adminx-main-content">  
                        <div className="container-fluid">
                            <nav aria-label="chapelure" role="navigation" _mstaria-label="157144" _msthash="63">
                                <ol className="breadcrumb adminx-page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="111306" _msthash="64">Accueil</a></li>
                                    <li className="breadcrumb-item"><a href="#" _msttexthash="2931006" _msthash="65">Éléments de l’interface utilisateur</a></li>
                                    <li className="breadcrumb-item active  aria-current=" _msttexthash="234351" _msthash="66">Gestion des utilisteurs</li>
                                </ol>
                                </nav>

                                <div className="pb-3">
                                    <h1 _msttexthash="234351" _msthash="67">Gestion d'utilisateurs
                                </h1>
                                </div>

                                <div className="row">
                                <div className="col-lg-8">
                                    <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <div className="card-header-title" _msttexthash="183612" _msthash="68">List des {use.length} utilisateurs
                                        </div>

                                        <nav className="card-header-actions" _msthidden="3">
                                        <a className="card-header-action" data-toggle="collapse" href="#card1" aria-expanded="false" aria-controls="card1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                        </a>
                                        
                                        <div className="dropdown" _msthidden="3">
                                            <a className="card-header-action" href="#" role="button" id="card1Settings" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                            </a>

                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="card1Settings" _msthidden="3">
                                            <a className="dropdown-item" href="#" _msttexthash="76466" _msthidden="1" _msthash="69">Action</a>
                                            <a className="dropdown-item" href="#" _msttexthash="232752" _msthidden="1" _msthash="70">Another action</a>
                                            <a className="dropdown-item" href="#" _msttexthash="349791" _msthidden="1" _msthash="71">Something else here</a>
                                            </div>
                                        </div>

                                        <a href="#" className="card-header-action">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                        </a>
                                        </nav>
                                    </div>
                                    <div className="card-body collapse show" id="card1">
                                        <Userall users={this.state.users} get={this.getUsers} />
                                    </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card">
                                    <div className="card-header">
                                        <div className="card-header-title" _msttexthash="58201" _msthash="77">Ajouter un utilisateur</div>
                                    </div>
                                        <Adduser get={this.getUsers}/>
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

export default User;