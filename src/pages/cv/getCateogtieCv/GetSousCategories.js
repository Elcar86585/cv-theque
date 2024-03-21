import axios from "axios";
import React, { useEffect, useState } from "react";


export default function GetSousCategories({ catid }) {
    const [cata, setSousCata] = useState('')
    useEffect(() => {
        if (catid) {
            axios.get(`sous_categories/${catid}`).then(resp => {
                if (resp.status === 200) {
                    setSousCata(resp.data.sc)
                }
            }).catch(errror => console.log(errror))
        }
    }, [catid])
    return (
        <p className="card-text text-muted">
            {cata.categorie}
        </p>
    )
}