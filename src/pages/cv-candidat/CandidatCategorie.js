import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CandidatCategorie({id}) {
    const [cat, setCat] = useState('')
    useEffect(() => {
        if(id){
            axios.get(`categorie_cvs/${id}`).then(resp => {
                setCat(resp.data.cat)
            })
        }
    }, [id])

    const cate = cat.categorie

    return(
        <>
            <p>{cate}</p>
        </>
    )
}