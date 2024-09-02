import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getPronoun from '../../selectors/getPronoun';
import rectifyFormat from '../../selectors/rectifyFormat';
import Button from '../Button';
import './style.scss';

function PersonalInfo({
  firstname, lastname, birthdate, postalCode, pronoun,
}) {
  const pronom = getPronoun(pronoun);
  const dateOfBirth = rectifyFormat(birthdate);
  return (
    <>
      <header>
        <h2 className="section__title">Informations personnelles</h2>
        <h2 className="section__subtitle">Ces informations sont strictement confidentielles. Elles nous servent uniquement à vous contacter en cas de besoin.</h2>
      </header>
      <ul className="perso-infos__list">
        <li className="perso-infos__item"><span className="perso-infos__label">Nom&nbsp;:</span>{lastname}</li>
        <li className="perso-infos__item"><span className="perso-infos__label">Prénom&nbsp;:</span>{firstname}</li>
        <li className="perso-infos__item"><span className="perso-infos__label">Date de naissance&nbsp;:</span>{dateOfBirth}</li>
        <li className="perso-infos__item"><span className="perso-infos__label">Code postal&nbsp;:</span>{postalCode}</li>
        <li className="perso-infos__item"><span className="perso-infos__label">Pronom&nbsp;:</span>{pronom}</li>
      </ul>
      <Link to="/mon-compte/modifier-info-perso">
        <Button label="Modifier mes informations personnelles" btnstyle="outlined" />
      </Link>
    </>
  );
}

PersonalInfo.defaultProps = {
  firstname: '',
  lastname: '',
  postalCode: '',
  pronoun: '',
};

PersonalInfo.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  birthdate: PropTypes.string.isRequired,
  postalCode: PropTypes.string,
  pronoun: PropTypes.string,
};

export default PersonalInfo;
