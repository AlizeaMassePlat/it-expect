/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import './style.scss';
import variables from '../../styles/variables.module.scss';

function MyAccountPanel({ email }) {
  const { redColor } = variables;
  return (
    <div className="account-panel">
      <div className="account-panel__bloc">
        <header>
          <h2 className="section__title">Informations de connexion</h2>
          {/* <h2 className="section__subtitle">Ces informations sont strictement confidentielles et nous servent à vous contacter ou à personnaliser votre interface.</h2> */}
        </header>
        <p className="account-panel__label">Email de contact / identifiant de connexion</p>
        <p>{email}</p>
      </div>
      <div className="account-panel__bloc">
        <Link to="/modifier-email" aria-label="Aller vers modifier mon email">
          <Button label="Modifier mon email" btnstyle="outlined" />
        </Link>
        <Link to="/modifier-mot-de-passe" aria-label="Aller vers modifier mon mot de passe">
          <Button label="Modifier mon mot de passe" btnstyle="outlined" />
        </Link>
        <Link to="/supprimer-mon-compte" aria-label="Bouton de suppression du compte">
          <Button label="Supprimer mon compte" style={{ backgroundColor: redColor }} />
        </Link>
      </div>
    </div>
  );
}

MyAccountPanel.propTypes = {
  email: PropTypes.string.isRequired,
};

export default MyAccountPanel;
