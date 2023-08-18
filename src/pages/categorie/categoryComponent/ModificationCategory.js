import axios from "axios";
import React, { useState } from "react";
import {NotificationManager} from 'react-notifications'

export default function ModificationCategory({data, funcData}) {
    const [category, setcategory] = useState('')
    const [descategory, setDescategory] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData;
        if(category){formData.append('categorie', category)}
        if(descategory){formData.append('description', descategory)}
        axios.put(`categorie_cvs/${data.id}`, formData).then(resp => {
            if(resp.status === 200){
                NotificationManager.success('Succée', 'Catégorie modifier avec succée', 4000)
                funcData()
            }
        }).catch(error => console.log(error))
        
    }
    return (
        <>
            <form onSubmit={(e) => handleUpdate(e)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Catégorie</label>
                    <input defaultValue={data.categorie} type="text" class="form-control"
                        onChange={(e) => setcategory(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <textarea defaultValue={data.description} type="text" class="form-control"
                        onChange={(e) => setDescategory(e.target.value)}
                    >
                    </textarea>
                </div>
                {category || descategory ? (
                    <>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </>
                ):(
                    <>
                        <button type="submit" class="btn btn-primary" hidden>Enregistrer</button>
                    </>
                )}
                
            </form>
        </>
    )
}