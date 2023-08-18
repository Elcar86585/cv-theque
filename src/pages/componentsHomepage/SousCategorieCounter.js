import axios from "axios";
import React, { useEffect, useState }  from "react";

export default function SousCategorieCounter({data}) {
    const [count, setCount] = useState('');
    useEffect(() => {
        axios.get(`sous_categories/${data}`).then(resp => {
            if(data){
                setCount(resp.data.countCv)
            }
        })
    }, [data])
    return(
        <>
            <span class="badge rounded-pill bg-info text-dark">+  0{count} CV</span>
        </>
    )
}