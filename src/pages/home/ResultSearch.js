import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentTable from "./ContentTable";



export default function ResultSeach({catego, sea}) {
    const [cv, setCv] = useState('');
    
    useEffect(() => {
        if(catego){
            axios.get(`categorie_cvs/${catego}`).then(resp => {
                setCv(resp.data.cvArr)
            }).catch(error => console.log(error))
        }
    }, [catego])
    return(
        <>
             <table class="table table-actions table-striped table-hover mb-0">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Natinnalité</th>
                    <th scope="col">Expérience</th>
                    <th scope="col">Disponibilité</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
                    {cv && cv.map(cvall => {
                        return(
                            <>
                                <tr>
                                    <ContentTable index={cvall} search={sea} />
                                </tr>
                            </>
                        )
                    })}
            </table>
            <br/>
            <br/>
        </>
    )
}


