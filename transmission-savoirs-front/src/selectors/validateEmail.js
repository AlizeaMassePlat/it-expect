/* eslint-disable no-useless-escape */
/**
 * Check is email is valid or not
 * @param {*} email string
 * @returns bool
 */
function validateEmail(email) {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return (true);
  return (false);
}

export default validateEmail;
