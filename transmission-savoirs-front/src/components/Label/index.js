import PropTypes from 'prop-types';

import './style.scss';

function Label({ label }) {
  return (
    <button type="button" className="label" title={`vers ${label}`} name={`catégorie : ${label}`}>{label}</button>
  );
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Label;
