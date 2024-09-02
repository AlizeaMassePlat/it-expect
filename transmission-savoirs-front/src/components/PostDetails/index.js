import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Panel from '../Panel';
import rectifyFormat from '../../selectors/rectifyFormat';

import './style.scss';

function PostDetails({
  title,
  location,
  description,
  category,
}) {
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const date = rectifyFormat(selectedPost.created_at);

  return (
    <article className="post-infos">
      <Panel>
        <section className="post-infos__frame">
          <img className="post-infos__img" src={`/images/categories/${category}.jpg`} alt={category} />
        </section>
        <section className="post-informations">
          <h2 className="post-infos__title">{title}</h2>
          <p className="post-infos__date">Annonce publiée le {date}</p>
          {location && (
            <span className="post-infos__location"><img className="post-infos__location-icone" src="/images/icones/location.svg" alt="localisation de l'annonce" />{location}</span>
          )}
          <p className="post-infos__description">{description}</p>
        </section>
      </Panel>
    </article>
  );
}

PostDetails.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default PostDetails;
