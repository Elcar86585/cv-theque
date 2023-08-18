import axios from "axios";
import React, { useState } from "react";
import {NotificationManager} from 'react-notifications';


export default function AddSousCategory({catData, functionne}) {
    const [sousCat, setSousCat] = useState('')
    const [desousCat, setDesousCat] = useState('')
    const [reset, setReset] = useState(false)

    const handleSubmitSousCat = (e) => {
        e.preventDefault();
        const formSous = new FormData;
        formSous.append('categorie', sousCat);
        formSous.append('categorie_cv_id', catData.id);
        formSous.append('description', desousCat);

        axios.post('sous_categories', formSous).then(resp => {
            if(resp.status === 201){
                functionne();
                NotificationManager.success('Enregistrer', 'Sous Catégorie ajouter avec succès', 4000)
                e.target.reset();
            }else{
                NotificationManager.warning('Erreur', 'Une erreur est survenue lors de l\'envoi', 4000)
            }
        }).catch(error => console.log(error))
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmitSousCat(e)} >
                <div class="mb-3">
                    <label class="form-label">Sous catégorie pour {catData.categorie}</label>
                    <input type="text" placeholder="Votre sous catégorie" class="form-control" required 
                        onChange={(e) => setSousCat(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea type="text" placeholder="Description de votre sous catégorie" class="form-control"
                        required
                        onChange={(e) => setDesousCat(e.target.value)}
                    >
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">Valider</button>
            </form>
        </>
    )
}