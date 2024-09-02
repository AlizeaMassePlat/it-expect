import { createContext } from 'react';

export const menus = {
  home: [
    { index: 0, url: '#recherche', label: 'Rechercher une annonce' },
    { index: 1, url: '#partage', label: 'Voir les annonces de propositions' },
    { index: 2, url: '#besoin', label: 'Voir les annonces de besoin' },
  ],
  search: [
    { index: 0, url: '#recherche', label: 'Aller au formulaire de recherche' },
  ],
  myAccount: [
    { index: 0, url: '#profil-public', label: 'Aller à mon profil public' },
    { index: 1, url: '#mes-annonces', label: 'Aller à mes annonces' },
    { index: 2, url: '#info-personnelles', label: 'Aller à mes informations personnelles' },
    { index: 3, url: '#info-connexion', label: 'Aller à mes informations de connexion' },
  ],
  connexion: [
    { index: 0, url: '#connexion', label: 'Aller au formulaire de connexion' },
    { index: 1, url: '#inscription', label: 'Je préfère créer un compte' },
  ],
  inscription: [
    { index: 0, url: '#inscription', label: 'Aller au formulaire d\'inscription' },
  ],
  contact: [
    { index: 0, url: '#formulaire', label: 'Aller au formulaire de contact' },
  ],
  createPost: [
    { index: 0, url: '#formulaire', label: 'Aller au formulaire de création d\'annonce' },
  ],
  about: [
    { index: 0, url: '#profil', label: 'Aller au contenu principal' },
    { index: 1, url: '#plus', label: 'Pour aller plus  loin' },
  ],
  profil: [
    { index: 0, url: '#profil', label: 'Aller au profil' },
    { index: 1, url: '#annonces', label: 'Aller aux annonces' },
  ],
  annonce: [
    { index: 0, url: '#annonce', label: 'Aller au contenu de l\'annonce' },
    { index: 1, url: '#annonces-similaires', label: 'Aller aux annonces similaires' },
  ],
  default: [
    { index: 0, url: '#contenu', label: 'Aller au contenu principal' },
  ],
};

// export const MenuContext = createContext(
//   menus.home, // default value
// );
