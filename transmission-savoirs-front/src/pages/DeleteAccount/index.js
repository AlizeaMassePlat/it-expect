import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteUser } from '../../actions';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import SectionHeader from '../../components/SectionHeader';
import useInitError from '../../hooks/useInitError';
import './style.scss';

function DeleteAccount() {
  useInitError();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(deleteUser());
  };

  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const isDeleted = useSelector((state) => state.user.isDeleted);

  if (isDeleted) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page id="contenu">
      <Container>
        <Panel>
          <SectionHeader title="Supprimer mon compte" subtitle="Attention cette action est irréversible !" />
          <p className="delete__warning">Êtes-vous sûr de vouloir supprimer votre compte&nbsp;?</p>
          <p className="delete__warning">Vous perdrez toutes les informations et annonces liées à celui-ci.</p>

          {isError && <Error msg={errorMsg} />}
          <div className="button-group" style={{ marginTop: '2em' }}>
            <button className="button button--delete" type="button" onClick={handleDelete}>Supprimer mon compte</button>
            <Button label="Retour" btnstyle="outlined" tabIndex="0" onClick={handleBack} />
          </div>
        </Panel>
      </Container>
    </Page>
  );
}

export default DeleteAccount;
