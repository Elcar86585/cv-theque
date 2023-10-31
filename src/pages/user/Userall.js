import axios from "axios";
import React, { useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications';
import moment from "moment";
import { Link } from "react-router-dom";
import SearchUser from "./search/SearchUser";


class Userall extends React.Component {
    state = {
        modal: false,
        search: null,
        tady: [],
        searchMessage: ''
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    handleShow = () => {
        this.setState({
            modal: true
        })
    }

    handleDelete = (id, name) => {
        axios.delete(`users/${id}`).then(response => {
            if (response.status === 204) {
                NotificationManager.success('Supprimer avec succèes', 'Supprimer', 4000);
                this.props.get()
            } else {
                NotificationManager.warning('Une erreur est survenu lors de la suppression', 'Erreur', 4000);
            }
        })
    }

    handleSearch = (e) => {
        axios.get(`/usersearch?name=${e.target.value}`).then(resp => {
            console.log(resp.data.search)
            if (resp.status === 200) {
                this.setState({ tady: resp.data.search })
            } else {
                this.setState({ searchMEssage: resp.data.message })
            }
        })
    }

    handleView = () => {
        NotificationManager.info('Hey I am Adyasha', 'Info!', 4000);
    }

    render() {
        const users = this.props.users;
        const recherche = this.state.tady;
        return (
            <>
                <div className="table-responsive-md">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div className="row">
                            <div className="col-sm-12 col-md-6"><div className="dataTables_length" id="DataTables_Table_0_length">
                                <label>
                                    <font _mstmutation="1" _msttexthash="97825" _msthash="69">-- </font>
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                                        className="form-control form-control-sm">
                                        <option value="10" _msttexthash="9451" _msthash="70">
                                            10
                                        </option>
                                        <option value="25" _msttexthash="10062" _msthash="71">
                                            25
                                        </option>
                                        <option value="50" _msttexthash="9815" _msthash="72">
                                            50
                                        </option>
                                        <option value="100" _msttexthash="15067" _msthash="73">
                                            100
                                        </option>
                                    </select>
                                    <font _mstmutation="1" _msttexthash="114621" _msthash="74">
                                        ---
                                    </font>
                                </label>
                            </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                    <label>
                                        <font _mstmutation="1" _msttexthash="167180" _msthash="75">Rechercher:</font>
                                        <input
                                            type="search" className="form-control form-control-sm" placeholder=""
                                            aria-controls="DataTables_Table_0"
                                            onChange={this.handleSearch}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="row">
                                {recherche.length > 0 ? (
                                    <>
                                        <SearchUser table={recherche} message={this.state.message} />
                                    </>
                                ) : (
                                    <>
                                        {users && users.map(user => {
                                            var date = moment(user.created_at); // crée un objet Moment pour la date actuelle
                                            var formattedDate = date.fromNow(); // format " quelques minutes"
                                            return (
                                                <div className="col-xl-4 col-sm-6">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-1 ms-3">
                                                                    <h6 className="font-size-16 mb-1"><strong>{user.name}</strong> {user.prenom} </h6>
                                                                    {user.role === 'Administrateur' ? (
                                                                        <>
                                                                            <span className="badge rounded-pill bg-primary" style={{ "color": "#ffffff" }}>Administrateur</span>
                                                                            <span className="badge rounded-pill bg-light text-dark">{formattedDate} </span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="badge rounded-pill bg-success" style={{ "color": "#ffffff" }}>Utilisateur</span>
                                                                            <span className="badge rounded-pill bg-light text-dark"> {formattedDate} </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <GetUse id={user.id} user={user} />
                                                            <div className="d-flex gap-2 pt-4">
                                                                <Link to={`/user/${user.id}`}><button type="button" className="btn btn-soft-primary"><i className="bx bx-user me-1"></i> Profile</button></Link>&nbsp;
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Userall;

function GetUse({ id, user }) {
    const [entretien, setEntretien] = useState('');
    const [favori, setFavori] = useState('');
    useEffect(() => {
        if (id) {
            axios.get(`users/${id}`).then(resp => {
                if (resp.status === 200) {
                    setEntretien(resp.data.entretien)
                    setFavori(resp.data.favo)
                }
            })
        }
    }, [id])
    return (
        <div className="mt-3 pt-1">
            <p className="text-muted mb-0 mt-2"><i className="bi bi-telephone"></i>&nbsp;{user.phone} </p>
            <p className="text-muted mb-0"><i className="bi bi-envelope-at"></i>&nbsp;{user.email} </p>
            <p className="text-muted mb-0"><i class="bi bi-buildings"></i>&nbsp;{user.societe} </p>
            <p className="text-muted mb-0 mt-2"><i className="bi bi-people"></i>&nbsp;Demande d'entretien ({entretien.length}) </p>
            <p className="text-muted mb-0 mt-2"><i className="bi bi-star"></i>&nbsp;List des favoris ({favori.length}) </p>
            {user.account === true ? (
            <p className="text-muted mb-0 mt-2">
                <span class="badge badge-warning"><i className="bi bi-person-fill-slash"></i>&nbsp;Compte Désactiver </span>
            </p>
            ):(
            <p className="text-muted mb-0 mt-2">
                <span class="badge badge-info"><i className="bi bi-person-fill-check"></i>&nbsp;Comtpe Activer </span>
            </p>
            )}
        </div>
    )
}