import React from 'react';
import './App.css';
import Navebarmenu from './components/Navebarmenu.js';
import Sidebar from './components/Sidebar.js';
import Homepage from './pages/Homepage.js';
import Candidat from './pages/Candidat.js';
import Profile from './pages/Profile.js';
import User from './pages/user/User.js';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import Addcandidat from './pages/candidat/Addcandidat.js';
import Categorie from './pages/categorie/Categorie.js';
import CV_candidat from './pages/cv-candidat/CV_candidat.js';
import Login from './pages/login/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404/Page404.js';
import DemandeLogin from './pages/formulaire/DemandeLogin.js';
import Notification from './pages/notification/adminNotification/Notifications.js';
import Accueil from './pages/accueil/Accueil.js';
import EditCV from './pages/editionCv/EditCv.js';
import Table from './pages/table/Table.js';
import UserNotification from './pages/notification/UserNotification.js';
import IdSearch from './pages/home/IdSearch.js';
import Favorit from './pages/notification/Favorit.js';
import AllCv from './pages/AllCv';
import SingleUser from './pages/user/singleUser/SingleUser';




class App extends React.Component {
  state = {
    user: '',
    search: '',
    userDemande: '',
    userFavoris: '',
  }

  componentDidMount = () => {
    if (localStorage.curent_user) {
      this.getUser()
    }
  }


  getUser = () => {
    const id = localStorage.curent_user
    axios.get(`users/${id}`).then(resp => {
      if (resp.status === 200) {
        this.setState({
          user: resp.data.user
        })
        this.setState({
          userDemande: resp.data.entretien
        })
        this.setState({
          userFavoris: resp.data.favo
        })
      } else {
        NotificationManager.danger('Une erreur est survenue lors de la traitement de votre requêtte', 'ERREUR', 10000)
      }
    }).catch(error => {console.log(error)})
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  handleDeleteSearch = () => {
    this.setState({search: ''})
  }

  render() {
    const userLog = this.state.user;
    const tokenUser = this.state.user.authentication_token
    const compare = localStorage.user_token === tokenUser
    if (localStorage.user_token) {
      if (compare === true) {
        let admin;
        if(userLog.role === 'Administrateur'){
          admin = (
            <>
              <Route exact path="categories" element={<Categorie />} />
              <Route exact path="/notifications" element={<Notification />} />
              <Route exact path='editCv/:id' element={<EditCV />} />
              <Route exact path='/table' element={<Table />} />
              <Route exact path='/user/:id' element={<SingleUser id={userLog} />} />
            </>
          )
        }
        return (
          <>
            <div className="adminx-container">
              <BrowserRouter>
                <Navebarmenu fonction={this.handleSearch} user={this.state.user} />
                <Sidebar user={this.state.user} />
                {this.state.search ? (
                  <>
                    <IdSearch recherche={this.state.search} fonc={this.handleDeleteSearch} />
                  </>
                ):(<>
                  <Routes>
                    {admin}
                    <Route exact path="cv/:id" element={<CV_candidat user={userLog} />} />
                    <Route exact path="candidats/:id" element={<Candidat user={userLog} />} />
                    <Route exact path="profile" element={<Profile user={userLog} />} />
                    <Route exact path="utilisateurs" element={<User />} />
                    <Route exact path="ajoute-candidat" element={<Addcandidat />} />
                    <Route exact path="/" element={<Homepage user={userLog} />} />
                    <Route exact path='/notification' element={<UserNotification user={this.state.userDemande} id={userLog} />} />
                    <Route exact path='/favoris' element={<Favorit fav={this.state.userFavoris} id={userLog} />} />
                    <Route exact path='/cv' element={<AllCv user={userLog} />} />
                  </Routes>
                </>)}
                <NotificationContainer />
              </BrowserRouter>
            </div>
          </>
        )
      }
    } else {
      return (
        <>
          <div className="adminx-container">
            <BrowserRouter>
              <Navebarmenu fonction={this.handleSearch} user={this.state.user} />
              <Sidebar user={this.state.user} />
              <Routes>
                <Route exact path='se-connecter' element={<Login />} />
                <Route exact path="ajoute-candidat" element={<Addcandidat />} />
                <Route exact path="*" element={<Page404 />} />
                <Route exact path='/formulaire' element={<DemandeLogin />} />
                <Route exact path="/" element={<Accueil />} />
              </Routes>
              <NotificationContainer />
            </BrowserRouter>
          </div>
        </>
      )
    }
  }
}
export default App;

