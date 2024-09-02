import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import Error from '../../components/Error';
import Button from '../../components/Button';
import {
  logIn, setError,
} from '../../actions';
import './style.scss';
import validateEmail from '../../selectors/validateEmail';
import useInitError from '../../hooks/useInitError';
import useInitUser from '../../hooks/useInitUser';

function Connexion() {
  // Handle password visibility
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  // initialise error msg on first render
  useInitUser();
  useInitError();

  // get error informations from state
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  // check logged status
  const logged = useSelector((state) => state.user.logged);

  const loading = useSelector((state) => state.user.loading);
  const email = useSelector((state) => state.user.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkEmail = validateEmail(email);
    if (checkEmail) {
      dispatch(logIn());
    }
    else {
      dispatch(setError('Email non valide'));
    }
  };

  // If logged succesfully redirect to home page
  if (logged) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page>
      <Container style={{ maxWidth: '37.5em' }}>
        <Panel>
          <header className="section__header">
            <h1 className="section__title">Connexion</h1>
            <p className="section__subtitle">Les champs marqués d’une étoile sont obligatoires.</p>
          </header>
          {isError && <Error msg={errorMsg} />}
          {!loading && (
            <form className="form" onSubmit={handleSubmit} id="connexion">
              <div className="form__field">
                <label htmlFor="email">Adresse email&nbsp;*</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Votre adresse email..."
                  aria-label="Saisissez votre email"
                  id="email"
                  spellCheck="false"
                />
              </div>

              <div className="form__field">
                <label htmlFor="password">Mot de passe&nbsp;*</label>
                <button
                  className="password__helper"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                </button>
                <Input
                  type={isVisible ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  placeholder="Votre mot de passe..."
                  aria-label="Saisissez votre mot de passe"
                  spellCheck="false"
                />
              </div>
              <Link to="/oubli-mot-de-passe" className="reset-password">J'ai oublié mon mot de passe</Link>
              <div className="form__submit">
                <button type="submit" className="button button--plain" title="Je me connecte">Je me connecte</button>
                <p className="form__submit__info">En cliquant sur ce bouton vous serez redirigé vers la page d’accueil.</p>
              </div>
            </form>
          )}
          {loading && <p id='test'>Chargement en cours...</p> }

        </Panel>
        <p className="divider">ou</p>
        <Panel id="inscription">
          <p className="section__subtitle">Si vous n'avez pas encore de compte vous pouvez nous rejoindre.</p>
          <Link to="/inscription" aria-label="Vers la page d'inscription">
            <Button label="Je m'inscris" />
          </Link>
        </Panel>
      </Container>
    </Page>
  );
}

export default Connexion;
