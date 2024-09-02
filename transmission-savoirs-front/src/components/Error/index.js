import PropTypes from 'prop-types';

import './style.scss';

function Error({ msg }) {
  return (
    <p className="error">{msg}</p>
  );
}

Error.defaultProps = {
  msg: '',
};

Error.propTypes = {
  msg: PropTypes.string,
};

export default Error;
