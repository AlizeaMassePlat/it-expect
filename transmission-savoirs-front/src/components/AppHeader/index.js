import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Button from '../Button';
import Logo from '../Logo';
import searchIcon from './search.svg';
import { logOut } from '../../actions';

import './style.scss';
import LogoutIcon from '../LogoutIcon';

function AppHeader() {
  const isLogged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };
  return (
    <nav className="main-nav" aria-label="Navigation">
      <Link to="/" className="main-nav__logo"><Logo /></Link>
      <ul className="main-nav__list">
        <li className="main-nav__item main-nav__item--search">
          <Link to="recherche" className="main-nav__link" title="Cliquez pour faire une recherche"><img src={searchIcon} alt="" className="main-nav__link__icon" /> Faire une recherche</Link>
        </li>
        {!isLogged && (
          <>
            <li className="main-nav__item">
              <Link to="/connexion" className="main-nav__link">
                <Button label="Se connecter" btnstyle="outlined" />
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--signup">
              <Link to="/inscription" className="main-nav__link">
                <Button label="S'inscrire" />
              </Link>
            </li>
          </>

        )}
        {isLogged && (
          <li className="main-nav__item">
            <Link to="/mon-compte" className="main-nav__link">
              <Button label="Mon compte" icon="profil" />
            </Link>
            <button className="button button--logout" type="button" onClick={handleLogOut} title="Se déconnecter" aria-label="Se déconnecter">
              <LogoutIcon />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default AppHeader;
