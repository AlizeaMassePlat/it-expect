export default function getPronoun(pronoun) {
  switch (pronoun) {
    case '1':
      return 'Il';
    case '2':
      return 'Elle';
    case '3':
      return 'Je me définis autrement';
    default:
      return 'non renseigné';
  }
}
