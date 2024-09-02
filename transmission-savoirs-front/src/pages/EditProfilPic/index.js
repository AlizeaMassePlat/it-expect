import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  changeValue, getAvatars, toggleSavedData, updateAvatar,
} from '../../actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import SectionHeader from '../../components/SectionHeader';
import useInitError from '../../hooks/useInitError';
import './style.scss';

function EditProfilPicture() {
  useInitError();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const avatars = useSelector((state) => state.user.avatars);
  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const userAvatar = useSelector((state) => state.user.avatarId);
  const isSaved = useSelector((state) => state.user.dataSaved);

  useEffect(() => {
    if (isSaved) {
      dispatch(toggleSavedData());
    }
    dispatch(getAvatars(userAvatar));
    setLoading(false);
  }, []);

  const handleRadioChange = (event) => dispatch(changeValue(Number(event.target.value), 'avatarId'));

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateAvatar());
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isSaved) {
    return <Navigate to="/mon-compte" replace />;
  }

  return (
    <Page id="contenu">
      <Container>
        <Panel>
          <SectionHeader title="Modifier mon avatar" />
          {loading && <p>Chargement en cours...</p>}
          {isError && <Error msg={errorMsg} />}
          <form onSubmit={handleSubmit}>
            <div className="avatars__list">
              {!loading && (
                avatars.map((avatar) => (
                  <div className="avatar__radio" key={avatar.id}>
                    <input
                      checked={avatar.id === userAvatar}
                      type="radio"
                      name="picture"
                      id={avatar.slug}
                      className="avatar_input"
                      value={avatar.id}
                      onChange={handleRadioChange}
                    />
                    <label className="avatar_label" htmlFor={avatar.slug} aria-label={`Choisir l'avatar ${avatar.name}`} style={{ backgroundImage: `/public/images/avatars/${avatar.slug.toUpperCase()}.png` }} />
                    <img className="avatar__img" src={`/images/avatars/${avatar.slug}.png`} alt={avatar.name} />
                  </div>
                ))
              )}
            </div>
            <div className="button-group">
              <Button label="Enregistrer mon avatar" type="submit" tabIndex="0" />
              <Button label="Retour" btnstyle="outlined" tabIndex="0" onClick={handleBack} />
            </div>
          </form>
        </Panel>
      </Container>
    </Page>
  );
}

export default EditProfilPicture;
