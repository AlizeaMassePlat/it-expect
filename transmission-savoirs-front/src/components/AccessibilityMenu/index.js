/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { menus } from '../../contexts/menu-context';

import './style.scss';

function AccessibilityMenu() {
  const [menusItems, setMenuItems] = useState(menus.home);
  const location = useLocation();
  useEffect(() => {
    // Focus .a11y-nav on location change to display accessibility menu when tab is pressed
    document.querySelector('.a11y-nav').focus();

    const url = location.pathname;
    if (url !== '/annonces/ajouter' && url.slice(0, 10) === '/annonces/') {
      return setMenuItems(menus.annonce);
    }
    if (url.slice(0, 8) === '/profil/') {
      return setMenuItems(menus.profil);
    }
    switch (url) {
      case '/':
        setMenuItems(menus.home);
        break;
      case '/mon-compte':
        setMenuItems(menus.myAccount);
        break;
      case '/recherche':
        setMenuItems(menus.search);
        break;
      case '/connexion':
        setMenuItems(menus.connexion);
        break;
      case '/inscription':
        setMenuItems(menus.inscription);
        break;
      case '/a-propos':
        setMenuItems(menus.about);
        break;
      case '/contact':
        setMenuItems(menus.contact);
        break;
      case '/annonces/ajouter':
        setMenuItems(menus.createPost);
        break;
      default:
        setMenuItems(menus.default);
        break;
    }
  }, [location]);

  return (
    <nav>
      <ul className="a11y-nav" tabIndex={0}>
        {menusItems.map((menu) => (
          <li key={menu.url}>
            <Link to={`${location.pathname}${menu.url}`} className="a11y-nav__link">{menu.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AccessibilityMenu;
