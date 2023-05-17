import axios from "axios";
import React from "react";
import { NotificationManager } from 'react-notifications';


class Userall extends React.Component {
    state={
        modal: false
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

    handleDelete = (id,name) => {
        alert(`Vous voulez vraiment supprimer ${name}`);
        axios.delete(`users/${id}`).then(response => {
            console.log(response.data)
            if(response.status === 204) {
                NotificationManager.success('Supprimer avec succèes', 'Supprimer', 4000);
                this.props.get()
            }else{
                NotificationManager.danger('Une erreur est survenu lors de la suppression', 'Erreur', 4000);
            }
        })
    }

    handleView = () => {
        console.log('tost')
        NotificationManager.info('Hey I am Adyasha', 'Info!', 4000);
    }
    
    render() {
        const users = this.props.users;
        return (
            <>
                <div className="table-responsive-md">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dataTables_length" id="DataTables_Table_0_length"><label><font _mstmutation="1" _msttexthash="97825" _msthash="69">Montrer </font><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" 
                    className="form-control form-control-sm"><option value="10" _msttexthash="9451" _msthash="70">
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
                                    Entrées
                                    </font>
                                    </label>
                                    </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                            <label>
                                                <font _mstmutation="1" _msttexthash="167180" _msthash="75">Rechercher:</font>
                                                <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0"/>
                                             </label></div>
                                        </div></div>
                                    <div className="row">
                                <div className="col-sm-12">
                        <table className="table table-actions table-striped table-hover mb-0 dataTable no-footer" data-table="" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                      <thead>
                        <tr role="row"><th scope="col" className="sorting_asc" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" S="1" aria-sort="ascending" aria-label=" : activer pour trier la colonne décroissante" _mstaria-label="947050" _msthash="76" style={{"width": "68.7188px"}}>
                            <label className="custom-control custom-checkbox m-0 p-0">
                              <input type="checkbox" className="custom-control-input table-select-all" />
                              <span className="custom-control-indicator"></span>
                            </label>
                          </th><th scope="col" className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Prénom : activer pour trier la colonne ascendante" 
                          _mstaria-label="1399710" _msthash="77" _msttexthash="93574" style={{"width": "255.188px"}}>Nom Prénom</th><th scope="col" 
                          className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" S="1" aria-label="Nom : activer pour trier la colonne ascendante" 
                          _mstaria-label="1336686" _msthash="78" _msttexthash="31395" style={{"width": "247.188px"}}>E-mail</th>
                          <th scope="col" className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" S="1" 
                          aria-label="Rôles : activer pour trier la colonne ascendante" _mstaria-label="1165099" _msthash="80" _msttexthash="75049" 
                          style={{"width": "322.484px"}}>Rôles</th><th scope="col" className="sorting_disabled" rowSpan="1" S="1" aria-label="Actions" 
                          _mstaria-label="95901" _msthash="81" _msttexthash="95901" style={{"width": "103.234px"}}>Actions</th></tr>
                      </thead>
                        <tbody> 
                            {users && users.map(user => {
                                return (
                                    <>
                                        <tr role="row" className="odd">
                                            <th scope="row" className="sorting_1">
                                                <label className="custom-control custom-checkbox m-0 p-0">
                                                <input type="checkbox" className="custom-control-input table-select-row"/>
                                                <span className="custom-control-indicator"></span>
                                                </label>
                                            </th>
                                            <td _msttexthash="77610" _msthash="82">{user.name}</td>
                                            <td _msttexthash="47255" _msthash="83">{user.email} </td>
                                            <td>
                                                <span className="badge badge-pill badge-primary" _msttexthash="58448" _msthash="85">{user.role}</span>
                                            </td>
                                            <td>
                                                <button onClick={this.handleShow} className="btn btn-sm btn-primary" title="voir" _msttexthash="88283" _msthash="86">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>&nbsp;
                                                <button className="btn btn-sm btn-secondary" _msttexthash="88283" title="editer" _msthash="86">
                                                    <i class="bi bi-pencil-square"></i>
                                                </button>&nbsp;
                                                <button onClick={()=>this.handleDelete(user.id, user.name)} className="btn btn-sm btn-danger" title="supprimer" _msttexthash="139100" _msthash="87">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}               
                        </tbody>
                    </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite" _msttexthash="693342" _msthash="143">Affichage de 1 à 10 de 47 entrées</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabIndex="0" className="page-link" _msttexthash="167895" _msthash="144">Précédent</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabIndex="0" className="page-link" _msttexthash="4459" _msthash="145">1</a></li><li className="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex="0" className="page-link" _msttexthash="4550" _msthash="146">2</a></li><li className="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="3" tabIndex="0" className="page-link" _msttexthash="4641" _msthash="147">3</a></li><li className="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="4" tabIndex="0" className="page-link" _msttexthash="4732" _msthash="148">4</a></li><li className="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="5" tabIndex="0" className="page-link" _msttexthash="4823" _msthash="149">5</a></li><li className="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="6" tabIndex="0" className="page-link" _msttexthash="112762" _msthash="150">Prochain</a></li></ul></div></div></div></div>
                  </div>
            </>
        )
    }
}

export default Userall;