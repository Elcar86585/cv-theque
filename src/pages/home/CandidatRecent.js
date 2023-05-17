import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CandidatRecent extends React.Component {
    state = {
        profil : []
    }

    componentDidMount = () => {
        this.getprofile()
    }

    getprofile = () => {
        axios.get('cvs?', {params: {per_page: 10}}).then(reponse => {
            this.setState({
                profil: reponse.data
            })
        })
    }
    render() {
        const candidat = this.state.profil
        let cache;
        
        return (
            <>
                <div className="card-body">
                    {candidat && candidat.map(pro => {
                        console.log(pro)
                        if(sessionStorage.url === 'Administrateur') {
                            cache = (
                                <>
                                    <h5 className="card-title">{pro.nomPrenom} / ID : {pro.id} </h5>
                                    <p>{pro.disponibility} </p>
                                    <div class="mt-2 pt-2 ">
                                        <Link to={`cv/${pro.id}`}><button type="button" class="btn btn-primary btn-sm">Voir le cv</button></Link>&nbsp;
                                    </div>
                                </>
                            )
                        }else{
                            cache=(
                                <>
                                    <h5 className="card-title">ID : {pro.id}</h5>
                                    <p>{pro.disponibility} </p>
                                    <div class="mt-2 pt-2 ">
                                        <Link to={`cv/${pro.id}`}><button type="button" class="btn btn-primary btn-sm">Voir le cv</button></Link>&nbsp;
                                    </div>
                                </>
                            )
                        }
                        return (
                            <>
                                <p>{cache} </p>
                                <hr/>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default CandidatRecent;