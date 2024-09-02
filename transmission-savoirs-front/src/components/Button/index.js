import PropTypes from 'prop-types';

import './style.scss';

function Button({
  label, btnstyle, isSubmit, icon, ...props
}) {
  return (
    <button
      tabIndex="-1"
      type={isSubmit ? 'submit' : 'button'}
      className={`button button--${btnstyle}`}
      title={label}
      {...props}
    >
      {icon ? <img src={`/images/icones/${icon}.svg`} alt="" className="button__icon" /> : ''}
      <span>{label}</span>
    </button>
  );
}

Button.defaultProps = {
  btnstyle: 'plain',
  icon: null,
  isSubmit: false,
  label: '',
};

Button.propTypes = {
  label: PropTypes.string,
  btnstyle: PropTypes.string,
  icon: PropTypes.string,
  isSubmit: PropTypes.bool,
};

export default Button;
