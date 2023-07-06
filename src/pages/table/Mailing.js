import React, { useState } from "react";
import {CSVLink} from 'react-csv';

export default function ({ data, fun, check, changeMail }) {
    const headers = [
        { label: "ID", key: "id" },
        { label: "Nom", key: "nom" },
        { label: "Email", key: "email" }
    ];

    const [dataListe] = [
        data && data.map(cv => {
            return (
                { id: `${cv.id}`, nom: `${cv.nomPrenom}`, email: `${cv.email}` }
            )
        })
    ];
    return (
        <>
        <div class="d-flex">
            <div class="p-2">Tous les listes des email</div>
            <div class="ml-auto p-2">
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
                                <input className="form-check-input" onClick={() => fun()} type="checkbox" value="" id="flexCheckDefault" />
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
                            E-mail
                        </th>
                        <th scope="col" className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" _mstaria-label="1165099" _msthash="80" _msttexthash="75049" style={{ "width": "160.156px" }}>
                            Disponibilité
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(cv => {
                        const [select, setSelect] = useState(false)
                        const handleCheck = () => {
                            if(select === true || check){
                                setSelect(false)
                            }else{
                                setSelect(true)
                            }
                        }
                        return (
                            <>
                            <tr role="row" className="odd">
                                <th scope="row" className="sorting_1">
                                    <div className="form-check">      
                                        <input onClick={() => handleCheck()} 
                                            className="form-check-input" value={cv.email} type="checkbox" id="flexCheckDefault"                                       
                                            checked={select ? select : check}
                                            onChange={(e) => changeMail(e)}
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
                                    {cv.email}
                                </td>
                                <td>
                                    <h6>
                                        <span className="badge badge-pill badge-primary" _msttexthash="58448" _msthash="85">
                                            {cv.disponibility} 
                                        </span>
                                    </h6>
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