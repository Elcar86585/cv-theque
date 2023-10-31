import axios from "axios";
import React, { useState } from "react";
import {NotificationManager} from 'react-notifications'

export default function Commentaire({userId, cvId, fon, hid}) {
    const [comment, setComment] = useState('');
    const handleComment = () => {
        if(comment) {
            const fromdata = new FormData;
            fromdata.append('commentaire', comment)
            fromdata.append('user_id', userId)
            fromdata.append('cv_id', cvId)
            axios.post('comments', fromdata).then(resp => {
                if(resp.status === 201) {
                    NotificationManager.success('Commentaire ajouter avec succée', 'Commentaire ajouter', 4000);
                    fon();
                    hid();
                }
            })
        }else {
            NotificationManager.warning('Le champ commentaire est obligatoire', 'Erreur', 4000)
        }
    }
    return(
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div class="form-floating">
                        <textarea class="form-control" 
                            placeholder="Votre commentaire ..." id="floatingTextarea"
                            onChange={(e) => setComment(e.target.value)}
                            required
                        >
                        </textarea>
                        <br/>
                        <button onClick={handleComment} type="submit"class="btn btn-primary">Commenter</button>
                </div>
            </form>
        </>
    )
}