import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import PostPreview from '../PostPreview';

import './style.scss';

function UserPosts({ posts, title, isOwner }) {
  const hasPosts = posts.length;
  return (
    <>
      { hasPosts > 0 && (
        <>
          <header className="section__header">
            <h2 className="section__title">{title}</h2>
          </header>
          <div className="posts">
            {posts.map((post) => (
              <PostPreview
                cover={post.category_slug}
                category={post.category_name}
                title={post.title}
                created_at={post.created_at}
                id={post.id}
                key={post.id}
              />
            ))}
          </div>
        </>
      )}
      {hasPosts === 0 && <p>Aucune annonce publiée.</p> }
      {isOwner && (
        <Link to="/annonces/ajouter">
          <Button label="Créer une annonce" />
        </Link>
      )}
    </>
  );
}

UserPosts.defaultProps = {
  posts: [],
  isOwner: false,
};

UserPosts.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string.isRequired,
  isOwner: PropTypes.bool,
};

export default UserPosts;
