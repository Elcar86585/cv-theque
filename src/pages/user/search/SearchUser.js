import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function SearchUser({ table, message }) {
    const recherche = table
    return (
        <>
            {recherche && recherche.map(user => {
                var date = moment(user.created_at); // crée un objet Moment pour la date actuelle
                var formattedDate = date.fromNow(); // format "il y a quelques minutes"
                return (
                    <div className="col-xl-4 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-1 ms-3">
                                        <h6 className="font-size-16 mb-1"><strong>{user.name}</strong> </h6>
                                        {user.role === 'Administrateur' ? (
                                            <>
                                                <span className="badge rounded-pill bg-primary" style={{ "color": "#ffffff" }}>Administrateur</span>
                                                <span className="badge rounded-pill bg-light text-dark">il y a{formattedDate} </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="badge rounded-pill bg-success" style={{ "color": "#ffffff" }}>Utilisateur</span>
                                                <span className="badge rounded-pill bg-light text-dark">il y a {formattedDate} </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* <GetUse id={user.id} user={user} /> */}
                                <div className="d-flex gap-2 pt-4">
                                    <Link to={`/user/${user.id}`}><button type="button" className="btn btn-soft-primary"><i className="bx bx-user me-1"></i> Profile</button></Link>&nbsp;
                                    <button type="button" className="btn btn-primary btn-sm w-50"><i className="bx bx-message-square-dots me-1"></i> Contact</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
