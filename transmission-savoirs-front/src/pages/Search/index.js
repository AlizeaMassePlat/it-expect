import Search from 'src/components/Search';
import Container from '../../components/Container';
import Page from '../../components/Page';
import SearchResult from '../../components/SearchResults';

function SearchPage() {
  return (
    <Page>
      <Container>
        <Search id="recherche" />
        <SearchResult />
      </Container>
    </Page>
  );
}

export default SearchPage;
