/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUsers, toggleSavedData } from '../../actions';
import AccountDetails from '../../components/Accountdetails';
import Container from '../../components/Container';
import MyAccountPanel from '../../components/MyAccountPanel';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import PersonalInfo from '../../components/PersonalInfo';
import UserPosts from '../../components/UserPosts';
import './style.scss';

function MyAccount() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(false);
  const myPosts = useSelector((state) => state.posts.selectedUserPost);
  const userProfil = useSelector((state) => state.user.userProfil);
  const isLoading = useSelector((state) => state.user.loading);

  const isSaved = useSelector((state) => state.user.dataSaved);

  useEffect(() => {
    if (isSaved) {
      dispatch(toggleSavedData());
    }
  }, []);

  useEffect(() => {
    dispatch(getUsers(user.userId));
  }, [location]);

  useEffect(() => {
    if (userProfil.slug) {
      setUserData(true);
    }
  }, [userProfil.slug]);

  return (
    <Page id="mon-compte">
      <Container>
        {!userData && <p>Chargement en cours</p>}
        {userData && !isLoading && (
          <>
            <div id="profil-public">
              <AccountDetails
                username={userProfil.pseudo}
                avatar={userProfil.slug}
                created_at={userProfil.created_at || ''}
                about={userProfil.description || 'Non renseignée'}
                id={userProfil.id}
              />
            </div>
            <Panel id="mes-annonces">
              <UserPosts posts={myPosts} title="Mes annonces" isOwner />
            </Panel>
            <Panel id="info-personnelles">
              <PersonalInfo
                firstname={userProfil.firstname || 'non renseigné'}
                lastname={userProfil.lastname || 'non renseigné'}
                birthdate={userProfil.birthdate}
                postalCode={userProfil.postal_code || 'non renseigné'}
                pronoun={userProfil.pronoun || 'non renseigné'}
              />
            </Panel>
            <Panel>
              <MyAccountPanel email={userProfil.email} id="info-connexion" />
            </Panel>
          </>
        )}
      </Container>
    </Page>
  );
}

export default MyAccount;
