import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IdSearch({ recherche, fonc }) {
    const [search, setSearch] = useState([])
    const [mess, setMess] = useState('')
    const id = recherche
    useEffect(() => {
        if (id) {
            axios.get(`search?id=${id}`).then(resp => {
                if (resp.status === 200) {
                    setSearch(resp.data.search)
                } else {
                    setMess(resp.data)
                }
            })
        }
    }, [recherche])
    
    if(search.length > 0) {
        return (
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="col-12">
                        <div className="card card-margin">
                            <div className="card-body">
                                <div className="row search-body">
                                    <div className="col-lg-12">
                                        <div className="search-result">
                                            <div className="result-header">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="records">Montrant : <b>{search.length} </b> sur <b>100</b> resultats</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="result-body">
                                                <div className="table-responsive">
                                                    <table className="table widget-26">
                                                        <tbody>
                                                            {search && search.map(result => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <div className="widget-26-job-title">
                                                                                    <a href="#">
                                                                                        <b>Experience :</b> + de {result.aExperience} 
                                                                                    </a>
                                                                                    <p className="m-0"><a href="#" className="employer-name">
                                                                                        <b>CV id : </b> 00{result.id}
                                                                                    </a> <span className="text-muted time">1 days ago</span></p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="widget-26-job-info">
                                                                                    <p className="type m-0">
                                                                                        {result.disponibility}
                                                                                    </p>
                                                                                    <p className="text-muted m-0">Habite à <span className="location">
                                                                                        {result.adresse}    
                                                                                    </span></p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="widget-26-job-salary">
                                                                                    Contrat : {result.contrat}
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="widget-26-job-category bg-soft-base">
                                                                                    <i className="bi bi-tags-fill"></i>&nbsp;Post :&nbsp;
                                                                                    <GetCategorieCv id={result.categorie_cv_id} />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <Link onClick={() => fonc()} to={`/cv/${result.id}`} >
                                                                                <div className="widget-26-job-starred">
                                                                                    <button type="button" class="btn btn-primary btn-sm">
                                                                                        Voir le CV ID : {result.id}
                                                                                    </button>
                                                                                </div>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className="col-12">
                        <div className="card card-margin">
                            <div className="card-body">
                                <div className="row search-body">
                                    <div className="col-lg-12">
                                        <div className="search-result">
                                            <div className="result-header">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="records">Montrant : <b>0</b> de <b>0</b> resultat</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="result-body">
                                                <div className="table-responsive">
                                                    <table className="table widget-26">
                                                        <tbody>
                                                            <h3>Aucune resultat</h3>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function GetCategorieCv({id}) {
    const [catego, setCatego] = useState('')
    useEffect(() => {
        axios.get(`categorie_cvs/${id}`).then(resp => {
            if(resp.status === 200){
                setCatego(resp.data.cat)
            }
        }).catch(error => {console.log(error)})
    }, [id])
    return (
        <span>
            {catego.categorie} 
        </span>
    )
}