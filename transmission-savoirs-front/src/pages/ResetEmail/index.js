import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitNewEmail, toggleSavedData } from '../../actions';

import Container from '../../components/Container';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import Input from '../../components/Input';
import Error from '../../components/Error';
import useInitError from '../../hooks/useInitError';

function ResetEmail() {
  useInitError();
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const loading = useSelector((state) => state.user.loading);
  const isSaved = useSelector((state) => state.user.dataSaved);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSaved) {
      dispatch(toggleSavedData());
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitNewEmail());
  };

  if (isSaved) {
    return <Navigate to="/mon-compte" replace />;
  }

  return (
    <Page id="contenu">
      <Container>
        <Panel>
          <header className="section__header">
            <h1 className="section__title">Nouvel e-mail</h1>
            <p className="section__subtitle">Les champs marqués d’une étoile sont obligatoires.</p>
          </header>
          {isError && <Error msg={errorMsg} />}
          {!loading && (
          <form onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="email">Votre nouvel e-mail&nbsp;*</label>
              <Input
                type="email"
                name="email"
                id="new-email"
                required
                placeholder="Votre nouvel e-mail..."
                aria-label="Saisissez votre nouvel e-mail"
              />
            </div>

            <div className="form__submit">
              <button type="submit" className="button button--plain" aria-label="Enregistrer mon e-mail">Enregistrer mon e-mail</button>
              <p className="form__submit__info">En cliquant sur ce bouton vous serez redirigé vers la page mon compte.</p>
            </div>
          </form>
          )}
        </Panel>
      </Container>
    </Page>
  );
}

export default ResetEmail;
