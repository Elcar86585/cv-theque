import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Rating = ({ value, max }) => {
  const stars = [];
  const [star, setStar] = useState(null)

  for (let i = 1; i <= max; i++) {
    if (i <= value) {
      stars.push(<Link onClick={console.log(i)} key={i}>&#9733;</Link>); // Utilisez le code unicode pour afficher une étoile pleine
    } else {
      stars.push(<Link onClick={console.log(i)} key={i}>&#9734;</Link>); // Utilisez le code unicode pour afficher une étoile vide
    }
  }

  console.log(stars)
  return <div>{stars}</div>;
};

export default Rating;