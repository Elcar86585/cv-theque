import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Categoriename({ catId }) {
    const [categorie, setCategorie] = useState('')
    useEffect(() => {
        if (catId) {
            axios.get(`categorie_cvs/${catId}`).then(resp => {
                if (resp.status === 200) {
                    setCategorie(resp.data.cat)
                }
            })
        }
    }, [catId])
    return (
        <p className="card-text text-muted">
            {categorie.categorie}
        </p>
    )
}