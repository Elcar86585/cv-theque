import React from 'react';
import Navebarmenu from './components/Navebarmenu.js';
import Sidebar from './components/Sidebar.js';
import Homepage from './pages/Homepage.js';
import Candidat from './pages/Candidat.js';
import Profile from './pages/Profile.js';
import User from './pages/user/User.js';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';
import Addcandidat from './pages/candidat/Addcandidat.js';
import Categorie from './pages/categorie/Categorie.js';
import CV_candidat from './pages/cv-candidat/CV_candidat.js';
import Login from './pages/login/Login.js';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404/Page404.js';
import DemandeLogin from './pages/formulaire/DemandeLogin.js';
import Notification from './pages/notification/Notifications.js';
import Accueil from './pages/accueil/Accueil.js';
import EditCV from './pages/editionCv/EditCv.js';




class App extends React.Component {
  state={
    user: ''
  }

  componentDidMount = () => {
    if(sessionStorage.curent_user){
      this.getUser()
    }
  }

  
  getUser = () => {
    const id = sessionStorage.curent_user
    axios.get(`users/${id}`).then(resp => {
      this.setState({
        user: resp.data
      })
    })
  }

  render () {
    const userLog = this.state.user;
    const tokenUser = this.state.user.authentication_token
    const compare = sessionStorage.user_token === tokenUser
    let page;
    if(sessionStorage.user_token){
      page = (
        <>            
          <Route exact path="categories" element={<Categorie />} />
          <Route exact path="profile" element={<Profile user={userLog} />} />
          <Route exact path="utilisateurs" element={<User />} />
          <Route exact path="cv/:id" element={<CV_candidat />} />
          <Route exact path="/notifications" element={<Notification />} />
          <Route exact path="ajoute-candidat" element={<Addcandidat />} />  
          <Route exact path="/" element={<Homepage user={userLog} />}/>  
          <Route exact path="candidats/:id" element={<Candidat user={userLog} />} />
          <Route exact path='editCv' element={<EditCV />} />
        </>
      )
    }else {
      page = (
        <> 
          <Route exact path='se-connecter' element={<Login/>} />
          <Route exact path="ajoute-candidat" element={<Addcandidat/>} /> 
          <Route exact path="*" element={<Page404/>} />
          <Route exact path='/formulaire' element={<DemandeLogin />} />
          <Route exact path="/" element={<Accueil />} />
        </>
      )
    }
    return (
      <>
        <div className="adminx-container">
          <BrowserRouter>
              <Navebarmenu />
              <Sidebar user={this.state.user} />
                <Routes> 
                  {page}
                </Routes>
                <NotificationContainer />
          </BrowserRouter>
        </div>
      </>
    )
  }
}
export default App;

