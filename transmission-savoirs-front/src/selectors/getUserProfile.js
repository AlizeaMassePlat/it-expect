import users from '../data/users';

// TODO utiliser axios pour récupérer data
const getUSerProfile = (id) => users.find((user) => user.id === parseInt(id, 10));

export default getUSerProfile;
