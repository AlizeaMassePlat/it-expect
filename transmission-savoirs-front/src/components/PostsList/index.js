import PropTypes from 'prop-types';
import { useState } from 'react';
import Panel from '../Panel';
import ThumbnailPreview from '../Thumbnail/ThumbnailPreview';
import './style.scss';

function PostsList({ posts }) {
  const [isLearn, setIsLearn] = useState(true);

  const postsLearn = posts.filter((post) => post.type_id === 1);
  const postsShare = posts.filter((post) => post.type_id === 2);
  return (
    <>
      <div className="tab">
        <button title="Afficher les annonces de partage" className={isLearn ? 'tab__btn tab__btn--active' : 'tab__btn'} type="button" onClick={() => setIsLearn(true)}>
          Les annonces de partage
        </button>
        <button title="Afficher les annonces de recherche" className={!isLearn ? 'tab__btn tab__btn--active' : 'tab__btn'} type="button" onClick={() => setIsLearn(false)}>
          Les annonces de recherche
        </button>
      </div>
      <Panel style={{ marginTop: 0 }}>
        <header>
          <h1 className="section__title">{isLearn ? 'Partage de savoirs' : 'Recherche de savoirs'}</h1>
        </header>
        <div className="posts-list">
          {isLearn && (
            postsLearn.map((post) => (
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
          {isLearn && postsLearn.length === 0 && <p>Aucune annonce.</p>}
          {!isLearn && (
            postsShare.map((post) => (
              <ThumbnailPreview
                key={post.id}
                avatar={post.picture_slug}
                name={post.user_name}
                userId={post.userId}
                category={post.category_slug}
                categoryName={post.category_name}
                postId={post.id}
                title={post.title}
              />
            ))
          )}
          {!isLearn && postsShare.length === 0 && <p>Aucune annonce.</p>}
        </div>
      </Panel>
    </>
  );
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
