import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AccountDetails from '../../components/Accountdetails';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import PostPreview from '../../components/PostPreview';
import { getUsers } from '../../actions';
import './style.scss';

function Profile() {
  const isAdmin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.userProfil);
  const userPosts = useSelector((state) => state.posts.selectedUserPost);
  const { id } = useParams();
  const loading = useSelector((state) => state.user.loading);
  const postLoading = useSelector((state) => state.posts.loadingSelectedPost);

  const [idSaved, setIdSaved] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      setIdSaved(true);
    }
  }, [user.id]);

  useEffect(() => {
    dispatch(getUsers(id));
  }, []);

  return (
    <Page id="profil">
      <Container>
        <Panel>
          {loading && <div>Chargement en cours...</div>}
          {!loading && idSaved && (
          <div className="user-infos">
            <AccountDetails
              username={user.pseudo}
              avatar={user.slug}
              created_at={user.created_at}
              about={user.description}
              id={user.id}
              email={user.email}
            />
              {isAdmin && (
              <div className="user-infos__contact">
                <Button label="Supprimer cet utilisateur" style={{ backgroundColor: 'red' }} />
              </div>
              )}
          </div>
          )}
        </Panel>

        <Panel id="annonces">
          {postLoading && <div>Chargement en cours...</div>}
          <h2 className="post-previews__title">Les annonces de {user.pseudo}</h2>
          {!loading
          && (
          <div className="thumbnails__list">
            {userPosts.map((userPost) => (
              <PostPreview
                cover={userPost.category_slug}
                category={userPost.category_name}
                title={userPost.title}
                created_at={userPost.created_at}
                id={userPost.id}
                key={userPost.id}
              />
            ))}
          </div>
          )}
        </Panel>
      </Container>
    </Page>
  );
}

export default Profile;
