import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  displayElement, setError, submitNewPasssword, toggleLoading,
} from '../../actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import useInitError from '../../hooks/useInitError';

function ResetPassword({ token }) {
  useInitError();
  /* Handle password visibility */
  const [isVisible, setIsVisible] = useState(false);
  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const loading = useSelector((state) => state.user.loading);
  const displayElt = useSelector((state) => state.user.displayElement);
  const msg = useSelector((state) => state.informations.msg);
  const logged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(toggleLoading());
    }
    if (displayElt) {
      dispatch(displayElement());
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(setError('Les mots de passe ne sont pas identiques'));
    }
    else {
      dispatch(submitNewPasssword(token));
    }
  };

  return (
    <Page id="contenu">
      <Container>
        <Panel>
          <header className="section__header">
            <h1 className="section__title">Nouveau mot de passe</h1>
            <p className="section__subtitle">Les champs marqués d’une étoile sont obligatoires.</p>
          </header>
          {isError && <Error msg={errorMsg} />}
          {(!loading && !displayElt) && (
          <form onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="password">Nouveau mot de passe&nbsp;*</label>
              <Input
                type={isVisible ? 'text' : 'password'}
                name="password"
                id="new-password"
                required
                placeholder="Votre nouveau mot de passe..."
                aria-label="Saisissez votre nouveau mot de passe"
              />
            </div>

            <div className="form__field">
              <label htmlFor="password">Confirmer le nouveau mot de passe&nbsp;*</label>
              <Input
                type={isVisible ? 'text' : 'password'}
                name="passwordConfirm"
                id="password-confirm"
                required
                placeholder="Confirmez votre nouveau mot de passe..."
                aria-label="Confirmez votre nouveau mot de passe"
              />
              <button
                className="password__toggle"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? 'Masquer les mots de passe' : 'Afficher les mots de passe'}
              </button>
            </div>
            <div className="form__submit">
              <button type="submit" className="button button--plain" aria-label="Valider mon mot de passe">Enregistrer mon mot de passe</button>
              <p className="form__submit__info">En cliquant sur ce bouton vous serez redirigé vers la page d’accueil.</p>
            </div>
          </form>
          )}
          {loading && <p>Chargement en cours...</p> }
          {displayElt && (
            <>
              <p>{msg}</p>
              {!logged && <Link to="/connexion"><Button label="Se connecter" /></Link>}
              {logged && <Link to="/"><Button label="Retourner à l'accueil" /></Link>}
            </>
          )}
        </Panel>
      </Container>
    </Page>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ResetPassword;
