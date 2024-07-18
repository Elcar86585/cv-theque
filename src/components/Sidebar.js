import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ user }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('categorie_cvs').then(resp => {
            if (resp.status === 200) {
                setCategories(resp.data);
            }
        });
    }, []);

    const handleClickDecon = () => {
        localStorage.clear();
        window.location.replace('/cvtheque');
    };

    const userMenu = localStorage.user_token && (
        user.role === 'Administrateur' ? (
            <>
                <SidebarItem to="/utilisateurs" icon="bi bi-person-circle" label="Utilisateurs" />
                <SidebarItem to="/categories" icon="bi bi-list-task" label="Liste des Categories" />
                <SidebarItem to="/table" icon="bi bi-file-earmark-person-fill" label="Candidat" />
                <SidebarItem to="/notifications" icon="bi bi-bell-fill" label="Notifications" />
                <SidebarItem to="/cv" icon="bi bi-file-earmark-richtext-fill" label="Tous les CV" />
            </>
        ) : (
            <>
                <SidebarItem to="/profile" icon="bi bi-person-fill" label="Profile" />
                <SidebarItem to="/notification" icon="bi bi-bell-fill" label="Notifications" />
                <SidebarItem to="/favoris" icon="bi bi-star-fill" label="Favoris" />
                <hr />
                {categories.map(categorie => (
                    <SidebarItem key={categorie.id} to={`/candidats/${categorie.id}`} icon="bi bi-folder-fill" label={categorie.categorie} count={<GetCategoryCvcount dId={categorie.id} />}>
                        {/* <GetSousCat datar={categorie.id} /> */}
                    </SidebarItem>
                ))}
            </>
        )
    );

    return (
        localStorage.user_token && (
            <div className="adminx-sidebar expand-hover push">
                <ul className="sidebar-nav">
                    <SidebarItem to="/" icon="bi bi-house" label="Tableau de bord" />
                    {userMenu}
                    <SidebarItem icon="bi bi-box-arrow-right" label="Deconnexion" onClick={handleClickDecon} />
                </ul>
            </div>
        )
    );
};

const SidebarItem = ({ to, icon, label, count, onClick, children }) => (
    <li className="sidebar-nav-item">
        {to ? (
            <NavLink to={to} className="sidebar-nav-link">
                <div className="sidebar-nav-icon">
                    <i style={{ fontSize: '20px' }} className={icon}></i>
                </div>
                <span className="sidebar-nav-name">{label} {count}</span>
                {children}
            </NavLink>
        ) : (
            <a href="#" className="sidebar-nav-link" onClick={onClick}>
                <div className="sidebar-nav-icon">
                    <i style={{ fontSize: '20px' }} className={icon}></i>
                </div>
                <span className="sidebar-nav-name">{label}</span>
                {children}
            </a>
        )}
    </li>
);

const GetSousCat = ({ datar }) => {
    const [sousCat, setSousCat] = useState([]);

    useEffect(() => {
        if (datar) {
            axios.get(`categorie_cvs/${datar}`).then(resp => {
                setSousCat(resp.data.sousCategorie);
            }).catch(console.log);
        }
    }, [datar]);

    return (
        sousCat.length > 0 && (
            <ul className="sidebar-nav">
                {sousCat.map(sc => (
                    <SidebarItem key={sc.id} to={`/souscategorie/${sc.id}`} icon="bi bi-grid-fill" label={sc.categorie} />
                ))}
            </ul>
        )
    );
};

const GetCategoryCvcount = ({ dId }) => {
    const [cvCounter, setCvCounter] = useState('');

    useEffect(() => {
        axios.get(`categorie_cvs/${dId}`).then(resp => {
            if (resp.status === 200) {
                setCvCounter(resp.data.counter);
            }
        });
    }, [dId]);

    return <b>({cvCounter})</b>;
};

export default Sidebar;
