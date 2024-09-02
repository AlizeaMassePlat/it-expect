// == Import
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Team from '../../pages/Team';
import About from '../../pages/About';
import CGU from '../../pages/CGU';
import Connexion from '../../pages/Connexion';
import Inscription from '../../pages/Inscription';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import Home from '../../pages/Home';
import Policy from '../../pages/Policy';
import useScrollTop from '../../hooks/useScrollTop';
import Contact from '../../pages/Contact';
import MyAccount from '../../pages/MyAccount';
import Profile from '../../pages/Profile';
import AccessibilityMenu from '../AccessibilityMenu';
import NotFound from '../../pages/404';
import Annonce from '../../pages/Annonce';
import SearchPage from '../../pages/Search';
import CreatePost from '../../pages/CreatePost';
import { setUser } from '../../actions';
import ForgottenPassword from '../../pages/ForgottenPassword';
import ResetPassword from '../../pages/ResetPassword';
import Categories from '../../pages/Categories';
import './styles.scss';
import Category from '../../pages/Category';
import Type from '../../pages/Type';
import ModifyPublicInfo from '../../pages/MyAccount/ModifyPublicInfo';
import ModifyPersonalInfo from '../../pages/MyAccount/ModifyPersonalInfo';
import EditProfilPicture from '../../pages/EditProfilPic';
import DeleteAccount from '../../pages/DeleteAccount';
import ResetEmail from '../../pages/ResetEmail';

// == Composant
function App() {
  useScrollTop();
  const [passwordToken, setPasswordToken] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // If token is expired clear localStorage
  // const tokenDate = localStorage.getItem('token-date');
  // const date = Math.floor(new Date().getTime() / 1000);
  // const isExpired = date - tokenDate > 1200;
  // if (isLogged && isExpired) {
  //   dispatch(logOut());
  // }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      dispatch(setUser({ user, token }));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/nouveau-mot-de-passe') {
      setPasswordToken(location.search.slice(1));
    }
  }, [passwordToken]);

  return (
    <div className="app">
      <AccessibilityMenu />
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<Category />} />
        <Route path="/annonces/:id" element={<Annonce />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/CGU" element={<CGU />} />
        <Route path="/politique-de-confidentialite" element={<Policy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profil/:id" element={<Profile />} />
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="/besoin" element={<Type id={1} />} />
        <Route path="/partage" element={<Type id={2} />} />
        <Route path="/oubli-mot-de-passe" element={<ForgottenPassword />} />
        {passwordToken && <Route path="/nouveau-mot-de-passe" element={<ResetPassword token={passwordToken} />} />}
        <Route path="*" element={<NotFound />} />

        {/* Private */}
        {isLogged
        && (
          <>
            <Route path="/annonces/ajouter" element={<CreatePost />} />
            <Route path="/mon-compte" element={<MyAccount />} />
            <Route path="/mon-compte/modifier-profil-public" element={<ModifyPublicInfo />} />
            <Route path="/mon-compte/modifier-info-perso" element={<ModifyPersonalInfo />} />
            <Route path="/mon-compte/modifier-avatar" element={<EditProfilPicture />} />
            <Route path="/modifier-email" element={<ResetEmail />} />
            <Route path="/modifier-mot-de-passe" element={<ResetPassword token={token} />} />
            <Route path="/supprimer-mon-compte" element={<DeleteAccount />} />
          </>
        )}
      </Routes>
      <AppFooter />
    </div>
  );
}

// == Export
export default App;
