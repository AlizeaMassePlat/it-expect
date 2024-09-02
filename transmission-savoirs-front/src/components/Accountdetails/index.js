/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import variables from '../../styles/variables.module.scss';
import './style.scss';
import { logOut } from '../../actions';
import rectifyFormat from '../../selectors/rectifyFormat';
import AvatarIcon from '../AvatarIcon';

function AccountDetails({
  id, username, avatar, created_at, about, email,
}) {
  const userId = useSelector((state) => state.user.userId);
  const logged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isUserProfile = location.pathname.slice(0, 7) === '/profil';

  const { space20, redColor } = variables;

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  // handleClick mail
  const [isVisible, setIsVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(true);
    setBtnVisible(false);
  };

  // btn copy
  const [copy, setCopy] = useState(false);

  // TODO erreur a modifier
  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setCopy(true);
      },
      () => {
        console.log('error');
      },
    );
  };

  const date = rectifyFormat(created_at);
  return (
    <div className="account">
      <div className="account__avatar">
        {(logged && userId === id) && (
        <Link to="/mon-compte/modifier-avatar" aria-label="Modifier mon avatar" className="account__avatar__legend" title="Modifier mon avatar">
          <AvatarIcon />
        </Link>
        )}
        <img className="account__avatar__img" src={`/images/avatars/${avatar}.png`} alt={avatar} />
      </div>
      <div className="account__info">
        <h2 className="account__username">{username}</h2>
        <p className="account__creation">Date d'inscription&nbsp;: {date}</p>
        <h3 className="account__title">Description</h3>
        <p className="account__about">{about}</p>
        <span className="spacer" />
        {logged && userId === id && (
          <>
            <Link to="/mon-compte/modifier-profil-public">
              <Button label="Modifier mon profil public" style={{ marginBottom: space20 }} btnstyle="outlined" />
            </Link>
            <Button label="Me déconnecter" style={{ backgroundColor: redColor }} onClick={handleLogOut} />
          </>
        )}
        {isUserProfile && userId !== id && (
          <>
            {btnVisible && (
              <Button label="Contacter" onClick={handleClick} type="button" btnstyle="outlined" title="Contacter l'utilisateur" />
            )}
            {isVisible && logged && (
              <>
                <div className="user-infos__contact-btn">
                  <a className="email" href={`mailto:${email}`} title={`envoyer un mail à ${username}`}>{email}</a>
                  <button className={copy ? 'button user-infos__copy-ok' : 'button user-infos__copy'} type="button" title="Copier l'email" onClick={handleCopy}>{copy ? 'Copié !' : 'Copier'}</button>
                </div>
                <div className="disclaimer">
                  <p className="disclaimer-text">
                    <span className="disclaimer-text__span">Avertissement</span>&nbsp;: Vous êtes sur le point d’entrer en relation avec un utilisateur ou une utilisatrice.
                  </p>
                  <p className="disclaimer-text">
                    Veillez à ne jamais communiquer d’informations personnelles.
                  </p>
                  <p className="disclaimer-text">
                    Si vous détectez le moindre comportement suspect
                    ou ressentez le moindre doute,
                    merci d’utiliser le formulaire de <a className="disclaimer-text__span-bold" href="/contact">contact</a> pour en faire part à un&#xB7;e membre de l’équipe.
                  </p>
                </div>
              </>
            )}
            {!logged && isVisible && (
              <Link to="/connexion">
                <Button label="Connexion" />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

AccountDetails.defaultProps = {
  about: '',
  avatar: 'null',
  email: '',
};

AccountDetails.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  about: PropTypes.string,
  id: PropTypes.number.isRequired,
  email: PropTypes.string,
};

export default React.memo(AccountDetails);
