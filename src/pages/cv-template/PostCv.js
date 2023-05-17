import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PostCv({id}) {
    const [catCv, setCatCv] = useState('');
    useEffect(() => {
        axios.get(`categorie_cvs/${id}`).then(resp => {
            setCatCv(resp.data)
        })
    }, [id])
    return(
        <>
            <p>{catCv.categorie} </p>
        </>
    )
}