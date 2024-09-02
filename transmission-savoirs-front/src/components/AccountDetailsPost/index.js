import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import rectifyFormat from '../../selectors/rectifyFormat';
import Button from '../Button';
import Panel from '../Panel';
import { deletePost, initPostDeleted } from '../../actions';

import './style.scss';
import Error from '../Error';
import useInitError from '../../hooks/useInitError';

function AccountDetailsPost({
  id,
  avatar,
  name,
  email,
  createdAt,
  postId,
}) {
  useInitError();
  const dispatch = useDispatch();

  // condition logged
  const isLogged = useSelector((state) => state.user.logged);
  const userId = useSelector((state) => state.user.userId);

  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  const isDeleted = useSelector((state) => state.posts.isDeleted);
  const [deletedPost, setDeletedPost] = useState(false);

  // handleClick mail
  const [isVisible, setIsVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);

  useEffect(() => {
    if (isDeleted) {
      dispatch(initPostDeleted());
    }
  }, []);

  const handleClick = () => {
    setIsVisible(true);
    setBtnVisible(false);
  };

  // btn copy
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopy(true);
  };

  // formatting date with selector
  const date = rectifyFormat(createdAt);

  const handleDelete = () => {
    dispatch(deletePost(postId));
    setDeletedPost(true);
  };

  if (deletedPost && isDeleted) {
    return <Navigate to="/" replace />;
  }

  return (
    <Panel>
      <section className="user-infos">
        <div className="user-infos__avatar">
          <Link to={`/profil/${id}`}><img className="user-infos__avatar-img" src={`/images/avatars/${avatar}.png`} alt="avatar" /></Link>
          <Link to={`/profil/${id}`} className="user-infos__name">{name}</Link>
        </div>
        <span className="user-infos__date">inscription le {date}</span>
      </section>

      <section className="user-contact">
        {(isLogged && userId === id) && (
          <>
            {isError && <Error msg={errorMsg} />}
            <button
              className="button button--delete"
              onClick={handleDelete}
              type="button"
              aria-label="Supprimer mon annonce"
            >
              Supprimer mon annonce
            </button>
          </>
        )}
        {(btnVisible && userId !== id) && (
        <Button label="Contacter" onClick={handleClick} type="button" btnstyle="outlined" aria-label="Contacter l'utilisateur" />
        )}
        {(isLogged && isVisible && userId !== id) && (
          <div className="user-infos__contact-btn">
            <a className="email" href={`mailto:${email}`} title={`envoyer un mail à ${name}`}>{email}</a>
            {!copy && (
            <button className="user-infos__copy" type="button" title="Copier l'email dans le presse papier" onClick={handleCopy}>Copier</button>
            )}
            {copy && (
            <button className="user-infos__copy-ok" type="button" title="L'email a bien été copié !">Copié&nbsp;!</button>
            )}
          </div>
        )}
        {(!isLogged && isVisible) && (
          <Link to="/connexion">
            <Button label="Connexion" />
          </Link>
        )}
      </section>
      {(isLogged && isVisible) && (
        <div className="disclaimer">
          <p className="disclaimer-text">
            <span className="disclaimer-text__span">Avertissement</span>&nbsp;: Vous êtes sur le point d’entrer en relation avec un utilisateur ou une utilisatrice.
          </p>
          <p className="disclaimer-text">
            Veillez à ne jamais communiquer d’informations personnelles.
          </p>
          <p className="disclaimer-text">
            Si vous détectez le moindre comportement suspect ou ressentez le moindre doute,
            merci d’utiliser le formulaire de <a className="disclaimer-text__span-bold" href="/contact">contact</a> pour en faire part à un&#xB7;e membre de l’équipe.
          </p>
        </div>
      )}
    </Panel>
  );
}

AccountDetailsPost.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default AccountDetailsPost;
