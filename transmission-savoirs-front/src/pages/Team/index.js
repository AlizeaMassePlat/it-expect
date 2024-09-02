import Page from 'src/components/Page';
import Container from '../../components/Container';
import TeamMember from '../../components/TeamMember';

import './style.scss';

function Team() {
  return (
    <Page id="contenu">
      <Container>
        <section className="section">
          <header className="section__header">
            <h1 className="section__title">L'équipe du site</h1>
          </header>
          <div className="team">
            <TeamMember
              name="Alizéa"
              teamrole="Lead dev backend"
              desc=""
              avatar="long-2"
              github="https://github.com/Alizea-Masse"
              linkedin="https://www.linkedin.com/in/alizéamassé/"
            />

            <TeamMember
              name="Benoit"
              teamrole="Scrum Master"
              desc=""
              avatar="beard-2"
              github="https://github.com/#"
              linkedin="https://www.linkedin.com/in/benoit-castang-802332117/"
            />

            <TeamMember
              name="Séverine"
              teamrole="Référente accessibilité"
              desc="'Nobody understands me. Maybe I'm Javascript...'"
              avatar="rad-2"
              github="https://github.com/severine-cuenot"
              linkedin="https://www.linkedin.com/in/severine-cuenot/"
            />

            <TeamMember
              name="Raphaël"
              teamrole="Lead dev front-end"
              desc=""
              avatar="beard-1"
              github="https://github.com/#"
              linkedin="https://linkedin.com/#"
            />

            <TeamMember
              name="Cécile"
              teamrole="Product owner"
              desc=""
              avatar="long-1"
              github="https://github.com/#"
              linkedin="https://www.linkedin.com/in/cecilebonnindevweb/"
            />
          </div>
        </section>
      </Container>
    </Page>
  );
}

export default Team;
