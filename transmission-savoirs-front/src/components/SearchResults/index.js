import { useSelector } from 'react-redux';
import Panel from '../Panel';
import Thumbnail from '../Thumbnail';

import './style.scss';

function SearchResults() {
  const resultSaved = useSelector((state) => state.search.resultSaved);
  const displayResults = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const resultsCount = displayResults.length;

  let message = '';
  if (resultsCount > 1) {
    message = `Votre recherche a donné ${resultsCount} résultats`;
  }
  else if (resultsCount === 1) {
    message = `Votre recherche a donné ${resultsCount} résultat`;
  }
  else if (resultsCount === 0) {
    message = 'Votre recherche n\'a donné aucun résultat';
  }

  return (
    <>
      {loading && <p>Veuillez patienter</p>}
      {resultSaved && (
        <Panel>
          <Thumbnail list={displayResults} title={message} />
        </Panel>
      )}
    </>
  );
}

export default SearchResults;
