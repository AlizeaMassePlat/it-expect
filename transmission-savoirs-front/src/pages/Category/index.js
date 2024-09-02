import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCategories, getPostByCategory, togglePostsLoading } from '../../actions';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Page from '../../components/Page';
import PostsList from '../../components/PostsList';
import useInitError from '../../hooks/useInitError';

function Category() {
  useInitError();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.list);
  const loading = useSelector((state) => state.categories.loading);
  const posts = useSelector((state) => state.posts.posts);
  const postsLoading = useSelector((state) => state.posts.isLoading);

  const [error404, setError404] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  useEffect(() => {
    // If there is no categories => get categories from api
    if (categories.length === 0) {
      dispatch(getCategories());
    }

    // If categories are found get id from slug and get posts from api
    if (!loading || categories.length > 0) {
      const selectedCategory = categories.find((category) => category.slug === slug);
      if (selectedCategory) {
        dispatch(getPostByCategory(selectedCategory.id));
        setCategoryName(selectedCategory.name);
      }
      else {
        setError404(true);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!postsLoading) {
      dispatch(togglePostsLoading());
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(togglePostsLoading());
    }
  }, [isError]);

  if (error404) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Page id="contenu">
      <Container>
        <header className="section__header flex-header">
          <h1 className="section__title">Catégorie {categoryName}</h1>
          <Link className="flex__title__link" to="/categories">Toutes les catégories</Link>
        </header>
        {postsLoading && <p>Veuillez patienter</p>}
        {isError && <Error msg={errorMsg} />}
        {!postsLoading && !isError && (
          <PostsList posts={posts} />
        )}
      </Container>
    </Page>
  );
}

export default Category;
