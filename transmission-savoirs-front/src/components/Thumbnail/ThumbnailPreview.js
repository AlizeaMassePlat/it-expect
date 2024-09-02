import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Label from '../Label';
import Button from '../Button';

import './style.scss';

function ThumbnailPreview({
  avatar,
  name,
  category,
  title,
  userId,
  postId,
  categoryName,
}) {
  return (
    <article className="thumbnail">
      <Link to={`/profil/${userId}`} aria-label={`Aller vers le profil de ${name}`}>
        <div className="thumbnail-user__infos">
          <div className="thumbnail-user__img">
            <img className="thumbnail-user__img__avatar" src={`/images/avatars/${avatar}.png`} alt="" />
          </div>
          <h3 className="thumbnail-user__name">{name}</h3>
        </div>
      </Link>

      <Link className="thumbnail__link" to={`/categories/${category}`} aria-label={`Aller vers la catégorie "${categoryName}"`}>
        <Label label={categoryName} color="light-grey" />
      </Link>

      <Link className="thumbnail__link" to={`/annonces/${postId}`} aria-label={`Aller vers l'annonce "${title}"`}>
        <div className="thumbnail-infos">
          <img className="thumbnail-infos__img" src={`/images/categories/${category}.jpg`} alt={`${categoryName}`} />
          <h4 className="thumbnail-infos__title">{title}</h4>
        </div>
      </Link>
      <span className="spacer" />
      <Link className="thumbnail__link" to={`/annonces/${postId}`} aria-label="Aller vers le détail de l'annonce">
        <Button label="Voir l'annonce" btnstyle="outlined" />
      </Link>
    </article>
  );
}

ThumbnailPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default ThumbnailPreview;
