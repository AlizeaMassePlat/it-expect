import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  changeCategoryValue, getCategories, launchSearch, changeLearnOrShareValue,
} from '../../actions';

import Panel from '../Panel';
import Button from '../Button';

import './style.scss';

function Search({ ...props }) {
  const categories = useSelector((state) => state.categories.list);
  const dispatch = useDispatch();
  const categoryValue = useSelector((state) => state.search.categoryValue);
  const learnOrShareValue = useSelector((state) => state.search.learnOrShareValue);
  const navigate = useNavigate();

  // handle submit when click on button
  const handleSubmit = (event) => {
    event.preventDefault();
    if (learnOrShareValue && categoryValue) {
      dispatch(launchSearch(learnOrShareValue, categoryValue));
      navigate(`/recherche?learnOrShare=${learnOrShareValue}&category=${categoryValue}`);
    }
  };

  // save the choice of category to fetch right posts
  const handleCategoryChange = (event) => {
    dispatch(changeCategoryValue(event.target.value));
  };

  // save the choice of condition learn/share to fetch right posts
  const handleLearnOrShareChange = (event) => {
    dispatch(changeLearnOrShareValue(event.target.value));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Panel {...props}>

      <form onSubmit={handleSubmit}>
        <fieldset>

          <legend className="search__title">Recherche rapide</legend>
          <div className="search__all-sections">

            {/* Search 1st step */}
            <div className="search__choices">
              <div className="search__choices__legend">
                <div className="search__choices__circle"><span className="search__choices__circle__order">1</span></div>
                <label htmlFor="select__learn-or-share">Souhaitez-vous apprendre ou partager&nbsp;?</label>
              </div>
              <select name="learnOrShare" id="select__learn-or-share" className="search__choices__select" onChange={handleLearnOrShareChange} value={learnOrShareValue} required>
                <option value="">Choisissez une option...</option>
                <option value="1">Partager</option>
                <option value="2">Apprendre</option>
              </select>
            </div>

            {/* Search step 2 */}
            <div className="search__choices">
              <div className="search__choices__legend">
                <div className="search__choices__circle"><span className="search__choices__circle__order">2</span></div>
                <label htmlFor="select__category">Quelle catégorie vous intéresse&nbsp;?</label>
              </div>
              <select name="category" id="select__category" className="search__choices__select" onChange={handleCategoryChange} value={categoryValue} required>
                <option value="">Choisissez une catégorie...</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Search step 3 */}
            <div className="search__launch">
              <div className="search__launch__legend">
                <div className="search__choices__circle"><span className="search__choices__circle__order">3</span></div>
                <span>Lancez votre recherche</span>
              </div>
              <Button label="Rechercher" type="submit" tabIndex="0" />
            </div>
          </div>

        </fieldset>
      </form>
    </Panel>
  );
}

export default Search;
