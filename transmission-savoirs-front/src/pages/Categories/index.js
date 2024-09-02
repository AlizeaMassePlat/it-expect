import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import Page from '../../components/Page';
import './style.scss';
import { getCategories } from '../../actions';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, []);
  return (
    <Page id="contenu">
      <Container>
        <header className="section__header">
          <h1 className="section__title">Toutes les catégories</h1>
        </header>
        <ul className="categories__list">
          {categories.map((category) => (
            <li className="categories__item" key={category.id}>
              <Link
                to={`/categories/${category.slug}`}
                className="categories__link"
                title="Voir les annonces de la catégorie"
              >
                <div className="categories__icon">
                  <img
                    src={`/images/categories/${category.slug}.jpg`}
                    className="categories__img"
                    alt=""
                  />
                </div>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  );
}

export default Categories;
