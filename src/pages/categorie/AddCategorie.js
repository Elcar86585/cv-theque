import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {NotificationManager} from 'react-notifications';

class AddCategorie extends React.Component {
    state={
        message: '',
        description: ''
    }

    handleChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <div className="card-body">
                <Formik
                        initialValues={{
                            categorie: '',
                            description: '', 
                        }}

                        onSubmit={(value, {resetForm}) => {
                            const formdata = new FormData;
                            formdata.append('categorie', value.categorie)
                            formdata.append('description', this.state.description)

                            axios.post('categorie_cvs', formdata).then(response => {
                                if(response.status === 201){
                                    resetForm();
                                    this.props.fonc();
                                    NotificationManager.success('Créer avec succées', 'Valider', 4000)
                                }else {
                                    NotificationManager.warning('Une erreur est survenu lors de la validation', 'Erreur', 4000)
                                }
                            })
                        }}
                    >
                        <Form id="notificationDemo">
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Ajouter un categorie </label>
                                <Field type="text" className="form-control" name="categorie" id="demoText" placeholder="Nom de la Categorie" _msthash="79" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="demoText" _msttexthash="1074619" _msthash="78">Description</label>
                                <textarea type="text" onChange={this.handleChange} className="form-control" name="description" id="demoText" placeholder="Description de la categorie" rows={5} _msthash="79" required>
                                </textarea>
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" _msttexthash="2631473" _msthash="97">Valider</button>
                            </div>
                            <p>{this.state.message} </p>
                        </Form>
                    </Formik>
                
            </div>
        )
    }
}

export default AddCategorie;