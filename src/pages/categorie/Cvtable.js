import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";

class Cvtable extends React.Component{
    state={
        cvState: {},
        load: false
    }

    componentDidMount = () => {
            this.getCV();
    }

    getCV = () => {
        const id = this.props.cvId;
        if(id){
            axios.get(`cvs/${id}`).then(resp => {
                console.log(resp);
                if(resp.status === 200){
                    this.setState({
                        cvState: resp.data.cv
                    });
                    this.setState({load: true})
                }
            })
        }
    }


    render() {
        const cv = this.state.cvState;
        const admin = sessionStorage.url === 'Administrateur';
        let button;
        let name;
        if(admin === true){
            button = (
                <>
                    &nbsp;
                    <Link to="/editCv"> <button className="btn btn-sm btn-secondary">Editer</button></Link>
                    &nbsp;
                    <button className="btn btn-sm btn-danger">Delete</button>
                </>
            );
            name = (
                <>
                    <td>{cv.nomPrenom} </td>
                </>
            )
        }else{
            name =(
                <>
                    <td>{cv.id} </td>
                </>
            )
        }

        return (
            <>  
            {this.state.load ? (
                <>
                <tr>
                   <th scope="row">
                       <label className="custom-control custom-checkbox m-0 p-0">
                           <input type="checkbox" className="custom-control-input table-select-row"/>
                           <span className="custom-control-indicator"></span>
                       </label>
                   </th>
                   <td>
                    {cv.photo.url && cv.photo.url ? (
                        <>
                            <img width={50} src={`http://localhost:3001/${cv.photo.url}`} style={{"borderRadius": "100%"}} class="img-circle" alt="Cinque Terre"/>

                        </>
                    ):(
                        <>
                            <img width={50} height={50} src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" style={{"borderRadius": "100%"}} class="img-circle" alt="Cinque Terre"/>
                        </>
                    )}
                   </td>
                   {name}
                   <td>{cv.aExperience}</td>
                   <td>
                       <span className="badge badge-pill badge-primary">{cv.disponibility} </span>
                   </td>
                   <td>
                       <Link to={`/cv/${cv.id}`}><button className="btn btn-sm btn-primary" >Voir le CV</button></Link>
                       {button}
                   </td>
                    
                </tr>
             
                </>
            ):(
                <div className="loader"></div>
            )}
            </>
        )
    }
}

export default Cvtable;