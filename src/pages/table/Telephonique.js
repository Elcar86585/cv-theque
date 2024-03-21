import React, {useState} from "react";
import { CSVLink } from "react-csv";

export default function Telephonique({main, checked, fon}) {
    const headers = [
        { label: "ID", key: "id" },
        { label: "Nom", key: "nom" },
        { label: "Telephone", key: "telephone" }
    ];

    const [dataListe] = [
        main && main.map(cv => {
            return (
                { id: `${cv.id}`, nom: `${cv.nomPrenom}`, telephone: `${cv.telephone}` }
            )
        })
    ];
    return (
        <>
        <div className="d-flex">
            <div className="p-2">Tous les listes des numéro telphones</div>
            <div className="ml-auto p-2">
                <CSVLink data={dataListe} headers={headers} type="button" className="btn btn-primary btn-sm">
                    Telecharger en format CSV
                </CSVLink>
            </div>
        </div>
            <table className="table table-actions table-striped table-hover mb-0 dataTable no-footer" data-table="" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th scope="col" className="sorting_asc" tabindex="0">
                        <label className="custom-control custom-checkbox m-0 p-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                    onClick={() => fon()}
                                />
                            </div>
                        </label>
                    </th>
                    <th scope="col" className="sorting" >
                        <strong>ID</strong>
                    </th>
                    <th scope="col" className="sorting"  >
                        Nom et prénom
                    </th>
                    <th scope="col" className="sorting" >
                        Téléphone
                    </th>
                    <th scope="col" className="sorting" >
                        Disponibilité
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {main && main.map(cv => {
                       
                        return (
                            <>
                                <tr role="row" className="odd">
                                    <th scope="row" className="sorting_1">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                                                checked={checked}
                                            />
                                        </div>
                                    </th>
                                    <td _msttexthash="77610" _msthash="82">
                                        <strong>0{cv.id} </strong>
                                    </td>
                                    <td _msttexthash="47255" _msthash="83">
                                        {cv.nomPrenom}
                                    </td>
                                    <td _msttexthash="43290" _msthash="84">
                                        {cv.telephone}
                                    </td>
                                    <td>
                                        <h6><span className="badge badge-pill badge-primary" _msttexthash="58448" _msthash="85">
                                            {cv.disponibility}    
                                        </span></h6>
                                    </td>
                                    
                                </tr>
                            </>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    )
}