import axios from "axios";
import React, { useEffect, useState } from "react";


export default function GetSousCat({scId}) {
    const [sousCategorie, setSousCategorie] = useState('')
    useEffect(() => {
        if(scId){
            axios.get(`sous_categories/${scId}`).then(resp => {
                setSousCategorie(resp.data.sc)
            }).catch(error => console.log(error))
        }
    }, [scId])
    return(
        <>
            <p>{sousCategorie.categorie} </p>
        </>
    )
}