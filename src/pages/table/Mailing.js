import React, { useState } from "react";
import { CSVLink } from 'react-csv';

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
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="form-check">
                                <input className="form-check-input" onClick={() => fun()} type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Nom et prénom</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
             
                <tbody >
                    {data && data.map(cv => {
                        const [select, setSelect] = useState(false)
                        const handleCheck = () => {
                            if (select === true || check) {
                                setSelect(false)
                            } else {
                                setSelect(true)
                            }
                        }
                        return (
                            <>
                                <tr>
                                    <th scope="row">
                                        <div className="form-check">
                                            <input onClick={() => handleCheck()}
                                                className="form-check-input" value={cv.email} type="checkbox" id="flexCheckDefault"
                                                checked={select ? select : check}
                                                onChange={(e) => changeMail(e)}
                                            />
                                        </div>
                                    </th>
                                    <td >
                                        <strong>0{cv.id} </strong>
                                    </td>
                                    <td >
                                        {cv.nomPrenom} {cv.prenom}
                                    </td>
                                    <td >
                                        {cv.email}
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