/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import rectifyFormat from '../../selectors/rectifyFormat';
import './style.scss';

function PostPreview({
  cover, title, created_at, id, category,
}) {
  const date = rectifyFormat(created_at);

  return (
    <article className="post-preview">
      <div className="post-preview__cover">
        <img src={`/images/categories/${cover}.jpg`} alt={category} className="post-preview__img" />
      </div>
      <h2 className="post-preview__title">{title}</h2>
      <p className="post-preview__date">Publiée le {date}</p>
      <span className="spacer" />
      <div className="post-preview__buttons">
        <Link to={`/annonces/${id}`} aria-label="Voir le détail de l'annonce">
          <Button label="Voir l'annonce" btnstyle="outlined" />
        </Link>
        {/* <Link to={`/annonce/${id}/effacer`}>
          <Button btnstyle="delete" icon="delete" />
        </Link> */}
      </div>
    </article>
  );
}

PostPreview.propTypes = {
  category: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PostPreview;
