import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications'
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class CategorieAll extends React.Component {
    state = {
        show: false,
        cate: '',
        description: '',
        categorie: '',
        descategorie: ''
    }


    handleUpdate = (id) => {
        const fromData = new FormData;
        if (this.state.categorie) { fromData.append('categorie', this.state.categorie) }
        if (this.state.descategorie) { fromData.append('description', this.state.descategorie) }
        axios.put(`categorie_cvs/${id}`, fromData).then(resp => {
            if (resp.status === 200) {
                this.props.func();
                this.handleClose();
                NotificationManager.success('Catégorie mise à jour avec succès', 'Mise à jour reussie', 4000);
                this.setState({ categorie: '' });
                this.setState({ descategorie: '' });
            }
        }).catch(error => console.log(error))
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        const categorie = this.props.cate
        return (
            <>
                <div className="table-responsive-md">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div className="row">
                            <div className="col-sm-12">

                                {categorie && categorie.map(cat => {
                                    const daty = moment(cat.created_at).endOf('day').fromNow();
                                    return (
                                        <>
                                            <div class="list-group">
                                                <div class="list-group-item list-group-item-action" aria-current="true">
                                                    <div class="d-flex w-100 justify-content-between">
                                                        <h5 class="mb-1">{cat.categorie}</h5>
                                                        <small>{daty} </small>
                                                    </div>
                                                    <p class="mb-1">{cat.description}</p>
                                                    <Link class="badge badge-info" to={`/candidats/${cat.id}`}>Voir tous les CV</Link>
                                                    <hr />
                                                    <p>Sous catégorie :</p>
                                                    <ul>
                                                        <GetSousCategorie data={cat.id} />
                                                    </ul>
                                                    <Link to={`/categorie/${cat.id}`}>
                                                        <Button onClick={this.handleShow} datatarget={cat.id} className="btn btn-sm btn-primary" _msttexthash="88283" _msthash="86">
                                                            Voir les détailes
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <br />
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function GetSousCategorie({ data }) {
    const [sousCat, setSousCat] = useState([])
    useEffect(() => {
        if (data) {
            axios.get(`categorie_cvs/${data}`).then(resp => {
                setSousCat(resp.data.sousCategorie);
            }).catch(error => console.log(error))
        }
    }, [data])

    return (
        <>
            {sousCat && sousCat.map(sc => {
                return (
                    <>
                        <li>
                            <b>{sc.categorie} :</b> {sc.description}<br/>
                            <Link class="badge badge-primary" to={`/souscategorie/${sc.id}`}>Voir tous les CV</Link>
                        </li>
                    </>
                )
            })}
        </>
    )
}


