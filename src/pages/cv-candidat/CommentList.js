import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export default function CommentList({ comment, fon }) {
    if(comment.length > 0){
        return (
            <div class="">
                <div class="be-comment-block">
                    <h4 class="comments-title">Liste des commentaires ({comment.length})</h4>
                    {comment && comment.map(com => {
                        return (
                            <div class="be-comment">
                                <CommentContent id={com} fonct={fon} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function CommentContent({id, fonct}) {
    const [comment, setComment] = useState('');
    useEffect(() => {
        if(id){
            axios.get(`comments/${id}`).then(resp => {
                setComment(resp.data)
            })
        }
    }, [id])

    const d = comment.created_at
    const date = moment(d).format('MMMM d YYYY, HH:mm' )
    const handleDelete = (iD) => {
        console.log(iD)
        axios.delete(`comments/${iD}`).then(resp => {
            if(resp.status === 204) {
                NotificationManager.success('Commentaire supprimer avec succée', 'Suppression', 4000);
                fonct();
            }
        })
    }
    return (
        <>
            <div class="be-comment-content">
                <GetUser id={comment.user_id} />
                <span class="be-comment-time">
                    <i class="bi bi-clock-history"></i>&nbsp;
                    {date}
                </span>

                <p class="be-comment-text">
                    {comment.commentaire}&nbsp;&nbsp;&nbsp;<br/>
                <Link onClick={() => handleDelete(comment.id)} class="badge badge-danger">Supprimer</Link>
                </p>
            </div>
        </>
    )
}

function GetUser({id}) {
    const [user, setUser] = useState('');
    useEffect(() => {
        if(id){
            axios.get(`users/${id}`).then(resp => {
                setUser(resp.data.user)
            })
        }
    }, [id])
    return (
        <span class="be-comment-name">
                <strong>{user.name}</strong>
            </span>
    )
}

