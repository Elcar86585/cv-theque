import React from "react";
import axios from "axios";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Loader from "../../Loader";
import CandidateInfo from "./CandidateInfo";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Language from "./Language";
import OtherSkills from "./OtherSkills";
import CVTemplate from "./CVTemplate";

class Addcandidat extends React.Component {
  componentDidMount = () => {
    this.getApi();
  };

  state = {
    app: "",
    progress: "",
    informatk: [],
    langue: "",
    progrelangue: "",
    langage: [],
    loisArr: [],
    loisir: "",
    societe: "",
    date: "",
    descriptionExp: "",
    experience: [],
    ecole: "",
    dateDip: "",
    descriptionDiplome: "",
    diplome: [],
    nomPrenom: "",
    email: "",
    categories: [],
    telephone: "",
    age: "",
    adresse: "",
    dispo: "",
    profileDescription: "",
    category: "",
    photo: null,
    categorieId: "",
    facebook: "",
    linkedin: "",
    nation: "",
    aExp: "",
    contrat: "",
    sousCategorie: [],
    sousCat: "",
    ip: {},
    nationnalite: "",
    codall: "",
    resume: null,
    prenom: "",
    dateFinExp: "",
    dateFinDiplo: "",
    pretention: "",
    money: "",
    salaire: "",
    dateDispo: "",
    telephone1: "",
    telephone2: "",
    loader: true,
  };

  getApi = () => {
    axios
      .get("https://ipapi.co/json")
      .then((resp) => {
        this.setState({ ip: resp.data });
      })
      .catch((error) => console.log(error));
  };

  handledateDispo = (e) => {
    if (this.state.dispo === "Disponible immédiat") {
      this.setState({ dateDispo: null });
    } else {
      this.setState({
        dateDispo: e.target.value,
      });
    }
  };

  //onclik Loisir buttn
  handleClickLoisir = () => {
    const loisirState = this.state.loisir;
    this.setState((prevState) => ({
      loisArr: [{ loisirState }, ...prevState.loisArr],
    }));
  };

  //onclik informatique
  handleClickInfo = () => {
    const appState = this.state.app;
    const progresState = this.state.progress;
    this.setState((prevState) => ({
      informatk: [{ appState, progresState }, ...prevState.informatk],
    }));
  };

  // oncklik langue
  handleClicklangue = () => {
    const langueState = this.state.langue;
    const progresLangueState = this.state.progrelangue;
    this.setState((prevState) => ({
      langage: [{ langueState, progresLangueState }, ...prevState.langage],
    }));
  };

  //onclick experience

  handleClickExp = () => {
    const societeState = this.state.societe;
    const dateState = this.state.date;
    const descriptionState = this.state.descriptionExp;
    const dateFinExp = this.state.dateFinExp;
    this.setState((prevState) => ({
      experience: [
        { societeState, dateState, descriptionState, dateFinExp },
        ...prevState.experience,
      ],
    }));
  };

  // onClick Diplome

  handleClickDipl = () => {
    const ecoleState = this.state.ecole;
    const dateDipState = this.state.dateDip;
    const descriptionDipState = this.state.descriptionDiplome;
    const dateFinDilpoState = this.state.dateFinDiplo;
    this.setState((prevState) => ({
      diplome: [
        { ecoleState, dateDipState, descriptionDipState, dateFinDilpoState },
        ...prevState.diplome,
      ],
    }));
  };

  // ==============================================================================================================

  componentDidMount = () => {
    this.getCategories();
    this.getSousCategorie();
  };

  getCategories = () => {
    axios
      .get("categorie_cvs")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            categories: response.data,
          });

          setTimeout(() => {
            this.setState({ loader: false });
          }, 3000);
        }
      })
      .catch((error) => console.log(error));
  };

  getSousCategorie = () => {
    axios
      .get("sous_categories")
      .then((resp) => {
        this.setState({ sousCategorie: resp.data });
      })
      .catch((error) => console.log(error));
  };

  // ===============================================================================================================

  handleFacebook = (e) => {
    this.setState({
      facebook: e.target.value,
    });
  };

  handleLinkedin = (e) => {
    this.setState({
      linkedin: e.target.value,
    });
  };

  handleNation = (e) => {
    this.setState({
      nation: e.target.value,
    });
  };

  handleAExp = (e) => {
    this.setState({
      aExp: e.target.value,
    });
  };

  // Select Categorie

  handleSelect = (e) => {
    this.setState({
      categorieId: e,
    });
  };

  // Add photo
  handleFile = (e) => {
    this.setState({
      photo: e.target.files[0],
    });
  };

  //poste Description
  handlePoste = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  //Add sous categorie
  handleSousCat = (e) => {
    this.setState({
      sousCat: e.target.value,
    });
  };

  //profile Description
  handleProDesc = (e) => {
    this.setState({
      profileDescription: e.target.value,
    });
  };

  //Dispo form
  handleDispo = (e) => {
    this.setState({
      dispo: e.target.value,
    });
  };

  //Adresse form
  handleAdress = (e) => {
    this.setState({
      adresse: e.target.value,
    });
  };

  //telephone form
  handleAge = (e) => {
    let date_moment = moment().format("YYYY-MM-DD");
    const old = e.target.value;
    let yearNow = moment(date_moment).year();
    let yearProfil = moment(old).year();
    const ageProfil = yearNow - yearProfil;
    if (ageProfil < 18) {
      NotificationManager.warning("Vous êtes mineur", "Erreur", 4000);
    } else {
      this.setState({
        age: e.target.value,
      });
    }
  };

  //telephone form
  handleTelephone = (e) => {
    this.setState({
      telephone: this.state.codall + "." + e.target.value,
    });
  };

  handleTelephone1 = (e) => {
    this.setState({
      telephone1: this.state.codall + "." + e.target.value,
    });
  };

  handleTelephone2 = (e) => {
    this.setState({
      telephone2: this.state.codall + "" + e.target.value,
    });
  };

  //email form
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // NomPrenom form

  handleNomPrenom = (e) => {
    this.setState({
      nomPrenom: e.target.value,
    });
  };

  handleNationnalite = (e) => {
    this.setState({
      nationnalite: e.target.value,
    });
  };

  // form diplôme
  handleEcole = (e) => {
    this.setState({
      ecole: e.target.value,
    });
  };

  handleDateDiplome = (e) => {
    this.setState({
      dateDip: e.target.value,
    });
  };

  handleDescriptionDip = (e) => {
    this.setState({
      descriptionDiplome: e.target.value,
    });
  };

  //form experience
  handlesociete = (e) => {
    this.setState({
      societe: e.target.value,
    });
  };

  handleContrat = (e) => {
    this.setState({
      contrat: e.target.value,
    });
  };

  handleDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  handleDescriptionExp = (e) => {
    this.setState({
      descriptionExp: e.target.value,
    });
  };

  // form Connaissance info
  onChangeLoisir = (e) => {
    this.setState({
      loisir: e.target.value,
    });
  };

  // form Connaissance info
  onChangeApp = (e) => {
    this.setState({
      app: e.target.value,
    });
  };

  // form progess informatique
  onChangeProgress = (e) => {
    this.setState({
      progress: e.target.value,
    });
  };

  // Form langgaes
  onChangelangue = (e) => {
    this.setState({
      langue: e.target.value,
    });
  };

  onChangeProgrelangue = (e) => {
    this.setState({
      progrelangue: e.target.value,
    });
  };

  // section State remove experience
  handleRemoveItem = (societe, date, description) => {
    this.setState((prevState) => ({
      experience: prevState.experience.filter(
        (item) => item.societeState !== societe
      ),
    }));
  };

  // section State remove diplome
  handleRemoveDiplome = (ecole) => {
    this.setState((prevState) => ({
      diplome: prevState.diplome.filter((item) => item.ecoleState !== ecole),
    }));
  };

  // section State remove informaque
  handleRemoveInfo = (app) => {
    this.setState((prevState) => ({
      informatk: prevState.informatk.filter((item) => item.appState !== app),
    }));
  };

  // section State remove langage
  handleRemovelangue = (langue) => {
    this.setState((prevState) => ({
      langage: prevState.langage.filter((item) => item.langueState !== langue),
    }));
  };

  // section State remove Loisir
  handleRemoveloisir = (loisir) => {
    this.setState((prevState) => ({
      loisArr: prevState.loisArr.filter((item) => item.loisirState !== loisir),
    }));
  };

  handleCodeCall = (code) => {
    this.setState({
      codall: code.target.value,
    });
  };

  handleResume = (e) => {
    this.setState({
      resume: e.target.files[0],
    });
  };

  handlePrenom = (e) => {
    this.setState({
      prenom: e.target.value,
    });
  };

  handleDateExpFin = (e) => {
    this.setState({
      dateFinExp: e.target.value,
    });
  };

  handleDatefinDiplo = (e) => {
    this.setState({
      dateFinDiplo: e.target.value,
    });
  };

  handlePretention = (e) => {
    this.setState({
      pretention: e.target.value + " " + this.state.money,
    });
  };

  render() {
    const conLangue = this.state.langage;
    const consInfork = this.state.informatk;
    const consLoisir = this.state.loisArr;
    const consExp = this.state.experience;
    const consDiplome = this.state.diplome;
    const categoriesPost = this.state.categories;
    const sousCat = this.state.sousCategorie;
    const alpha = categoriesPost.sort((a, b) =>
      a.categorie.localeCompare(b.categorie)
    );
    const dates = [];
    for (let year = 1990; year <= 2040; year++) {
      dates.push(`${year}`);
    }

    const pourcentages = [];
    for (let number = 10; number <= 100; number += 10) {
      pourcentages.push(`${number}`);
    }

    if (this.state.loader === true) {
      return <Loader />;
    }

    return (
      <>
        <div className="adminx-content">
          <div className="adminx-main-content">
            <div className="container-fluid">
              <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb adminx-page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Accueil</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Formulaire</a>
                  </li>
                  <li className="breadcrumb-item active  aria-current=" page="">
                    Ajouter un CV de candidat
                  </li>
                </ol>
              </nav>

              <div className="pb-3">
                <h1>Ajouter un CV de candidat</h1>
              </div>
              <div className="row">
                <div className="col-4">
                  <CandidateInfo
                    category={this.state.category}
                    alpha={alpha}
                    sousCat={sousCat}
                    handleNomPrenom={this.handleNomPrenom}
                    handlePrenom={this.handlePrenom}
                    handlePoste={this.handlePoste}
                    handleSousCat={this.handleSousCat}
                    handleAExp={this.handleAExp}
                    handleEmail={this.handleEmail}
                    handleCodeCall={this.handleCodeCall}
                    handleTelephone={this.handleTelephone}
                    handleTelephone1={this.handleTelephone1}
                    handleTelephone2={this.handleTelephone2}
                    handleAge={this.handleAge}
                    handleAdress={this.handleAdress}
                    handleFacebook={this.handleFacebook}
                    handleLinkedin={this.handleLinkedin}
                    handlePretention={this.handlePretention}
                    handleDispo={this.handleDispo}
                    handledateDispo={this.handledateDispo}
                    handleContrat={this.handleContrat}
                    handleNation={this.handleNation}
                    handleNationnalite={this.handleNationnalite}
                    dispo={this.state.dispo}
                  />
                  <div className="">
                    <div className="card mb-grid">
                      <div className="card-header">
                        <div className="card-header-title">Photo</div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label className="form-label">
                            Ajouter une photo
                          </label>
                          <input
                            onChange={this.handleFile}
                            className="form-control mb-2 input-credit-card"
                            type="file"
                            placeholder="Ecole"
                          />
                        </div>
                      </div>
                    </div>

                    {/* colonne */}
                    <div className="card mb-grid">
                      <div className="card-header">
                        <div className="card-header-title">
                          Description du candidat
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label className="form-label">
                            Description du profile
                          </label>
                          <textarea
                            required
                            onChange={this.handleProDesc}
                            className="form-control mb-2 input-credit-card"
                            type="textarea"
                            placeholder="A propos de vous"
                            rows="5"
                            maxLength={650}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Experience
                    consExp={consExp}
                    dates={dates}
                    handlesociete={this.handlesociete}
                    handleDate={this.handleDate}
                    handleDateExpFin={this.handleDateExpFin}
                    handleDescriptionExp={this.handleDescriptionExp}
                    handleClickExp={this.handleClickExp}
                  />

                  {/* colonne */}
                  <Education
                    consDiplome={consDiplome}
                    dates={dates}
                    handleEcole={this.handleEcole}
                    handleDateDiplome={this.handleDateDiplome}
                    handleDatefinDiplo={this.handleDatefinDiplo}
                    handleDescriptionDip={this.handleDescriptionDip}
                    handleClickDipl={this.handleClickDipl}
                  />

                  <Skills
                    consInfork={consInfork}
                    pourcentages={pourcentages}
                    onChangeApp={this.onChangeApp}
                    onChangeProgress={this.onChangeProgress}
                    handleClickInfo={this.handleClickInfo}
                  />

                  <Language
                    conLangue={conLangue}
                    pourcentages={pourcentages}
                    onChangelangue={this.onChangelangue}
                    onChangeProgrelangue={this.onChangeProgrelangue}
                    handleClicklangue={this.handleClicklangue}
                  />

                  <OtherSkills
                    consLoisir={consLoisir}
                    onChangeLoisir={this.onChangeLoisir}
                    handleClickLoisir={this.handleClickLoisir}
                  />
                  <div className="card mb-grid">
                    <div className="card-header">
                      <div className="card-header-title">Votre CV</div>
                    </div>
                    <div className="card-body">
                      <form>
                        <div>
                          <div className="form-group">
                            <label className="form-label">
                              Télécharger votre CV
                            </label>
                            <input
                              onChange={this.handleResume}
                              className="form-control mb-2 input-credit-card"
                              type="file"
                              placeholder="Ajouter une loisir"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div class="sticky-top" key="uniqueKey">
                    <CVTemplate data={this.state} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Addcandidat;
