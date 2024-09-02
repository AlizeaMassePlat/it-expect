import PropTypes from 'prop-types';

function SectionHeader({ title, subtitle }) {
  return (
    <header className="section__header">
      <h1 className="section__title">{title}</h1>
      {subtitle && <p className="section__subtitle">{subtitle}</p>}
    </header>
  );
}

SectionHeader.defaultProps = {
  subtitle: null,
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionHeader;
