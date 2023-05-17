import React from 'react';
import { Formik, Field, Form  } from 'formik';
import axios from 'axios';
import CV_template from '../cv-template/CV_template';

class Addcandidat extends React.Component {
    state={
        app: '',
        progress: '',
        informatk: [],
        langue: '',
        progrelangue: '',
        langage: [],
        loisArr: [],
        loisir: '', 
        societe: '',
        date: '',
        descriptionExp:'',
        experience: [],
        ecole: '',
        dateDip: '',
        descriptionDiplome: '',
        diplome: [],
        nomPrenom: '',
        email: '',
        categories: [],
        telephone: '',
        age: '',
        adresse: '',
        dispo: '',
        profileDescription: '',
        category: '',
        photo: null,
        categorieId: '',
        facebook:'',
        linkedin:'',
        nation: '',
        aExp: ''
    }

    
    //onclik Loisir buttn
    handleClickLoisir = () => {
        const loisirState = this.state.loisir
        this.setState(prevState => ({
            loisArr: [{loisirState}, ...prevState.loisArr]
        }))
    }
    
    //onclik informatique
    handleClickInfo = () => {
        const appState = this.state.app
        const progresState = this.state.progress
        this.setState(prevState => ({
            informatk: [{appState, progresState}, ...prevState.informatk]
        }))
    }

    // oncklik langue
    handleClicklangue = () => {
        const langueState = this.state.langue;
        const progresLangueState = this.state.progrelangue;
        this.setState(prevState => ({
            langage: [{langueState, progresLangueState}, ...prevState.langage]
        }))
    }

    //onclick experience

    handleClickExp = () => {
        const societeState = this.state.societe
        const dateState = this.state.date
        const descriptionState = this.state.descriptionExp
        this.setState(prevState => ({
            experience: [{societeState, dateState, descriptionState }, ...prevState.experience]
        }))
    }

    // onClick Diplome

    handleClickDipl = () => {
        const ecoleState = this.state.ecole
        const dateDipState = this.state.dateDip
        const descriptionDipState = this.state.descriptionDiplome
        this.setState(prevState => ({
            diplome: [{ecoleState, dateDipState, descriptionDipState }, ...prevState.diplome]
        }))
    }

    // ==============================================================================================================

    componentDidMount = () => {
        this.getCategories();
    }

    getCategories = () => {
        axios.get('categorie_cvs').then(response => {
            this.setState({
                categories: response.data
            })
        })
    }

    // ===============================================================================================================

    handleFacebook = (e) => {
        this.setState({
            facebook: e.target.value
        })
    }

    handleLinkedin = (e) => {
        this.setState({
            linkedin: e.target.value
        })
    }

    handleNation = (e) => {
        this.setState({
            nation: e.target.value
        })
    }

    handleAExp = (e) => {
        this.setState({
            aExp: e.target.value
        })
    }


    // Select Categorie

    handleSelect = (e) => {
        this.setState({
            categorieId: e
        })
    }
    
    // Add photo
    handleFile = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }
    
    
    //poste Description
    handlePoste = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    
    
    //profile Description
    handleProDesc = (e) => {
        this.setState({
            profileDescription: e.target.value
        })
    }
    
    //Dispo form
    handleDispo = (e) => {
        this.setState({
            dispo: e.target.value
        })
    }



    //Adresse form
    handleAdress = (e) => {
        this.setState({
            adresse: e.target.value
        })
    }

    //telephone form
    handleAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }


    //telephone form
    handleTelephone = (e) => {
        this.setState({
            telephone: e.target.value
        })
    }


    //email form
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    
    // NomPrenom form

    handleNomPrenom = (e) => {
        this.setState({
            nomPrenom: e.target.value
        })
    }
    
    // form diplôme
    handleEcole = (e) => {
        this.setState({
            ecole: e.target.value
        })
    }



    handleDateDiplome = (e) => {
        this.setState({
            dateDip: e.target.value
        })
    }

    handleDescriptionDip = (e) => {
        this.setState({
            descriptionDiplome: e.target.value
        })
    }
    
    
    //form experience
    handlesociete = (e) => {
        this.setState({
            societe: e.target.value
        })
    }



    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    handleDescriptionExp = (e) => {
        this.setState({
            descriptionExp: e.target.value
        })
    }
    
    // form Connaissance info
    onChangeLoisir = (e) => {

        this.setState({
            loisir: e.target.value
        })
    }

    // form Connaissance info
    onChangeApp = (e) => {

        this.setState({
            app: e.target.value
        })
    }

    // form progess informatique
    onChangeProgress = (e) => {

        this.setState({
            progress: e.target.value
        })
    }

    // Form langgaes
    onChangelangue = (e) => {

        this.setState({
            langue: e.target.value
        })
    }

    onChangeProgrelangue = (e) => {

        this.setState({
            progrelangue: e.target.value
        })
    }


    // section State remove experience
    handleRemoveItem = (societe, date, description) => {
        
        this.setState(prevState => ({
            experience: prevState.experience.filter(
                item => item.societeState !== societe
            )
        }));
    };

    // section State remove diplome
    handleRemoveDiplome = (ecole) => {
        
        this.setState(prevState => ({
            diplome: prevState.diplome.filter(
                item => item.ecoleState !== ecole
            )
        }));
    };

    // section State remove informaque
    handleRemoveInfo = (app) => {
        this.setState(prevState => ({
            informatk: prevState.informatk.filter(
                item => item.appState !== app
            )
        }));
    };

    // section State remove langage
    handleRemovelangue = (langue) => {
        this.setState(prevState => ({
            langage: prevState.langage.filter(
                item => item.langueState !== langue
            )
        }));
    };


    // section State remove Loisir
    handleRemoveloisir = (loisir) => {
        this.setState(prevState => ({
            loisArr: prevState.loisArr.filter(
                item => item.loisirState !== loisir
            )
        }))
    }

    render() {
        const conLangue = this.state.langage;
        const consInfork = this.state.informatk;
        const consLoisir = this.state.loisArr;
        const consExp = this.state.experience;
        const consDiplome = this.state.diplome;
        const categoriesPost = this.state.categories;
        console.log(this.state);
        return (
            <>

            <div className="adminx-content">
                <div className="adminx-main-content">  
                <div className="container-fluid">
                       
                    <nav aria-label="breadcrumb" role="navigation">
                        <ol className="breadcrumb adminx-page-breadcrumb">
                           <li className="breadcrumb-item"><a href="#">Tableau de bord</a></li>
                           <li className="breadcrumb-item"><a href="#">Formulaire</a></li>
                           <li className="breadcrumb-item active  aria-current=" page="">Ajouter un CV de candidat</li>
                       </ol>
                       </nav>

                       <div className="pb-3">
                            <h1>Ajouter un CV de candidat</h1>
                       </div>
                       <div className="row">
                        
                        <div className="col-4">
                            <div className="card mb-grid">
                                <div className="card-header">
                                    <div className="card-header-title">A propos du candidat</div>
                                </div>
                                <div className="card-body">
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Nom et prénom</label>
                                            <input defaultValue="" onChange={this.handleNomPrenom} className="form-control mb-2 input-credit-card" type="text" placeholder="Votre nom et prénom"/>
                                        </div>

                                        <div className="form-group">
                                        <label className="form-label">Poste</label>
                                                <select onChange={this.handlePoste} class="form-control" id="exampleFormControlSelect1">
                                                    {categoriesPost && categoriesPost.map(categorie => {
                                                        return (
                                                            <option value={categorie.id} >{categorie.categorie} </option>
                                                        )
                                                    })}
                                                </select>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="form-label" for="exampleFormControlSelect1">Combien d'année d'experience(s) avez vous sur ce post</label>
                                            <select onChange={this.handleAExp} class="form-control" id="exampleFormControlSelect1">
                                            <option >----</option>   
                                            <option >1 an</option>
                                            <option>2 ans</option>
                                            <option>3 ans</option>
                                            <option>4 ans</option>
                                            <option>5 ans</option>
                                            <option>+ de 5 ans</option>
                                            <option>+ de 10 ans</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input onChange={this.handleEmail} className="form-control input-numeral mb-2" type="text" placeholder="Votre e-mail"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Téléphone</label>
                                            <input onChange={this.handleTelephone} className="form-control input-prefix mb-2" placeholder='votre numero de téléphone'  type="number"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Age</label>
                                            <input onChange={this.handleAge} className="form-control input-prefix mb-2" placeholder='votre âge' type="number"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Adresse exacte</label>
                                            <input onChange={this.handleAdress} className="form-control input-prefix mb-2" type="text" placeholder='Votre adresse exacte'/>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="exampleFormControlSelect1">Disponiblité</label>
                                            <select onChange={this.handleDispo} class="form-control" id="exampleFormControlSelect1">
                                            <option >----</option>
                                            <option >Disponible immédiat</option>
                                            <option>Temps plein</option>
                                            <option>Temps partiel</option>
                                            <option>Freelance</option>
                                            <option>Indisponible</option>
                                            <option>Overt à toutes proposition</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="exampleFormControlSelect1">Nationalité</label>
                                            <select onChange={this.handleNation} class="form-control" id="exampleFormControlSelect1">
                                                <option >----</option>
                                                <option >Malgache</option>
                                                <option>Mauricen</option>
                                                <option>Autre resident Madagascar</option>
                                                <option>Autre resident Maurice</option>
                                            </select>
                                        </div>

                                    </>
                                </div>

                                </div>
                                <div className="card-body">
                                    <div className="card mb-grid">
                                        <div className="card-header">
                                            <div className="card-header-title">Photo</div>
                                        </div>                               
                                    
                                        <div className="form-group">
                                            <label className="form-label">Ajouter une photo</label>
                                                <input onChange={this.handleFile} className="form-control mb-2 input-credit-card" 
                                                type="file" placeholder="Ecole" />
                                    </div>
                                </div>

                                {/* colonne */}
                                <div className="card mb-grid">
                                    <div className="card-header">
                                        <div className="card-header-title">Description du candidat</div>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                        <label className="form-label">Description du profile</label>
                                            <textarea required onChange={this.handleProDesc} className="form-control mb-2 input-credit-card" 
                                            type="textarea" placeholder="A propos de vous" rows="5" maxLength={650} >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                                <div className="card mb-grid">
                                    <div className="card-header">
                                        <div className="card-header-title">Experience</div>
                                    </div>
                                        <div className="card-body">
                                            {consExp ? (<>
                                                {consExp && consExp.map(exp => {
                                                    return (
                                                        <>
                                                            <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                                                <div class="d-flex justify-content-between ">
                                                                    <div class="toast-body">
                                                                    {exp.societeState},<br/> {exp.descriptionState} <br/>{exp.dateState}
                                                                    </div>
                                                                    <button class="btn btn-danger" title='Effacer' onClick={() => this.handleRemoveItem(exp.societeState, exp.descriptionState, exp.dateState)}> <i class="bi bi-x-lg"></i></button>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                        </>
                                                    )
                                                })}
                                            </>) : (<></>)}
                                            <form> 
                                                <div>
                                                    <div className="form-group">
                                                        <label className="form-label">Nom de l'entreprise</label>
                                                            <input required onChange={this.handlesociete} className="form-control mb-2 input-credit-card" 
                                                            type="textarea" placeholder="Société" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="form-group">
                                                        <label className="form-label">Date</label>
                                                            <input required onChange={this.handleDate} className="form-control mb-2 input-credit-card" 
                                                            type="text" placeholder="Exemple: 2020-2025" />
                                                    </div>
                                                </div>

                                                <label className="form-label">Description du poste</label>
                                                    <textarea required onChange={this.handleDescriptionExp} className="form-control mb-2 input-credit-card" 
                                                    type="textarea" placeholder="Description de votre post" rows="3" maxLength={250} >
                                                    </textarea>
                                                    <br/>
                                                <button type='reset' class="btn btn-primary mr-2" onClick={this.handleClickExp} >
                                                    {consExp.length > 0 ?(<><strong>+</strong>&nbsp;Ajouter</>):(<>Ajouter</>)}
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                 {/* colonne */}
                                <div className="card mb-grid">
                                    <div className="card-header">
                                        <div className="card-header-title">Diplômes et formations</div>
                                    </div>
                                    <div className="card-body">
                                        {consDiplome ? (
                                            <>
                                                {consDiplome && consDiplome.map(diplo => {
                                                    return (
                                                        <>
                                                            <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                                                <div class="d-flex justify-content-between ">
                                                                    <div class="toast-body">
                                                                        {diplo.ecoleState},<br/> {diplo.dateDipState} <br/>{diplo.descriptionDipState}
                                                                    </div>
                                                                    <button class="btn btn-danger" title='Effacer' onClick={() => this.handleRemoveDiplome(diplo.ecoleState, diplo.dateDipState, diplo.descriptionDipState)}> <i class="bi bi-x-lg"></i></button>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                        </>
                                                    )
                                                })}
                                            </>
                                        ):(<></>)}
                                        <form>
                                            <div >
                                                <div className="form-group">
                                                    <label className="form-label">Nom de l'institution</label>
                                                        <input onChange={this.handleEcole} className="form-control mb-2 input-credit-card" 
                                                        type="textarea" placeholder="Ecole" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="form-group">
                                                    <label className="form-label">Date</label>
                                                        <input onChange={this.handleDateDiplome} className="form-control mb-2 input-credit-card" 
                                                        type="text" placeholder="Exemple: 2025-2030" />
                                                </div>
                                            </div>

                                            <label className="form-label">Description de votre étude ou formation</label>
                                                <input onChange={this.handleDescriptionDip} className="form-control mb-2 input-credit-card" 
                                                type="textarea" placeholder="Description de votre diplôme" />

                                            <button type='reset' class="btn btn-primary mr-2" onClick={this.handleClickDipl} >
                                                {consDiplome.length > 0 ?(<><strong>+</strong>&nbsp;Ajouter</>):(<>Ajouter</>)}
                                            </button>
                                        </form>
                                    </div>
                                </div> 


                                <div className="card mb-grid">
                                <div className="card-header">
                                    <div className="card-header-title">Connaissance en informatique</div>
                                </div>
                                <div className="card-body">
                                    {consInfork ? (
                                        <>
                                            {consInfork && consInfork.map(info => {
                                                return (
                                                    <>
                                                        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                                            <div class="d-flex justify-content-between ">
                                                                <div class="toast-body">
                                                                    {info.appState},<br/> {info.progresState} %
                                                                </div>
                                                                <button class="btn btn-danger" title='Effacer' onClick={() => this.handleRemoveInfo(info.appState)}> <i class="bi bi-x-lg"></i></button>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                    </>
                                                )
                                            })}
                                        </>
                                    ):(<></>)}
                                    <form>
                                        <div >
                                            <div className="form-group">
                                                <label className="form-label">Connaissance</label>
                                                    <input className="form-control mb-2 input-credit-card" 
                                                    type="text" onChange={this.onChangeApp} placeholder="Logiciel ou autres application" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="form-group">
                                                <label className="form-label">Progression (echelle jusqu'à 100 %)</label>
                                                    <input className="form-control mb-2 input-credit-card" 
                                                    type="number" onChange={this.onChangeProgress} placeholder="0-100" min={0} max={100} />
                                            </div>
                                        </div>

                                        <button type='reset' class="btn btn-primary mr-2" onClick={this.handleClickInfo} >
                                            {consInfork.length > 0 ?(<><strong>+</strong>&nbsp;Ajouter</>):(<>Ajouter</>)}
                                        </button>
                                    </form>
                                </div>   
                            </div>

                           

                            <div className="card mb-grid">
                                <div className="card-header">
                                    <div className="card-header-title">Langues</div>
                                </div>
                                <div className="card-body">
                                    {conLangue ? (
                                        <>
                                            {conLangue && conLangue.map(langue => {
                                                return (
                                                    <>
                                                        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                                            <div class="d-flex justify-content-between ">
                                                                <div class="toast-body">
                                                                    {langue.langueState},<br/> {langue.progresLangueState} %
                                                                </div>
                                                                <button class="btn btn-danger" title='Effacer' onClick={() => this.handleRemovelangue(langue.langueState)}> <i class="bi bi-x-lg"></i></button>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                    </>
                                                )
                                            })}
                                        </>
                                    ):(<></>)}
                                    <form>
                                        <div >
                                            <div className="form-group">
                                                <label className="form-label">Ajouter une langue</label>
                                                    <input className="form-control mb-2 input-credit-card" 
                                                    type="text" onChange={this.onChangelangue} placeholder="Ajouter une langue" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="form-group">
                                                <label className="form-label">Progression (echelle jusqu'à 100 %)</label>
                                                    <input className="form-control mb-2 input-credit-card" 
                                                    type="number" onChange={this.onChangeProgrelangue} placeholder="0-100" min={0} max={100} />
                                            </div>
                                        </div>

                                        <button type='reset' class="btn btn-primary mr-2" onClick={this.handleClicklangue} >
                                            {conLangue.length > 0 ?(<><strong>+</strong>&nbsp;Ajouter</>):(<>Ajouter</>)}
                                        </button>
                                    </form>
                            </div>                               
                            
                        </div>
                        <div className="card mb-grid">
                                <div className="card-header">
                                    <div className="card-header-title">Loisirs</div>
                                </div>
                                <div className="card-body">
                                    {consLoisir ? (
                                        <>
                                            {consLoisir && consLoisir.map(loisir => {
                                                return (
                                                    <>  
                                                        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                                            <div class="d-flex justify-content-between ">
                                                                <div class="toast-body">
                                                                    {loisir.loisirState}
                                                                </div>
                                                                <button class="btn btn-danger" title='Effacer' onClick={() => this.handleRemoveloisir(loisir.loisirState)}> <i class="bi bi-x-lg"></i></button>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                    </>
                                                )
                                            })}
                                        </>
                                    ):(<></>)}
                                    <form>
                                        <div >
                                            <div className="form-group">
                                                <label className="form-label">Ajouter une Loisir</label>
                                                    <input onChange={this.onChangeLoisir} className="form-control mb-2 input-credit-card" 
                                                    type="text" placeholder="Ajouter une loisir" />
                                            </div>
                                        </div>
                                        <button type='reset' class="btn btn-primary mr-2" onClick={this.handleClickLoisir} >
                                            {consLoisir.length > 0 ?(<><strong>+</strong>&nbsp;Ajouter</>):(<>Ajouter</>)}
                                        </button>
                                    </form>
                            </div>                               
                            
                        </div>
                        </div>                     
                      <div className='col-8' >
                        <div class="sticky-top" key='uniqueKey' >
                                <CV_template data={this.state} />
                        </div>
                      </div>
                        </div>
                   </div>
                    </div>
               </div>
                       
               
            </>
        )
    }
}

export default Addcandidat;