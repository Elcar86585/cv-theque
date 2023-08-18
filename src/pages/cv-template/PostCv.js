import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PostCv({id}) {
    const [catCv, setCatCv] = useState({});
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                setCatCv(resp.data.cat)
            }).catch(error => console.log(error))
        }
    }, [id])
    return(
        <>
            <p>{catCv.categorie} </p>
        </>
    )
}

