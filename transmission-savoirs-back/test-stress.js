import http from 'k6/http';
import { check } from 'k6';

// Configuration du test
export let options = {
  stages: [
    { duration: '1m', target: 50 },  // Monter à 50 utilisateurs simultanés en 1 minute
    { duration: '3m', target: 50 },  // Maintenir 50 utilisateurs simultanés pendant 3 minutes
    { duration: '1m', target: 100 }, // Monter à 100 utilisateurs simultanés en 1 minute
    { duration: '3m', target: 100 }, // Maintenir 100 utilisateurs simultanés pendant 3 minutes
    { duration: '1m', target: 0 },   // Descendre à 0 utilisateurs en 1 minute
  ],
};

// Fonction de test par défaut
export default function () {
  // 1. Effectuer une requête POST de connexion
  let loginRes = http.post('http://localhost:5050/api/login', JSON.stringify({
    email: 'alizeamasse@gmail.com',
    password: 'test'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  // Vérifier que la connexion a réussi
  check(loginRes, {
    'login status est 200': (r) => r.status === 200,
    'token reçu': (r) => r.json('token') !== ''
  });

}