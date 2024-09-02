import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Page from 'src/components/Page';
import Search from 'src/components/Search';
import Container from 'src/components/Container';
import Panel from '../../components/Panel';
import Thumbnail from '../../components/Thumbnail';
import Hero from '../../components/Hero';
import { getPosts } from '../../actions';

function Home() {
  const isLogged = useSelector((state) => state.user.logged);
  const loading = useSelector((state) => state.posts.isLoading);
  const posts = useSelector((state) => state.posts.posts);

  let postsShare = [];
  let postsLearn = [];
  if (!loading) {
    postsShare = posts.filter((post) => post.type_id === 2).slice(0, 4);
    postsLearn = posts.filter((post) => post.type_id === 1).slice(0, 4);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <Page>
      {!isLogged && <Hero />}
      <Container>

        <Search id="recherche" />
        <Panel id="partage">
          {loading && <div>Chargement en cours, veuillez patienter...</div>}
          {!loading && (
          <Thumbnail list={postsShare} title="Partage de savoirs" url="partage" link="Voir toutes les annonces" />
          )}
        </Panel>

        <Panel id="besoin">
          {loading && <div>Chargement en cours, veuillez patienter...</div>}
          {!loading && (
          <Thumbnail list={postsLearn} title="Recherche de savoirs" url="besoin" link="Voir toutes les annonces" />
          )}
        </Panel>

      </Container>
    </Page>
  );
}

export default Home;
