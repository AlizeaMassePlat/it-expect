import { Link } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';
import scene from './scene.png';
import './style.scss';

function Hero() {
  return (
    <div className="hero">
      <Container>
        <div className="hero__intro">
          <h1 className="hero__title">
            Apprenez ou partagez un savoir facilement.
          </h1>
          <Link to="/inscription" aria-label="Aller vers le formulaire d'inscription">
            <Button label="Inscrivez-vous gratuitement" />
          </Link>
        </div>
      </Container>
      <img className="hero__bg" src={scene} alt="" />
    </div>
  );
}

export default Hero;
