import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


export default function NavSearchCv({ candydat }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
    const navigate = useNavigate()
    const items = candydat

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        const filteredResults = items.filter((item) => item.prenom.toLowerCase().includes(string.toLowerCase()) ||
            item.nomPrenom.toLowerCase().includes(string.toLowerCase()));
        setSearch(string);
        setResults(filteredResults);
    }

    const formatResult = (result) => {
        return (
            <Link style={{ textDecoration: "none" }}>
                <span style={{ display: 'block', textAlign: 'left' }}><b>{result.nomPrenom}</b> {result.prenom}</span>
            </Link>
        )
    }

    const handleOnSelect = (item) => {
        // Ajoutez ici la logique pour gérer la sélection
        navigate(`/cv/${item.id}`)

    };


    //console.log(results)

    return (
        <div  >
            <ReactSearchAutocomplete
                fuseOptions={{ keys: ["nomPrenom"] }}
                placeholder="Recherche de profile par nom ou prenom"
                items={results}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                showNoResultsText={'Pas de resultat'}
            />
        </div>
    )
}