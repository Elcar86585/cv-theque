import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Categoriecvlist from "./categorie/Categoriecvlist";
import CandidatSearch from "./home/CandidatSearch";
// import ImageMark from '../../public/ImageMark.png';

function Candidat({user}) {
  const [cv, setCv] = useState([]);
  const [categorie, setCategorie] = useState('')
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [limited, setLimited] = useState(100)

  useEffect(() => {

    axios.get(`categorie_cvs/${id}`).then(resp => {
      if(resp.status === 200){
        setCv(resp.data.cvArr);
        setCategorie(resp.data.cat);
        setTimeout(() => {
          setLoad(false)
        }, 4000);
      }
    }).catch(error => console.log(error));
  }, [id]);
  
  const cve = cv.slice(0, limited)

  const handlePlus = () => {
    setLimited(limited + 100)
  }

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
            <CandidatSearch catID={id} catName={categorie.categorie} />
            <div className="table-responsive-md">
              <Categoriecvlist cv={cv} lim={limited} userLog={user} spinner={load} />
            </div>
          </div>
          {cv.length < limited ? (
            <></>
          ):(
            <center><button type="button" className="btn btn-primary btn-lg" onClick={handlePlus}>Monter plus de CV</button></center>
          )}
        </div>
      </div>
    </>
  )
}


export default Candidat;