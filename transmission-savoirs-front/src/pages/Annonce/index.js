import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Label from '../../components/Label';
import Container from '../../components/Container';
import Page from '../../components/Page';
import Button from '../../components/Button';
import ThumbnailPreview from '../../components/Thumbnail/ThumbnailPreview';
import PostDetails from '../../components/PostDetails';
import AccountDetailsPost from '../../components/AccountDetailsPost';
import './style.scss';
import useScrollTop from '../../hooks/useScrollTop';
import { getSelectedPost } from '../../actions';
import useInitError from '../../hooks/useInitError';

function Annonce() {
  useScrollTop();
  useInitError();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.admin);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const similarPosts = useSelector((state) => state.posts.similarPosts);
  const postError = useSelector((state) => state.posts.isError);
  const loading = useSelector((state) => state.posts.isLoading);

  const [error404, setError404] = useState(false);

  useEffect(() => {
    dispatch(getSelectedPost(id));
    if (postError) {
      setError404(true);
    }
  }, [postError, id]);

  if (error404) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Page style={{ paddingBottom: 0 }} id="annonce">
      {Object.keys(selectedPost).length !== 0 && (
      <Container>
        {loading && (
          <p>Chargement en cours...</p>
        )}
        {!loading && (
          <div className="informations">
            <section className="post-infos__label">
              <Link to={`/categories/${selectedPost.category_slug}`}>
                <Label label={selectedPost.category_name} />
              </Link>

              {/* <Label label={selectedPost.type_id === 1 ? 'Présentiel' : 'Distanciel'} /> */}
            </section>
            {isAdmin && (
            <Button label="Supprimer cette annonce" style={{ backgroundColor: 'red' }} />
            )}
            <div className="global-infos">
              <PostDetails
                title={selectedPost.title}
                createdAt={selectedPost.created_at}
                location={selectedPost.condition_id === 1 ? selectedPost.postal_code : 'À distance'}
                description={selectedPost.description}
                category={selectedPost.category_slug}
              />
              <div className="vignettes">
                <AccountDetailsPost
                  id={selectedPost.user_id}
                  avatar={selectedPost.picture_slug}
                  name={selectedPost.user_name}
                  createdAt={selectedPost.created_at}
                  email={selectedPost.user_email}
                  postId={id}
                />
                {/* waiting backend if possible */}
                {/* <MorePostInfos info="Animaux acceptés" /> */}
              </div>
            </div>
          </div>
        )}
      </Container>
      )}
      {(!loading && Object.keys(similarPosts).length !== 0) && (
        <section className="more-posts" id="annonces-similaires">
          <Container>
            <h2 className="more-posts__title">Annonces similaires</h2>
            <div className="thumbnails__list similar">
              {similarPosts.map((post) => (
                <ThumbnailPreview
                  key={post.id}
                  avatar={post.picture_slug}
                  name={post.user_name}
                  userId={post.user_id}
                  category={post.category_slug}
                  categoryName={post.category_name}
                  postId={post.id}
                  title={post.title}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </Page>

  );
}

export default Annonce;
