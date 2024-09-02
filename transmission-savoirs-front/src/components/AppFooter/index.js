import { Link } from 'react-router-dom';
import Button from '../Button';
import Logo from '../Logo';
import './style.scss';

function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__section">
        <div className="footer__logo">
          <Link to="/">
            <Logo />
          </Link>
          <p className="footer__desc">
            Partagez vos savoir-faire ou connaissances gratuitement.
          </p>
        </div>
        <nav className="footer-nav">
          <ul className="footer-nav__list">
            <h3 className="footer-nav__title">En savoir plus</h3>
            <li className="footer-nav__item">
              <Link to="/a-propos" className="footer-nav__link">&Agrave; propos</Link>
            </li>
            <li className="footer-nav__item">
              <Link to="/equipe" className="footer-nav__link">L'équipe</Link>
            </li>
          </ul>
          <ul className="footer-nav__list">
            <h3 className="footer-nav__title">Liens utiles</h3>
            <li className="footer-nav__item">
              <Link to="/CGU" className="footer-nav__link">CGU</Link>
            </li>
            <li className="footer-nav__item">
              <Link to="/politique-de-confidentialite" className="footer-nav__link">Vie privée</Link>
            </li>
          </ul>
          <ul className="footer-nav__list">
            <h3 className="footer-nav__title">Besoin d'aide&nbsp;?</h3>
            <li className="footer-nav__item">
              <Link to="/contact" className="footer-nav__link"><Button label="Nous contacter" /></Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="footer__copyright">&copy; Saevoir {year}</p>
    </footer>
  );
}

export default AppFooter;
