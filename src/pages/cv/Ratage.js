import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactStars from "react-stars";

export default function Ratage({ dCv }) {
    const [rating, setRating] = useState('')
    const [rated, setRated] = useState('');
    useEffect(() => {

        getCvShow();

    }, [dCv.id])

    const getCvShow = () => {
        axios.get(`cvs/${dCv.id}`).then(resp => {
            if (resp.status === 200) {
                setRating(resp.data.rating)
                setRated(resp.data.cvRat)
            }
        })
    }
    const calculation = (rated / rating)
    const valRate = Math.ceil(calculation)
    return (
        <>
            <ReactStars count={5} value={valRate} size={20} />
        </>
    )
}