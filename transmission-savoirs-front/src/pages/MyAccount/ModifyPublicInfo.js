import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { changeValue, toggleSavedData, updateProfile } from '../../actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import SectionHeader from '../../components/SectionHeader';
import useInitError from '../../hooks/useInitError';

function ModifyPublicInfo() {
  useInitError();
  const dispatch = useDispatch();

  const isSaved = useSelector((state) => state.user.dataSaved);

  useEffect(() => {
    if (isSaved) {
      dispatch(toggleSavedData());
    }
  }, []);

  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const description = useSelector((state) => state.user.description);

  const handleChangeTextArea = (event) => dispatch(changeValue(event.target.value, 'description'));
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile());
  };

  if (isSaved) {
    return <Navigate to="/mon-compte" replace />;
  }

  return (
    <Page>
      <Container>
        <Panel>
          <SectionHeader title="Modifier mon profil public" />
          {isError && <Error msg={errorMsg} />}
          <form onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="username">Nom d'utilisateur&#xB7;trice</label>
              <Input
                name="username"
                type="text"
                required
                placeholder="Nom d'utilisateur-trice..."
                aria-label="Changer votre nom d'utilisateur-trice"
                id="username"
                spellCheck="false"
              />
            </div>
            <div className="form__field">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                placeholder="Votre description..."
                aria-label="Saisissez votre description"
                id="description"
                rows="5"
                value={description}
                onChange={handleChangeTextArea}
                spellCheck="true"
              />
            </div>
            <Button label="Enregistrer mon profil" type="submit" tabIndex="0" />
          </form>
        </Panel>
      </Container>
    </Page>
  );
}

export default ModifyPublicInfo;
