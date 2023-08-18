import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Categoriecvlist from "./categorie/Categoriecvlist";
// import ImageMark from '../../public/ImageMark.png';

function Candidat({user}) {
  const [cv, setCv] = useState([]);
  const [categorie, setCategorie] = useState('')
  const { id } = useParams();

  useEffect(() => {

    axios.get(`categorie_cvs/${id}`).then(resp => {
      setCv(resp.data.cvArr);
      setCategorie(resp.data.cat);
    }).catch(error => console.log(error));
  }, [id]);
  
  return (
    <>
      <div className="adminx-content">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/">Tableu de bord</a></li>
                <li className="breadcrumb-item"><a href="#">Candidats</a></li>
                <li className="breadcrumb-item active" aria-current="page">Tous les Candidats de {categorie.categorie} </li>
              </ol>
            </nav>

            <div className="pb-3">
              <h3>Candidats pour le post {categorie.categorie}</h3>
            </div>
            <div className="table-responsive-md">
              <Categoriecvlist cv={cv} userLog={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Candidat;