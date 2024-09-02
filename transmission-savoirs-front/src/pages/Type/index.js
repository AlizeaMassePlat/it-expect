import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypePosts } from '../../actions';
import Container from '../../components/Container';
import Page from '../../components/Page';
import Panel from '../../components/Panel';
import ThumbnailPreview from '../../components/Thumbnail/ThumbnailPreview';

function Type({ id }) {
  const isLoading = useSelector((state) => state.posts.isLoading);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypePosts(id));
  }, []);
  return (
    <Page id="contenu">
      <Container>
        <header className="section__header">
          <h1 className="section__title">{ id === 1 ? 'Recherche de savoirs' : 'Partage de savoirs'}</h1>
          <p className="section__subtitle">N'hésitez pas à les contacter.</p>
        </header>
        {isLoading && <p>Chargement...</p>}
        <Panel>
          <div className="thumbnails__list">
            {!isLoading && posts.length > 0 && (
              posts.map((post) => (
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
              ))
            )}
            {!isLoading && posts.length === 0 && <p>Aucune annonce disponible.</p>}
          </div>
          {isLoading && <p>Chargement en cours...</p>}
        </Panel>
      </Container>
    </Page>
  );
}

Type.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Type;
