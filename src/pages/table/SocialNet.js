import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

export default function SocialNet({meta, check, fonction}) {
    const headers = [
        { label: "ID", key: "id" },
        { label: "Nom", key: "nom" },
        { label: "Facebook", key: "facebook" },
        { label: "Linkedin", key: "linkedin" }
    ];

    const [dataListe] = [
        meta && meta.map(cv => {
            return (
                { id: `${cv.id}`, nom: `${cv.nomPrenom}`, facebook: `${cv.facebook}`, linkedin: `${cv.linkedin}` }
            )
        })
    ];
    return (
        <>
        <div className="d-flex">
            <div className="p-2">Tous les listes des reseaux sociaux</div>
            <div className="ml-auto p-2">
                <CSVLink data={dataListe} headers={headers} type="button" className="btn btn-primary btn-sm">
                    Telecharger en format CSV
                </CSVLink>
            </div>
        </div>
            <table className="table table-actions table-striped table-hover mb-0 dataTable no-footer" data-table="" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th scope="col" className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label=" : activer pour trier la colonne décroissante" _mstaria-label="947050" _msthash="76" style={{ "width": "37.0156px" }}>
                        <label className="custom-control custom-checkbox m-0 p-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                    onClick={()=>fonction()}
                                />
                            </div>
                        </label>
                    </th>
                    <th scope="col" className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" _mstaria-label="1399710" _msthash="77" _msttexthash="93574" style={{ "width": "70.094px" }}>
                        <strong>ID</strong>
                    </th>
                    <th scope="col" className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" _mstaria-label="1336686" _msthash="78" _msttexthash="31395" style={{ "width": "238.391px" }}>
                        Nom et prénom
                    </th>
                    <th scope="col" className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" _mstaria-label="1342055" _msthash="79" _msttexthash="1486862" style={{ "width": "160.109px" }}>
                        Réseaux sociaux
                    </th>
                    <th scope="col" className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" _mstaria-label="1165099" _msthash="80" _msttexthash="75049" style={{ "width": "160.156px" }}>
                        Disponibilité
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {meta && meta.map(cv => {
                        
                        return (
                            <>
                                <tr role="row" className="odd">
                                    <th scope="row" className="sorting_1">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" 
                                                checked={check}
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
                                        <Link to={cv.linkedin} target="_blanc">
                                            <i style={{"fontSize": "15px"}} className="bi bi-linkedin"></i>&nbsp;&nbsp;&nbsp;
                                        </Link>
                                        <Link to={cv.facebook} target="_blanc">
                                            <i style={{"fontSize": "15px"}} className="bi bi-facebook"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <h6><span className="badge badge-pill badge-primary" _msttexthash="58448" _msthash="85">
                                            {cv.disponibility}
                                        </span></h6>
                                    </td>
                                    
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}