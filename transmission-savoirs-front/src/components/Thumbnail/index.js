import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThumbnailPreview from './ThumbnailPreview';
import './style.scss';

function Thumbnail({
  list, title, url, link,
}) {
  return (
    <div className="thumbnails">
      <header className="section__header thumbnails__header">
        <h1 className="section__title thumbnails__title">{title}</h1>
        <Link className="thumbnails__title__link" to={`/${url}`}>{link}</Link>
      </header>
      <div className="thumbnails__list">
        {list.map((post) => (
          <ThumbnailPreview
            key={post.id}
            avatar={post.picture_slug}
            name={post.user_name}
            userId={post.user_id}
            category={post.category_slug}
            categoryName={post.category_name}
            postId={post.id}
            title={post.title}
            typeId={post.type_id}
          />
        ))}
      </div>
    </div>
  );
}

Thumbnail.defaultProps = {
  url: '',
  link: '',
};

Thumbnail.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  link: PropTypes.string,
};

export default Thumbnail;
