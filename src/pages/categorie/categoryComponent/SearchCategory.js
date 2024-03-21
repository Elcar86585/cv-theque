import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function SeachCategory({ searchable }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
    const navigate = useNavigate()
    const items = searchable

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        const filteredResults = items.filter((item) => item.categorie.toLowerCase().includes(string.toLowerCase()));
        setResults(filteredResults);
        setSearch(string);
    }

    const formatResult = (result) => {
        return (
            <Link style={{ textDecoration: "none" }}>
                <span style={{ display: 'block', textAlign: 'left' }}>{result.categorie}</span>
            </Link>
        )
    }

    const handleOnSelect = (item) => {
        // Ajoutez ici la logique pour gérer la sélection
        navigate(`/categorie/${item.id}`)

    };

    return (
        <ReactSearchAutocomplete
            placeholder="Recherche de categorie"
            fuseOptions={{ keys: ["categorie"] }}
            items={results}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            showNoResultsText={'Pas de resultat'}
        />
    )
}