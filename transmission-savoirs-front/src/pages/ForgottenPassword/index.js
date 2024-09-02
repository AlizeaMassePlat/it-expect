import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import Error from '../../components/Error';
import { initError, msgInit, resetPassword } from '../../actions';
import './style.scss';

function ForgottenPassword() {
  const dispatch = useDispatch();

  // initialise error msg on first render
  useEffect(() => {
    dispatch(initError());
  }, []);

  // get error informations from state
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  const loading = useSelector((state) => state.user.loading);
  const email = useSelector((state) => state.user.email);
  const msg = useSelector((state) => state.informations.msg);

  useEffect(() => {
    dispatch(msgInit());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('submit');
    // console.log(email);
    dispatch(resetPassword(email));
  };

  return (
    <Page>
      <Container style={{ maxWidth: '37.5em' }}>
        <Panel>
          <header className="section__header">
            <h1 className="section__title">Mot de passe oublié</h1>
            <p className="section__subtitle">Les champs marqués d’une étoile sont obligatoires.</p>
          </header>
          {isError && <Error msg={errorMsg} />}
          {msg && <p>{msg}</p>}
          {(!loading && !msg) && (
            <form className="form" onSubmit={handleSubmit} id="contenu">
              <div className="form__field">
                <label htmlFor="email">Adresse email&nbsp;*</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Votre adresse email..."
                  aria-label="Saisissez votre email"
                  id="email"
                />
              </div>
              <p className="section__subtitle">Vous recevrez un e-mail vous permettant de réinitiliser votre mot de passe.</p>
              <div className="form__submit">
                <button type="submit" className="button button--plain" aria-label="Réinitialiser mon mot de passe" style={{ width: '100%' }}>Réinitialiser mon mot de passe</button>
              </div>
            </form>
          )}
          {loading && <p>Chargement en cours...</p> }

        </Panel>
      </Container>
    </Page>
  );
}

export default ForgottenPassword;
