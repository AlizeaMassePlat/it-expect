/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import Container from '../../components/Container';
import Panel from '../../components/Panel';
import Button from '../../components/Button';
import './style.scss';
import SectionHeader from '../../components/SectionHeader';

function About() {
  return (
    <Page id="contenu">
      <Container>
        <section className="about">
          <SectionHeader title="À propos..." />

          <div className="about__intro">
            <em>Saevoir</em> souhaite créer du lien social ('se voir') ou révéler de nouvelles vocations grâce à la mise en valeur des connaissances de chacun et chacune ('savoir'&nbsp;!).
          </div>
          <p>
            Notre société évolue&nbsp;: la population vieillit, la précarité et l'isolement augmentent.
          </p>
          <p>
            La crise sanitaire fut un facteur aggravant, non seulement à cause des restrictions mises en place à ce moment-là mais également en raison des craintes de chacun et chacune.
          </p>
          <p>
            Cela a cependant permis le développement et la mise en avant de technologies telles que les visioconférences et le format téléprésentiel.
          </p>
          <p>
            Partant de ce constat, l'idée est venue de proposer une plateforme valorisant l'expérience de nos aînés&#xB7;ées.
          </p>
          <p>
            Et pour aller plus loin, pourquoi ne pas étendre cette opportunité à toutes et à tous&nbsp;?
          </p>
          <p>
            Nous vous offrons la possibilité d'apprendre et de partager gratuitement vos savoirs à travers un site qui se veut le plus accessible et inclusif possible.
          </p>

          <Panel id="plus" className="panel about">
            <header>
              <h2 className="about__subtitle">Pour aller plus loin...</h2>
            </header>
            <div className="about__buttons">
              <Link to="/equipe" className="about__link">
                <Button type="button" label="Découvrez notre belle équipe&nbsp;!" style={{ width: '100%' }} btnstyle="outlined" />
              </Link>
              <Link to="/recherche" className="about__link">
                <Button type="button" label="Faites votre première recherche&nbsp;!" style={{ width: '100%' }} btnstyle="outlined" />
              </Link>
              <Link to="/" className="about__link">
                <Button type="button" label="Retourner à l'accueil" style={{ width: '100%' }} />
              </Link>
            </div>
          </Panel>
        </section>
      </Container>
    </Page>
  );
}

export default About;
