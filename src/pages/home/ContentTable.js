import React, {useState, useEffect} from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContentTable({index, search}) {
    const [cv, setCv] = useState('');
    const [load, setLoad] = useState(false)
    
    useEffect(() => {
        if(index){
            axios.get(`cvs/${index}`).then(resp => {
                if(resp.status === 200){
                    setCv(resp.data.cv);
                    setLoad(true);
                }
            })
        }
    }, [index])
    const seaN = search.nationalite
    let image;
    if(cv.photo && cv.photo.url !== null){
        const url = cv.photo.url;
        image = (
            <>
                <img src={`http://localhost:3001/${url}`} style={{"width": "50px", "borderRadius": "50%"}} class="img-thumbnail" alt="image CV thèque Activ solution"/>
            </>
        )
    }else{
        image = (
        <>
            <img src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" style={{"width": "50px", "borderRadius": "50%"}} class="img-thumbnail" alt="..."/>
        </>)
    }
    if(search.nationalite){
        if(search.nationalite === cv.nationalite || search.exp === cv.aExperience || search.dispo === cv.disponibility){
            return(
                <>
                {load ? (
                    <>
                        <th scope="row">
                            <strong>{cv.id}</strong>
                        </th>
                        <th>
                            {image}
                        </th>
                        <td>{cv.nationalite} </td>
                        <td>{cv.aExperience} </td>
                        <td>
                            <h6><span class="badge bg-success">{cv.disponibility}</span></h6>
                        </td>
                        <td>
                            <Link to={`cv/${cv.id}`}><button type="button" class="btn btn-primary">Voir le CV</button></Link>
                        </td>
                    </>
                ): (
                    <>
                        <div className="loader"></div>
                    </>
                )}
                </>
            )
        }
    }else {
        return(
            <>
            {load ? (
                <>
                    <th scope="row">
                        <strong>{cv.id}</strong>
                    </th>
                    <th>
                        {image}
                    </th>
                    <td>{cv.nationalite} </td>
                    <td>{cv.aExperience} </td>
                    <td>
                        <h6><span class="badge bg-success">{cv.disponibility}</span></h6>
                    </td>
                    <td>
                        <Link to={`cv/${cv.id}`}><button type="button" class="btn btn-primary">Voir le CV</button></Link>
                    </td>
                </>
            ): (
                <>
                    <div className="loader"></div>
                </>
            )}
            </>
        )
    }
}