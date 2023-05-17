import React from "react";

export default function Commentaire() {
    return(
        <>
            <form>
                <div class="form-floating">
                        <textarea class="form-control" placeholder="Votre commentaire ..." id="floatingTextarea"></textarea>
                        <br/>
                        <button type="reset"class="btn btn-primary">Commenter</button>
                </div>
            </form>
        </>
    )
}