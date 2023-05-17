import React from "react";
import { Link } from "react-router-dom";
import Cvtable from "./Cvtable";

class Categoriecvlist extends React.Component {
    render() {
        const cv = this.props.cv
        return(
            <>
            
                    <>
                    <table className="table table-actions table-striped table-hover mb-0">
                        <thead>
                            <tr>
                            <th scope="col">
                                <label className="custom-control custom-checkbox m-0 p-0">
                                <input type="checkbox" className="custom-control-input table-select-all"/>
                                <span className="custom-control-indicator"></span>
                                </label>
                            </th>
                            <th scope="col">Photo</th>
                            <th scope="col">
                                {sessionStorage.url === 'Administrateur' ? (<>Nom et prénom</>):(<>ID</>)}
                            </th>
                            <th scope="col">Experience</th>
                            <th scope="col">Disponibilité</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cv && cv.map(ca => {
                                return (
                                    <Cvtable cvId={ca} useRole={this.props.userLog} />
                                )
                            })}
                        </tbody>
                    </table>
                    </>
                
                
            </>
        )
    }
}

export default Categoriecvlist;