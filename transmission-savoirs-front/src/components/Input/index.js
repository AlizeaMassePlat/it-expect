import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../../actions';

/**
 * Custom Input component
 * @component
 * @example
 * const name = email
 * const props = {
 *  className: "input__class",
 *  placeholder: "your placeholder"
 * }
 * return (
 *  <Input
 *    name={name}
 *    className={className}
 *    placeholder={placeholder}
 *    value=""
 *    onChange={handleChange}
 *  />
 * )
 */
function Input({ name, ...props }) {
  const value = useSelector((state) => state.user[name]);
  const dispatch = useDispatch();
  const handleChange = (event) => dispatch(changeValue(event.target.value, name));

  return (
    <input
      name={name}
      value={value || ''}
      onChange={handleChange}
      {...props}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
