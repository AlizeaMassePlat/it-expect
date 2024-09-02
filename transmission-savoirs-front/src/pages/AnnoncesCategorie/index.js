import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Panel from '../../components/Panel';

import './style.scss';
import Button from '../../components/Button';
import Thumbnail from '../../components/Thumbnail';

function AnnoncesCategorie() {
  return (
    <Page id="contenu">
      <Container>
        <nav className="nav-buttons">
          <ul className="nav-buttons__ul">
            <li className="nav-buttons__li">
              <Link>
                <Button label="Les annonces de partage" btnstyle="plain" />
              </Link>
              <Link>
                <Button label="Les annonces de recherche" btnstyle="outlined" />
              </Link>
            </li>
          </ul>
        </nav>
        <Panel>
          <div className="posts-list">
            <Thumbnail />
          </div>
        </Panel>
      </Container>
    </Page>
  );
}

export default AnnoncesCategorie;
