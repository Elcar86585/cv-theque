import React from "react";

class Notified extends React.Component {
    render() {
        const email = this.props.mail
        let view = this.props.status
        if(view === 'one') {
            return (
                <div className="card-body collapse show">
                    <h4>Notifier par E-mail</h4>
                    <form>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">E-mail</label>
                        <input type="email" className="form-control" 
                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                            value={email.map(mail => mail.mail)}
                        />
                        <small id="emailHelp" className="form-text text-muted">Separer les adresse e-mail par des vurgule.</small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Objet</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">Objet de votre e-mail.</small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Contenu de l'e-mail</label>
                        <textarea type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" rows={4} placeholder="Contenu de votre e-mail">
                        </textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Envoyer
                      </button>
                    </form>
                </div>
            )
        }else if(view === 'two'){
            return (
                <>
                <div className="card-body collapse show">
                    <h4>Notifier par Téléphone</h4>
                    <form>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Téléphone</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter le numéro de téléphone"/>
                        <small id="emailHelp" className="form-text text-muted">Separer les numéro téléphone par des vurgule.</small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Contenu du message</label>
                        <textarea type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" rows={4} placeholder="Contenu de votre message">
                        </textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Envoyer</button>
                    </form>
                </div>
                </>
            )
        }else {
            return (
                <>
                <div className="card-body collapse show">
                    <h4>Notifier par les réseaux sociaux</h4>
                    <form>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Lien de profile</label>
                        <input type="url" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Coller le lien"/>
                        <small id="emailHelp" className="form-text text-muted">Separer les liens par des vurgule.</small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="exampleInputEmail1">Contenu du message</label>
                        <textarea type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" rows={4} placeholder="Contenu de votre message">
                        </textarea>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label" for="inlineCheckbox1">Facebook</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                        <label className="form-check-label" for="inlineCheckbox2">Linkedin</label>
                    </div>
                    <br/><br/>
                      <button type="submit" className="btn btn-primary">Envoyer</button>
                    </form>
                </div>
                </>
            )
        }
    }
}

export default Notified;