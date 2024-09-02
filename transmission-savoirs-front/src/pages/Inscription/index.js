import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import {
  initError, initUser, setError, signUp,
} from '../../actions';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import Error from '../../components/Error';
import validateEmail from '../../selectors/validateEmail';
import './style.scss';

function Inscription() {
  /* Handle password visibility */
  const [isVisible, setIsVisible] = useState(false);
  const password = useSelector((state) => state.user.password);
  const email = useSelector((state) => state.user.email);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const loading = useSelector((state) => state.user.loading);
  const logged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  // initialise error msg on first render
  useEffect(() => {
    dispatch(initError());
    dispatch(initUser());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(setError('Les mots de passe ne sont pas identiques'));
    }
    else {
      const checkEmail = validateEmail(email);
      if (checkEmail) {
        dispatch(signUp());
      }
      else {
        dispatch(setError('Email non valide'));
      }
    }
  };

  if (logged) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page>
      <Container style={{ maxWidth: '37.5em' }}>
        <Panel>
          <header className="section__header">
            <h1 className="section__title">Inscription</h1>
            <p className="section__subtitle">Les champs marqués d’une étoile sont obligatoires.</p>
          </header>
          {isError && <Error msg={errorMsg} />}
          {!loading && (
            <form className="form" onSubmit={handleSubmit} id="inscription">
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
                <button
                  className="password__toggle"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? 'Masquer les mots de passe' : 'Afficher les mots de passe'}
                </button>
                <label htmlFor="password">Mot de passe&nbsp;*</label>
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

              <div className="form__field">
                <label htmlFor="password-confirm">Confirmation du mot de passe&nbsp;*</label>
                <Input
                  type={isVisible ? 'text' : 'password'}
                  name="passwordConfirm"
                  id="password-confirm"
                  required
                  placeholder="Confirmez mot de passe..."
                  aria-label="Saisissez à nouveau votre mot de passe pour le confirmer"
                  spellCheck="false"
                />
              </div>

              <div className="form__field">
                <label htmlFor="username">Nom d'utilisateur ou d'utilisatrice&nbsp;*</label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="Votre nom d'utilisateur ou d'utilisatrice..."
                  aria-label="Saisissez votre nom d'utilisateur ou d'utilisatrice"
                  spellCheck="false"
                />
              </div>

              <div className="form__field">
                <label htmlFor="birthdate">Date de naissance&nbsp;*</label>
                <Input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  required
                  placeholder="Votre date de naissance..."
                  aria-label="Saisissez votre date de naissance"
                />
              </div>

              <div className="form__submit">
                <button type="submit" className="button button--plain" title="Je me connecte">Je m'inscris</button>
                <p className="form__submit__info">En cliquant sur ce bouton vous serez redirigé vers la page d’accueil.</p>
              </div>
            </form>
          )}
          {loading && <p>Chargement en cours...</p> }
        </Panel>
      </Container>
    </Page>
  );
}

export default Inscription;
